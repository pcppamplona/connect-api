import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AbacateService {
  private base = process.env.ABACATE_PAY_BASE_URL;
  private token = process.env.ABACATE_PAY_KEY;

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json"
    };
  }

  async listCustomers() {
    const { data } = await axios.get(
      `${this.base}/customer/list`,
      { headers: this.headers }
    );
    return data;
  }

  async createCustomer(body: any) {
    const { data } = await axios.post(
      `${this.base}/customer/create`,
      body,
      { headers: this.headers }
    );
    return data;
  }

  async createBilling(body: any) {
    const { data } = await axios.post(
      `${this.base}/billing/create`,
      body,
      { headers: this.headers }
    );
    return data;
  }

  async listBillings() {
    const { data } = await axios.get(
      `${this.base}/billing/list`,
      { headers: this.headers }
    );
    return data;
  }

  async createPix(body: any) {
    const { data } = await axios.post(
      `${this.base}/pixQrCode/create`,
      body,
      { headers: this.headers }
    );
    return data;
  }

  async checkPix() {
    const { data } = await axios.get(
      `${this.base}/pixQrCode/check`,
      { headers: this.headers }
    );
    return data;
  }

  async simulatePayment() {
    const { data } = await axios.post(
      `${this.base}/pixQrCode/simulate-payment`,
      { metadata: {} },
      { headers: this.headers }
    );
    return data;
  }
}
