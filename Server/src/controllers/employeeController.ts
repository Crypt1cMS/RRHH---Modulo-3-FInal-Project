import express, { Request, Response } from 'express';
import * as employeeService from '../services/employees';

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
};

const createEmployee = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body;
        const newEmployee = await employeeService.createEmployee(employeeData);
        res.status(201).json(newEmployee);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message }); 
    }
};

const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeData = req.body;
};

const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
};

export {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}