# Online Order Calculator

ระบบคำนวณราคาสินค้าสำหรับร้านค้าออนไลน์ พัฒนาด้วย JavaScript และ TypeScript โดยรองรับการคำนวณส่วนลดจากคูปองและภาษีมูลค่าเพิ่ม (VAT) 7% พร้อมระบบตรวจสอบความถูกต้องของข้อมูล (Defensive Validation)

## 1. วัตถุประสงค์ของโปรแกรม

1. คำนวณราคาสินค้ารวมตามจำนวนสินค้า
2. คำนวณส่วนลดจากคูปองเป็นเปอร์เซ็นต์
3. คำนวณภาษีมูลค่าเพิ่ม VAT 7%
4. คำนวณยอดชำระสุทธิ
5. ตรวจสอบความถูกต้องของข้อมูลก่อนคำนวณ
6. รองรับประเภทการชำระเงิน 3 รูปแบบ

## 2. ประเภทการชำระเงิน (PaymentType)

กำหนดประเภทการชำระเงิน ได้แก่

- CASH = เงินสด
- PROMPTPAY = พร้อมเพย์
- CREDIT_CARD = บัตรเครดิต

### JavaScript

ใช้ Object เพื่อกำหนดประเภทการชำระเงิน

```javascript
const PaymentType = {
  CASH: "CASH",
  PROMPTPAY: "PROMPTPAY",
  CREDIT_CARD: "CREDIT_CARD"
};
```

### TypeScript

ใช้ Union Type เพื่อจำกัดค่าที่สามารถใช้งานได้

```typescript
export type PaymentType =
  "CASH" | "PROMPTPAY" | "CREDIT_CARD";
```

## 3. Input / Process / Output (IPO)

### Input (ข้อมูลนำเข้า)

- orderId = รหัสคำสั่งซื้อ
- price = ราคาสินค้าต่อชิ้น
- quantity = จำนวนสินค้า
- discountPercent = เปอร์เซ็นต์ส่วนลด
- paymentType = ประเภทการชำระเงิน

### Process (การประมวลผล)

1. ตรวจสอบราคาสินค้าและจำนวนสินค้า
2. คำนวณราคาสินค้ารวม
3. คำนวณส่วนลดจากคูปอง
4. หักส่วนลดออกจากราคาสินค้า
5. คำนวณ VAT 7% จากราคาหลังหักส่วนลด
6. คำนวณยอดชำระสุทธิ

### Output (ผลลัพธ์)

- orderId = รหัสคำสั่งซื้อ
- subtotal = ราคาสินค้าก่อนหักส่วนลด
- discountAmount = จำนวนเงินส่วนลด
- vatAmount = จำนวนภาษีมูลค่าเพิ่ม
- grandTotal = ยอดชำระสุทธิ

## 4. สูตรการคำนวณ

ราคาสินค้ารวม:

```text
subtotal = price × quantity
```

ส่วนลด:

```text
discountAmount = subtotal × (discountPercent / 100)
```

ราคาหลังหักส่วนลด:

```text
taxableAmount = subtotal - discountAmount
```

ภาษีมูลค่าเพิ่ม:

```text
vatAmount = taxableAmount × 0.07
```

ยอดชำระสุทธิ:

```text
grandTotal = taxableAmount + vatAmount
```

## 5. Defensive Validation

ระบบตรวจสอบความถูกต้องของข้อมูลก่อนประมวลผล

| เงื่อนไข | การตรวจสอบ |
|---|---|
| ราคาติดลบหรือเป็นศูนย์ | price ต้องมากกว่า 0 |
| จำนวนสินค้าเป็นศูนย์หรือติดลบ | quantity ต้องมากกว่า 0 |
| ส่วนลดติดลบ | discountPercent ต้องไม่น้อยกว่า 0 |
| ส่วนลดเกิน 100% | discountPercent ต้องไม่เกิน 100% |
| ข้อมูลไม่ใช่ตัวเลข | ตรวจสอบด้วย Number.isFinite() |

หากพบข้อมูลไม่ถูกต้อง โปรแกรมจะแจ้งข้อผิดพลาดด้วย `throw new Error()` 

## 6. การติดตั้งและเตรียมโปรเจกต์

ติดตั้ง Node.js ก่อนเริ่มใช้งาน

ติดตั้ง TypeScript, tsx และ Vitest

```bash
npm install -D typescript tsx vitest
```

หมายเหตุ: หากใช้ Windows PowerShell แล้วพบปัญหา Execution Policy สามารถเรียกใช้ npm ผ่านคำสั่ง `npm.cmd` ได้

```bash
npm.cmd install -D typescript tsx vitest
```

## 7. โครงสร้างไฟล์

```text
Online-Order-Calculator/
│
├── orderCalculator.js
├── orderCalculator.ts
├── orderCalculator.test.ts
├── package.json
└── README.md
```

## 8. JavaScript Implementation

ไฟล์ `orderCalculator.js`

