import express from 'express';
import HttpError from 'http-errors';
import Http from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get('/planets', this.getAll); //Retrieve toutes les planètes
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planets', this.post);
    }

    getAll(req, res, next) {
        res.status(200);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }

    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        
        const planet = PLANETS.find(p => p.id == idPlanet);
        console.log(planet); 
        
        if(!planet) {
            //2. La planète existe pas = 404 - Not Found
            return next(HttpError.NotFound(`La planète avec le id ${idPlanet} n'existe pas.`));
        } else {
            //1. La planète existe = 200 - OK
            res.status(200).json(planet); //Content-Type et send la response
        }

    }

    post(req, res, next) {
        
    }
}

//Super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;