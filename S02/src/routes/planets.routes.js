import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get('/', this.getAll); //Retrieve toutes les planètes
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    getAll(req, res, next) {
        res.status(HttpStatus.OK);
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
        const newPlanet = req.body;

        const planet = PLANETS.find(p => p.id == newPlanet.id);
        if(planet) {
            // J'ai un doublon ==== ERREUR
            return next(HttpError.Conflict(`Une planète avec l'identifiant ${newPlanet.id} existe déjà.`));
        } else {
            PLANETS.push(newPlanet);
            res.status(HttpStatus.CREATED); //201
            res.json(newPlanet);
        }
    }

    deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        const index = PLANETS.findIndex(p => p.id == idPlanet);
        if(index === -1) {
            return next(HttpError.NotFound(`La planète avec le id ${idPlanet} n'existe pas.`));
        } else {
            PLANETS.splice(index, 1);
            res.status(HttpStatus.NO_CONTENT).end();
        }
    }
}

//Super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;