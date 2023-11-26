import { Product } from "./product";

export class CartItem {
  public id: number;
  public sku: string;
  public name: string;
  public description: string;
  public unitPrice: number;
  public imageUrl: string;
  public quantity:number;

  constructor(product:Product) {
      this.id = product.id;
      this.sku = product.sku;
      this.name = product.name;
      this.description = product.description;
      this.unitPrice = product.unitPrice;
      this.imageUrl = product.imageUrl;
      this.quantity = 1;
  }
}
