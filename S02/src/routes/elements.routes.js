import express from 'express';
import HttpErrors from 'http-errors';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
       
    }

    getOne(req, res, next) {
       
    }

    post(req, res, next) {

        
    }
    
    delete(req, res, next) {
     
    }
}

new ElementsRoutes();

export default router;