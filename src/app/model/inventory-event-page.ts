import { InventoryEvent } from "./inventory-event";

export interface InventoryEventPage {
    content: InventoryEvent[];
    page: {
      totalElements: number;
      totalPages?: number;
    };
  }