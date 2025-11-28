import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class EvolutionService {
  private base = process.env.EVOLUTION_URL;
  private instance = process.env.EVOLUTION_INSTANCE;
  private apikey = process.env.EVOLUTION_APIKEY;

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'apikey': this.apikey
    };
  }

  async sendText(number: string, text: string) {
    const url = `${this.base}/message/sendText/${this.instance}`;

    const { data } = await axios.post(
      url,
      { number, text },
      { headers: this.headers }
    );

    return data;
  }

  async sendTemplate(body: any) {
    const url = `${this.base}/message/sendTemplate/${this.instance}`;

    const { data } = await axios.post(
      url,
      body,
      { headers: this.headers }
    );

    return data;
  }
}
