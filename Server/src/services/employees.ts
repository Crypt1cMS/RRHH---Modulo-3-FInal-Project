import pool from '../config/db';

export const getAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.employees');
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employees: ${error.message}`);
    }
};