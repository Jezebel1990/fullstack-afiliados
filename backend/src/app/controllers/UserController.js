import User from '../models/User';

class UserController {
    async index(request, response) {
      const {page = 1} = request.query;


        const user = await User.findAll({
          limit: 20,
          offset: ((page - 1) *20)
        });

        return response.json(user);
    }
    async show(request, response) {
        const {id} = request.params;

        const user = await User.findByPk(id);

        return response.json(user);
    }

async create(request, response){

}


}

export default new UserController();