import jwt from 'jsonwebtoken';

export const jwtVerify = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ success: false, message: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ success: false, message: 'Invalid Token' });
    }
}