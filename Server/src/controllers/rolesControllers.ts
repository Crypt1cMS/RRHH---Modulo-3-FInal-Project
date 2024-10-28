import * as rolesService from '../services/rolesService';
import { Request, Response } from 'express';

const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rolesService.getRoles();
        res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const role = await rolesService.getRoleById(id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: "Role not found" });
        }
    } catch (error) {
        console.error("Error fetching role by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await rolesService.deleteRole(id) || 0;
        if (result > 0) {
            res.status(204).send(); // No content to return on successful deletion
        } else {
            res.status(404).json({ error: "Role not found" });
        }
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    getRoles,
    getRoleById,
    deleteRole
};
