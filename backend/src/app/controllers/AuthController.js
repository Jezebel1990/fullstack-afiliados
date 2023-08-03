import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth'
import User from '../models/User';

class AuthController {
    async login (request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ where: { email }})

        if (!user) {
            return response.status(401).json({ error: 'Usuário não encontreado'});
        }
        if (!(await user.checkPassword(password))){
            return response.status(401).json({ error: 'Senha errada!' });
        }

        const { id, name } = user;

        return response.json({
            user: { id, name, email },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    } catch (error) {
        return response.status(500).json({ error: 'Erro ao fazer login' });
      
    }
}

export default new AuthController();