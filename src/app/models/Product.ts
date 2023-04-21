export interface Product {
    id: number;
    name: string;
    description: string;
    madeIn: string;
    barcode: string;
    warningCount: number;
    subcategoryId: number;
    subcategoryName: string;
    categoryId: number;
    categoryName: string;
    adminId: string;
    adminFullName: string;
    addedDate: Date;
    modifiedDate: Date;
}