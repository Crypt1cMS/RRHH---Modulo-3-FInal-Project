import pool from '../config/db';
import jwt from 'jsonwebtoken';

const getAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.employees WHERE status = true;');
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employees: ${error.message}`);
    }
};

const getEmployeeById = async (id: string) => {
    const query = `
        SELECT * FROM public.employees WHERE employee_id = $1 AND status = true;
    `;
    
    try {
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`No employee found with ID: ${id}`);
        } else {
            return result.rows[0];
        }

    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employee: ${error.message}`);
    }
};

const createEmployee = async (employeeData: any) => {
    const { full_name, email, user_name, password, cedula, price_per_hour, role, status } = employeeData;

    const query = `
        INSERT INTO public.employees (full_name, user_name, email, password, cedula, price_per_hour, role, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [full_name, user_name, email, password, cedula, price_per_hour, role, status]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to create employee: ${error.message}`);
    }
};

const findEmployeeByCedula = async (cedula: string) => {
    const query = `
        SELECT * FROM public.employees WHERE cedula = $1;
    `;
    
    try {
        const result = await pool.query(query, [cedula]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employee: ${error.message}`);
    }
};

const findEmployeeByEmail = async (email: string) => {
    const query = `
        SELECT * FROM public.employees WHERE email = $1;
    `;
    
    try {
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employee: ${error.message}`);
    }
};


const updateEmployee = async (id: string, employeeData: any) => {
    const query = `
        UPDATE public.employees 
        SET full_name = $1, email = $2, cedula = $3, price_per_hour = $4, role = $5, status = $6 
        WHERE employee_id = $7 
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            employeeData.full_name,
            employeeData.email,
            employeeData.cedula,
            employeeData.price_per_hour,
            employeeData.role,
            employeeData.status,
            id,
        ]);
        
        if (result.rows.length === 0) {
            throw new Error(`No employee found with ID: ${id}`);
        } else {
            return result.rows[0];
        }

    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to update employee: ${error.message}`);
    }
};

const deleteEmployee = async (id: string) => {
    const query = `
        UPDATE public.employees 
        SET status = false 
        WHERE employee_id = $1 
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`No employee found with ID: ${id}`);
        }

        return result.rows[0]; // Return the soft-deleted employee
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to delete employee: ${error.message}`);
    }
};

const reactivateEmployee = async (id: string) => {
    const query = `
        UPDATE public.employees
        SET status = true
        WHERE employee_id = $1
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return false;
        }

        return true;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to reactivate employee: ${error.message}`);
    }
};

export {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    findEmployeeByCedula,
    findEmployeeByEmail,
    updateEmployee,
    deleteEmployee,
    reactivateEmployee,
};