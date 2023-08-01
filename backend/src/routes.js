import { Router } from 'express';
//const multer = require('multer');

const routes = Router();// Create the router instance

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/authMiddleware';

import InputfileController from '/app/controllers/InputfileController';

routes.post('/auth', AuthController.create);
routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

routes.post('/inputfiles', InputfileController.createInputFile);



//Multer configuration for file upload
//const storage = multer.diskStorage({
    //destination: function(req, file, cb){
       // cb(null, 'uploads/'); // Create a folder called 'uploads' to save the files
   // },
    // filename: function (req, file, cb) {
    //    cb(null, Date.now() + '-' + file.sales)
   //  }
   // });
    
    
   // const upload = multer({ storage: storage });

    //router.post('/upload', upload.single('file'), (req, res) => {

   // res.json({ message: 'Upload realizado com sucesso!'});

   // });

    export default routes;
