import { Request, Response } from 'express';
import * as logInService from '../services/logInService';

const login = async (req: Request, res: Response) => {
    try {
        const { user_name, password } = req.body;

        if (!user_name || !password) {
            res.status(400).json({ message: "Username and password are required." });
        } else {
            const { user, token } = await logInService.loginUser(user_name, password);
            res.status(200).json({ user, token });
        }

    } catch (err) {
        const error = err as Error;
        res.status(401).json({ message: error.message });
    }
};

export { login };