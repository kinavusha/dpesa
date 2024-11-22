const DERIV_WS_URL = 'wss://ws.binaryws.com/websockets/v3';

export class DerivAPI {
  private ws: WebSocket | null = null;
  private token: string;
  private onBalanceUpdate?: (balance: number) => void;

  constructor(token: string) {
    this.token = token;
    this.connect();
  }

  private connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve(this.ws);
        return;
      }

      this.ws = new WebSocket(DERIV_WS_URL);

      this.ws.onopen = () => {
        this.authorize().then(() => {
          this.subscribeToBalance();
          resolve(this.ws!);
        });
      };

      this.ws.onerror = (error) => {
        reject(error);
      };

      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          console.error('Deriv WebSocket error:', data.error);
          return;
        }

        if (data.msg_type === 'balance') {
          this.onBalanceUpdate?.(data.balance.balance);
        }
      };
    });
  }

  private async authorize(): Promise<void> {
    if (!this.ws) throw new Error('WebSocket not connected');
    
    return new Promise((resolve, reject) => {
      this.ws!.send(JSON.stringify({
        authorize: this.token
      }));

      const handler = (msg: MessageEvent) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          reject(data.error);
        } else if (data.msg_type === 'authorize') {
          this.ws!.removeEventListener('message', handler);
          resolve();
        }
      };

      this.ws!.addEventListener('message', handler);
    });
  }

  private subscribeToBalance() {
    if (!this.ws) return;
    
    this.ws.send(JSON.stringify({
      forget_all: 'balance',
    }));

    this.ws.send(JSON.stringify({
      balance: 1,
      subscribe: 1
    }));
  }

  setBalanceUpdateHandler(handler: (balance: number) => void) {
    this.onBalanceUpdate = handler;
  }

  async getAccountInfo(): Promise<{
    balance: number;
    currency: string;
    email: string;
    fullname: string;
    account_list: any[];
  }> {
    if (!this.ws) throw new Error('WebSocket not connected');

    return new Promise((resolve, reject) => {
      this.ws!.send(JSON.stringify({
        balance: 1,
        account_list: 1
      }));

      const handler = (msg: MessageEvent) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          reject(data.error);
        } else if (data.msg_type === 'balance') {
          this.ws!.removeEventListener('message', handler);
          resolve({
            balance: data.balance.balance,
            currency: data.balance.currency,
            email: data.balance.email,
            fullname: data.balance.fullname,
            account_list: data.balance.accounts || []
          });
        }
      };

      this.ws!.addEventListener('message', handler);
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const createDerivAPI = (token: string) => new DerivAPI(token);