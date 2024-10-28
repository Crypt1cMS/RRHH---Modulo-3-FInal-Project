import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Invalid or expired token.' });
            } else {
                (req as any).user = user;
                next();
            }
        });
    }
};

export default authenticateToken;
