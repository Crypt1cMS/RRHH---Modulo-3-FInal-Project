import pool from '../config/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

const findUserByUsername = async (user_name: string) => {
    const query = `SELECT * FROM public.account WHERE user_name = $1`;
    const result = await pool.query(query, [user_name]);
    return result.rows[0];
};

const loginUser = async (user_name: string, password: string) => {
    const user = await findUserByUsername(user_name);
    
    if (!user) {
        throw new Error("User not found");
    } else if (user.password !== password) {
        throw new Error("Incorrect password, please try again");
    } else {
        const token = jwt.sign({ id: user.account_id, user_name: user.user_name }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return { user, token };
    }

};

export {
    loginUser,
};
