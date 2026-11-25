// orderCalculator.js
function calculateOrder(price, quantity, discountPercent = 0) {
  if (price <= 0 || quantity <= 0) {
    throw new Error("ราคาและจำนวนสินค้าต้องมากกว่า 0");
  }
  const subtotal = price * quantity;
  const discount = subtotal * (discountPercent / 100);
  const vat = (subtotal - discount) * 0.07;
  const grandTotal = (subtotal - discount) + vat;

  return {
    subtotal,
    discount,
    vat: Number(vat.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2))
  };
} 
// ทดลองเรียกใช้ฟังก์ชัน
const result = calculateOrder(500, 4, 10);

// แสดงผลลัพธ์
console.log(result);