```javascript
const PaymentType = {
  CASH: "CASH",
  PROMPTPAY: "PROMPTPAY",
  CREDIT_CARD: "CREDIT_CARD"
};

function calculateOrder(
  price,
  quantity,
  discountPercent = 0
) {
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");
  }

  if (!Number.isFinite(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100) {
    throw new Error("ส่วนลดต้องอยู่ระหว่าง 0-100%");
  }

  const subtotal = price * quantity;
  const discount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discount;
  const vat = taxableAmount * 0.07;
  const grandTotal = taxableAmount + vat;

  return {
    subtotal,
    discount,
    vat: Number(vat.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2))
  };
}

// ทดลองเรียกใช้งาน
const result = calculateOrder(100, 2, 10);

console.log(result);
```

รัน JavaScript ด้วยคำสั่ง

```bash
node orderCalculator.js
```

## 9. TypeScript Implementation

ไฟล์ `orderCalculator.ts`

```typescript
export type PaymentType =
  "CASH" | "PROMPTPAY" | "CREDIT_CARD";

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

export function calculateOrder(
  order: OrderInput
): OrderResult {

  if (!Number.isFinite(order.price) || order.price <= 0)
    throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");

  if (!Number.isInteger(order.quantity) || order.quantity <= 0)
    throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");

  const discountPercent = order.discountPercent ?? 0;

  if (!Number.isFinite(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100)
    throw new Error("ส่วนลดต้องอยู่ระหว่าง 0-100%");

  const subtotal = order.price * order.quantity;
  const discountAmount = subtotal * (discountPercent / 100);
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

// ทดลองเรียกใช้งาน
const result = calculateOrder({
  orderId: "ORD001",
  price: 100,
  quantity: 2,
  discountPercent: 10,
  paymentType: "CASH"
});

console.log(result);
```

รัน TypeScript ด้วยคำสั่ง

```bash
npx.cmd tsx orderCalculator.ts
```

## 10. Unit Testing ด้วย Vitest

ไฟล์ `orderCalculator.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { calculateOrder } from "./orderCalculator";

describe("calculateOrder", () => {

  it("should calculate order correctly", () => {
    const result = calculateOrder({
      orderId: "ORD001",
      price: 100,
      quantity: 2,
      discountPercent: 10,
      paymentType: "CASH"
    });

    expect(result.subtotal).toBe(200);
    expect(result.discountAmount).toBe(20);
    expect(result.vatAmount).toBe(12.6);
    expect(result.grandTotal).toBe(192.6);
  });

  it("should reject negative price", () => {
    expect(() => calculateOrder({
      orderId: "ORD002",
      price: -100,
      quantity: 2,
      paymentType: "CASH"
    })).toThrow();
  });

  it("should reject zero quantity", () => {
    expect(() => calculateOrder({
      orderId: "ORD003",
      price: 100,
      quantity: 0,
      paymentType: "CASH"
    })).toThrow();
  });

  it("should reject invalid discount", () => {
    expect(() => calculateOrder({
      orderId: "ORD004",
      price: 100,
      quantity: 2,
      discountPercent: 150,
      paymentType: "CASH"
    })).toThrow();
  });

});
```

เพิ่มคำสั่งใน `package.json`

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

รัน Unit Test ด้วยคำสั่ง

```bash
npm.cmd test
```

## 11. ตัวอย่างผลลัพธ์

ข้อมูลทดลอง:

- Order ID: ORD001
- ราคาสินค้า: 100 บาท
- จำนวน: 2 ชิ้น
- ส่วนลด: 10%
- VAT: 7%

ผลการคำนวณ:

| รายการ | จำนวนเงิน |
|---|---:|
| Subtotal | 200.00 บาท |
| Discount | 20.00 บาท |
| VAT 7% | 12.60 บาท |
| Grand Total | 192.60 บาท |

## 12. ความแตกต่างระหว่าง JavaScript และ TypeScript

| หัวข้อ | JavaScript | TypeScript |
|---|---|---|
| Type | ไม่ต้องประกาศ | มี Type |
| Interface | ไม่มี | มี |
| Parameter Type | ไม่ระบุ | ระบุได้ |
| Return Type | ไม่ระบุ | ระบุได้ |
| การตรวจสอบข้อมูล | เขียนเงื่อนไขเอง | ใช้ Type ร่วมกับ Validation |
| นามสกุลไฟล์ | .js | .ts |

## 13. สรุป

โปรแกรม Online Order Calculator เป็นระบบคำนวณราคาสินค้าออนไลน์ที่สามารถคำนวณราคาสินค้ารวม ส่วนลดจากคูปอง และภาษีมูลค่าเพิ่ม 7% พร้อมระบบตรวจสอบความถูกต้องของข้อมูลก่อนการคำนวณ

การพัฒนาโปรแกรมนี้ช่วยให้เข้าใจหลักการเขียนโปรแกรมแบบ Input, Process และ Output การสร้าง Function การใช้ Type และ Interface ใน TypeScript รวมถึงการทดสอบโปรแกรมด้วย Unit Testing ผ่าน Vitest

**วัตถุประสงค์สุดท้าย:** เพื่อให้ระบบคำนวณราคาสินค้ามีความถูกต้อง ลดข้อผิดพลาดจากการป้อนข้อมูล และสามารถตรวจสอบผลลัพธ์ได้อย่างเป็นระบบ
