import * as jwt from 'jsonwebtoken';

export async function verifyTokenAndGetEmail(token, pool) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const results = await pool.query('SELECT id FROM auth.users WHERE email=$1', [decoded.email]);

        if (results.rows.length === 0) {
            console.error('User does not exist');
            return null;
        }

        return { email: decoded.email, user_id: results.rows[0].id, token: token };
    } catch (err) {
        console.error('Error during token verification or sql query', err);
        return null;
    }
}
