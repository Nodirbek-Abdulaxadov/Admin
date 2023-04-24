export interface WarehouseItem {
    id: number;
    quantity: number;
    broughtDate: Date;
    incomingPrice: number;
    sellingPrice: number;
    productId: number;
    productName: string;
    warehouseId: number;
    warehouseName: string;
    adminId: string;
    adminFullName: string;
    addedDate: Date;
    modifiedDate: Date;
}