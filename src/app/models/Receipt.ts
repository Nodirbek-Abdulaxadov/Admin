import { TransactionItem } from "./Transaction";

export interface Receipt {
    Id: number;
    AddedDate: Date;
    TotalPrice: number;
    Discount: number;
    PaidCash: number;
    PaidCard: number;
    SellerId: number;
    SellerFullName: string;
    Transactions: TransactionItem[]
}