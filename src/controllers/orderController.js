import pool from '../db.js';
import { HttpError } from '../errors/httpError.js';

// 전체 주문 조회
export const getAllOrders = async (req, res, next) => {
	try {
		const [rows] = await pool.query('SELECT * FROM orders');
		res.json({ data: rows });
	} catch (err) {
		next(new HttpError(500, "데이터베이스 조회 실패"));
	}
};

// 주문 생성
export const createOrder = async (req, res, next) => {
	const { user_id, product_id } = req.body;
	try {
		const [result] = await pool.execute(
			'INSERT INTO orders (user_id, product_id) VALUES (?, ?)',
			[user_id, product_id]
		);
		res.status(201).json({
			data: { id: result.insertId, user_id, product_id },
		});
	} catch (err) {
		next(err);
	}
};

// 사용자+상품 JOIN 조회
export const getJoinedOrders = async (req, res, next) => {
	try {
		const sql = `
      SELECT o.id AS order_id,
             u.name AS user_name,
             p.name AS product_name,
             o.order_date
      FROM orders o
      JOIN users u       ON o.user_id    = u.id
      JOIN products p    ON o.product_id = p.id
    `;
		const [rows] = await pool.query(sql);
		res.json({ data: rows });
	} catch (err) {
		next(err);
	}
};

export const getJoinedOrdersByUserId = async (req, res, next) => {
   try {
    const userId = req.params.userId;
		const sql = `
      SELECT o.id AS order_id,
             u.name AS user_name,
             p.name AS product_name,
             o.order_date
      FROM orders o
      JOIN users u       ON o.user_id    = u.id
      JOIN products p    ON o.product_id = p.id
      WHERE u.id = ?
    `;
		const [rows] = await pool.execute(
			sql,
			[userId]
		);
		res.json({ data: rows });
	} catch (err) {
		next(err);
	}
}

// 특정 사용자 주문 조회
// 과제 제출 시 수정하시면 됩니다 !
export const getUserOrders = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const [rows] = await pool.execute(
			'SELECT * FROM orders WHERE user_id = ?',
			[userId]
		);
		res.json({ data: rows });
	} catch (err) {
		next(err);
	}
};
