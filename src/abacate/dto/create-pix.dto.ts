export class CreatePixDto {
  amount: number; // centavos
  description: string;
  expiresIn?: number = 3600;
  customer: {
    name: string;
    cellphone: string;
    email: string;
    taxId: string;
  };
  metadata?: Record<string, any>;
}
