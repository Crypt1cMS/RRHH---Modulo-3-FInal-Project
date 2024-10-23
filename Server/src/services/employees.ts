import pool from '../config/db';

const getAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.employees');
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to fetch employees: ${error.message}`);
    }
};

const getEmployeeById = async (id: string) => {
    // Logic to get an employee by ID
};

const createEmployee = async (employeeData: any) => {
    const { cedula, full_name, price_per_hour, role, status } = employeeData;

    const query = `
        INSERT INTO public.employees (cedula, full_name, price_per_hour, role, status)
        VALUES ($1, $2, $3, $4, $5);
    `;

    try {
        const result = await pool.query(query, [cedula, full_name, price_per_hour, role, status]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw new Error(`Unable to create employee: ${error.message}`);
    }
};

const updateEmployee = async (id: string, employeeData: any) => {
    // Logic to update an existing employee
};

const deleteEmployee = async (id: string) => {
    // Logic to delete an employee by ID
};

export {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};