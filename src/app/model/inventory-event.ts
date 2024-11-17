import { Product } from "./product";

export interface InventoryEvent {
    id: string,
    eventType: string,
    product: Product,
    quantity: number,
    createdAt: Date
}