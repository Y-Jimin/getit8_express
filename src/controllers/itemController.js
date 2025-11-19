import pool from '../db.js';

// 전체 아이템(상품) 조회
export const listItems = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// 단일 아이템 조회
export const getItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM items WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// 아이템 생성
export const createItem = async (req, res, next) => {
  const { name, price } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO items (name, price) VALUES (?, ?)',
      [name, price]
    );
    res.status(201).json({ data: { id: result.insertId, name, price } });
  } catch (err) {
    next(err);
  }
};

// 아이템 수정
export const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const [result] = await pool.execute(
      'UPDATE items SET name = ?, price = ? WHERE id = ?',
      [name, price, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ data: { id, name, price } });
  } catch (err) {
    next(err);
  }
};

// 아이템 삭제
export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      'DELETE FROM items WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    next(err);
  }
};
