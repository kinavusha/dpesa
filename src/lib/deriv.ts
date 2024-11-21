const DERIV_WS_URL = 'wss://ws.binaryws.com/websockets/v3';

export class DerivAPI {
  private ws: WebSocket | null = null;
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve(this.ws);
        return;
      }

      this.ws = new WebSocket(DERIV_WS_URL);

      this.ws.onopen = () => {
        this.authorize().then(() => resolve(this.ws!));
      };

      this.ws.onerror = (error) => {
        reject(error);
      };
    });
  }

  private async authorize(): Promise<void> {
    const ws = await this.connect();
    return new Promise((resolve, reject) => {
      ws.send(JSON.stringify({
        authorize: this.token
      }));

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          reject(data.error);
        } else if (data.msg_type === 'authorize') {
          resolve();
        }
      };
    });
  }

  async getBalance(): Promise<number> {
    const ws = await this.connect();
    return new Promise((resolve, reject) => {
      ws.send(JSON.stringify({
        balance: 1
      }));

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          reject(data.error);
        } else if (data.msg_type === 'balance') {
          resolve(data.balance.balance);
        }
      };
    });
  }

  async createTransaction(type: 'deposit' | 'withdrawal', amount: number): Promise<string> {
    const ws = await this.connect();
    return new Promise((resolve, reject) => {
      ws.send(JSON.stringify({
        paymentagent_transfer: 1,
        type,
        amount
      }));

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
          reject(data.error);
        } else if (data.msg_type === 'paymentagent_transfer') {
          resolve(data.paymentagent_transfer.transaction_id);
        }
      };
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