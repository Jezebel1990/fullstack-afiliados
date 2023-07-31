import { Router } from 'express';
//const multer = require('multer');

const routes = Router();// Create the router instance

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

routes.post('/auth', AuthController.create);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);




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
