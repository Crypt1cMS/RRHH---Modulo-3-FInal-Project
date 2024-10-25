import express, { Request, Response } from 'express';
import * as employeeService from '../services/employeesService';

const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {
            res.status(404).json({ message: `No employee found with ID: ${id}`})
        } else {
            res.status(200).json(employee)
        }

    } catch (err) {
        const error = err as Error;
        res.status(404).json({ message: error.message });
    }
};

const createEmployee = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body;
        const existingEmployeeEmail = await employeeService.findEmployeeByEmail(employeeData.email);
        const existingEmployeeCedula = await employeeService.findEmployeeByCedula(employeeData.cedula);

        if (!employeeData.full_name || !employeeData.user_name || !employeeData.password || !employeeData.email || !employeeData.cedula || !employeeData.price_per_hour || !employeeData.role) {
            res.status(400).json({ message: "All fields are required, please fill all of them." });
        }

        if (existingEmployeeCedula) {
            res.status(409).json({ message: "An employee with this cedula already exists." });
        } else if (existingEmployeeEmail) {
            res.status(409).json({ message: "An employee with this email already exists." });
        } else {
            const newEmployeeData = { ...employeeData, status: true}
            const newEmployee = await employeeService.createEmployee(newEmployeeData);
            res.status(201).json(newEmployee);
        }
        
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message }); 
    }
};

const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeData = req.body;
    const existingEmployeeEmail = await employeeService.findEmployeeByEmail(employeeData.email);
    const existingEmployeeCedula = await employeeService.findEmployeeByCedula(employeeData.cedula);

    try {

        if (!employeeData.full_name || !employeeData.email || !employeeData.cedula || !employeeData.price_per_hour || !employeeData.role) {
            res.status(400).json({ message: "All fields are required, please fill all of them." });
        } else if (existingEmployeeCedula) {
            res.status(409).json({ message: "An employee with this cedula already exists." });
        } else if (existingEmployeeEmail) {
            res.status(409).json({ message: "An employee with this email already exists." });
        } else {
            const updatedEmployee = await employeeService.updateEmployee(id, employeeData); 
            res.status(200).json(updatedEmployee); 
        }

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params; 

    try {
        const deletedEmployee = await employeeService.deleteEmployee(id);
        res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee });
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};

const reactivateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const isReactivated = await employeeService.reactivateEmployee(id);
        
        if (!isReactivated) {
            res.status(404).json({ message: "Employee not found" });
        } else {
            res.status(200).json({ message: "Employee reactivated successfully." });
        }

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};

export {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    reactivateEmployee,
}