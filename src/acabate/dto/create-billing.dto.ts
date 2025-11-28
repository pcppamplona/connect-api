export class CreateBillingDto {
  externalId: string;
  productName: string;
  productDescription?: string;
  quantity: number = 1;
  price: number; // em centavos
  customer: {
    name: string;
    cellphone: string;
    email: string;
    taxId: string;
  };
}
