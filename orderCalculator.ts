// orderCalculator.ts
export type PaymentType = "CASH" | "PROMPTPAY" | "CREDIT_CARD";

export interface OrderInput {
  orderId: string;
  price: number;
  quantity: number;
  discountPercent?: number;
  paymentType: PaymentType;
}

export interface OrderResult {
  orderId: string;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  grandTotal: number;
}

export function calculateOrder(order: OrderInput): OrderResult {
  if (order.price <= 0) throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  if (order.quantity <= 0) throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");

  const discountRate = (order.discountPercent ?? 0) / 100;
  const subtotal = order.price * order.quantity;
  const discountAmount = subtotal * discountRate;
  const taxableAmount = subtotal - discountAmount;
  const vatAmount = Number((taxableAmount * 0.07).toFixed(2));
  const grandTotal = Number((taxableAmount + vatAmount).toFixed(2));

  return {
    orderId: order.orderId,
    subtotal,
    discountAmount,
    vatAmount,
    grandTotal
  };
}

// ทดลองเรียกใช้งานฟังก์ชัน
const result = calculateOrder({
  orderId: "ORD001",
  price: 300,
  quantity: 5,
  discountPercent: 10,
  paymentType: "CASH"
});

// แสดงผลลัพธ์
console.log("===== ORDER SUMMARY =====");
console.log("Order ID:", result.orderId);
console.log("Subtotal:", result.subtotal, "บาท");
console.log("Discount:", result.discountAmount, "บาท");
console.log("VAT 7%:", result.vatAmount, "บาท");
console.log("Grand Total:", result.grandTotal, "บาท");

