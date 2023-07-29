const express = require('express');
const multer = require('multer');


const router = express.Router();// Create the router instance


import UserController from './app/controllers/UserController';

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);







//Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/'); // Create a folder called 'uploads' to save the files
    },
     filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.sales)
     }
    });
    
    
    const upload = multer({ storage: storage });

    router.post('/upload', upload.single('file'), (req, res) => {

    res.json({ message: 'Upload realizado com sucesso!'});

    });

    module.exports = router;
