import express, { Request, Response } from 'express';
import { getAllEmployees } from '../services/employees'

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json(employees);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};