export interface Transfer {
    id: number;
    transferDate: Date;
    fromWarehouseId: number;
    fromWarehouseName: string;
    toWarehouseId: number;
    toWarehouseName: string;
    adminId: string;
    adminFullName: string;
    supplierId: number;
    supplierFullName: string;
    addedDate: Date;
    lastModified: Date;
    items: TransferItem[];
}

export interface TransferItem {
    id: string;
    transferId: number;
    productName: string;
    quantity: number;
}