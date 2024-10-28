import pool from '../config/db';

const getRoles = async () => {
    const result = await pool.query('SELECT * FROM roles WHERE is_active = true');
    return result.rows;
};

const getRoleById = async (id: string) => {
    const result = await pool.query('SELECT * FROM roles WHERE role_id = $1 AND is_active = true', [id]);
    return result.rows[0]; // Return the first matching role or undefined
};

const deleteRole = async (id: string) => {
    const result = await pool.query('DELETE FROM roles WHERE role_id = $1', [id]);
    return result.rowCount;
};

export {
    getRoles,
    getRoleById,
    deleteRole
};