import pool from '../config/db';

const getAllEmployees = async () => {
    const query = `
        SELECT e.employee_id, e.full_name, e.cedula, e.is_active, 
               a.user_name, a.is_active AS account_active,
               r.role, r.is_bypass, r.is_active AS role_active
        FROM employees e
        JOIN account a ON e.account_id = a.account_id
        JOIN roles r ON e.role_id = r.role_id
    `;
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employees: ${error.message}`);
    }
};

const getEmployeeById = async (id: string) => {
    const query = `
        SELECT e.employee_id, e.full_name, e.cedula, e.is_active, 
               a.user_name, a.is_active AS account_active,
               r.role, r.is_bypass, r.is_active AS role_active
        FROM employees e
        JOIN account a ON e.account_id = a.account_id
        JOIN roles r ON e.role_id = r.role_id
        WHERE e.employee_id = $1;
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

const findEmployeeByUserName = async (user_name: string) => {
    const query = `
        SELECT * FROM account WHERE user_name = $1 AND is_active = true;
    `;
    
    try {
        const result = await pool.query(query, [user_name]);
        return result.rows[0]; // Return the first matching account or undefined if none found
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employee: ${error.message}`);
    }
};

const createEmployee = async (employeeData: any) => {
    const { full_name, cedula, account_id, role_id, is_active } = employeeData;

    // Ensure user_name and password are inserted into the account table
    const query = `
        INSERT INTO public.employees (full_name, cedula, account_id, role_id, is_active)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [full_name, cedula, account_id, role_id, is_active]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to create employee: ${error.message}`);
    }
};

const createAccount = async (user_name: string, password: string) => {
    const query = `
        INSERT INTO public.account (user_name, password, is_active)
        VALUES ($1, $2, $3)
        RETURNING account_id;
    `;
    const result = await pool.query(query, [user_name, password, true]);
    return result.rows[0].account_id;
};

const findEmployeeByCedula = async (cedula: string) => {
    const query = `
        SELECT * FROM employees WHERE cedula = $1;
    `;
    
    try {
        const result = await pool.query(query, [cedula]);
        return result.rows[0]; // Return the first matching employee or undefined if none found
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employee: ${error.message}`);
    }
};

const updateEmployee = async (id: string, employeeData: any) => {
    const updateEmployeeQuery = `
        UPDATE employees 
        SET full_name = $1, role_id = $2
        WHERE employee_id = $3
        RETURNING *;
    `;

    const updateUserQuery = `
        UPDATE account 
        SET user_name = $1
        WHERE account_id = (SELECT account_id FROM employees WHERE employee_id = $2);
    `;

    try {
        // Update the employee details
        const employeeResult = await pool.query(updateEmployeeQuery, [
            employeeData.full_name,
            employeeData.role_id,
            id,
        ]);

        if (employeeResult.rows.length === 0) {
            throw new Error(`No employee found with ID: ${id}`);
        }

        // Update the user name in the account table
        if (employeeData.user_name) {
            await pool.query(updateUserQuery, [employeeData.user_name, id]);
        }

        return employeeResult.rows[0]; // Return the updated employee
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to update employee: ${error.message}`);
    }
};

const deleteEmployee = async (id: string) => {
    const query = `
        UPDATE employees
        SET is_active = false
        WHERE employee_id = $1
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            throw new Error(`No employee found with ID: ${id}`);
        }
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to delete employee: ${error.message}`);
    }
};

const reactivateEmployee = async (id: string) => {
    const query = `
        UPDATE employees
        SET is_active = true
        WHERE employee_id = $1
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return false;
        }
        return result.rows[0];
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
    findEmployeeByUserName,
    updateEmployee,
    deleteEmployee,
    createAccount,
    reactivateEmployee,
};
