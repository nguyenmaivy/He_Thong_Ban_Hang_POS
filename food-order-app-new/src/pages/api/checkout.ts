// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  const connection = await db.getConnection(); 

  try {
    const { table_number, order_type, cartItems, total, tax, totalWithTax, payment_method } = req.body;

    await connection.beginTransaction(); 

    const [orderResult] = await connection.query(
      `INSERT INTO orders (table_number, order_type, subtotal, tax, total, payment_method, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [table_number, order_type, total, tax, totalWithTax, payment_method, 'completed']
    );

    const order_id = (orderResult as any).insertId;

    for (const item of cartItems) {
      await connection.query(
        `INSERT INTO order_items (id_order, table_number, product_name, quantity)
         VALUES (?, ?, ?, ?)`,
        [order_id, table_number, item.name, item.quantity]
      );
    }

    await connection.commit(); 
    res.status(200).json({ message: "Đặt hàng thành công" });

  } catch (error) {
    await connection.rollback(); 
    console.error("Lỗi xử lý đơn hàng:", error);
    res.status(500).json({ error: "Lỗi server" });
  } finally {
    connection.release(); 
  }
}
