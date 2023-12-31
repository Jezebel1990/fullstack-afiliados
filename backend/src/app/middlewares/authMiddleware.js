import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';

export default async function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'Token não fornecido'});
    }

    const [, token] = authHeader.split(' ')

    try {
      const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret);
     
      request.userId = tokenDecoded.id;

        return next();
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido' });
    }

}