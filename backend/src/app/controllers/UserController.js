import User from '../models/User';
import * as Yup from 'yup';

class UserController {

    async index(request, response) {
      const { page = 1 } = request.query;
        const user = await User.findAll({
          attributes: ['id', 'name', 'email', 'status', 'is_admin'],
          limit: 20,
          offset: ((page - 1) *20)
        });

        return response.json(user);
    }

    async show(request, response) {
        const { id } = request.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'status', 'is_admin'],
        });
        return response.json(user);
    }


    async create(request, response) {
      console.log('Conteúdo do corpo da requisição:', request.body);
        const schema = Yup.object().shape({
          name: Yup.string().required().max(70),
          email: Yup.string().email().required().max(120),
          password: Yup.string().required().min(6)
        });
      
        try {
          const validFields = await schema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true
          });
          console.log('Dados válidos a serem criados:', validFields);
          const userExists = await User.findOne({
            where: {
              email: validFields.email
            }
          });
      
          if (userExists) {
            return response.status(409).json({ error: 'Usuário já cadastrado' });
          }

          const { id, name, email, status, is_admin } = await User.create(validFields);
      
          return response.json({ id, name, email, status, is_admin });
        } catch (error) {
          console.log('Erro de validação:', error);
          if (error.name === 'ValidationError') {
            const validationErrors = {};
            error.inner.forEach(err => {
              validationErrors[err.path] = err.message;
            });
 
            return response.status(401).json(validationErrors);
          }
          return response.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
      
 


async update(request, response) {
    const schema = Yup.object().shape({
        name: Yup.string().max(70),
        password: Yup.string().min(6)
    }).noUnknown();

    try {
      const user = await User.findByPk(request.userId);


      if (!user) {
        return response.status(400).json({ error: 'Usuário não encontrado' });
      }

      const validFields = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true
      });

    const { name } = await user.update(validFields);

      return response.json(user);
    } catch (error) {
        return response.status(400).json(error)
    }
}

}

export default new UserController();