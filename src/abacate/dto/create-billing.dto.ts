export class CreateBillingDto {
  externalId: string;
  productName: string;
  productDescription?: string;
  quantity: number;
  price: number; 
  customer: {
    name: string;
    cellphone: string;
    email: string;
    taxId: string;
  };
}
