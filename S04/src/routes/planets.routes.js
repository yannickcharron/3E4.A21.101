import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

import planetsRepository from '../repositories/planets.repository.js';

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

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        //Paramètres de transformation
        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }
    
        try {
            let planet = await planetsRepository.retrieveById(idPlanet);
            
            if(!planet) {
                //2. La planète existe pas = 404 - Not Found
                return next(HttpError.NotFound(`La planète avec le id ${idPlanet} n'existe pas.`));
            } else {
                //1. La planète existe = 200 - OK
                planet = planet.toObject({getters:true, virtuals:false});
                planet = planetsRepository.transform(planet, transformOptions);

                res.status(200).json(planet); //Content-Type et send la response
            }
            
        } catch(err) {
            return next(err);
        }

    }

    async getAll(req, res, next) {
        
        //Critères pour la BD
        const filter = {};
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }
        
        //Paramètres de transformation
        const transformOptions = {};
        if(req.query.unit) {
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }
        
        try {
            
            let planets = await planetsRepository.retrieveAll(filter);
            
            //Je veux un nouveau tableau des planètes transformées
            //Map = une boucle
            planets = planets.map(p => {
                p = p.toObject({getters:true, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
            }); 
            
            res.status(200).json(planets);     
            
        } catch(err) {
            return next(err);
        }
        
    }
    
    async post(req, res, next) {
        const newPlanet = req.body;

        //TODO: Validation rapide jusqu'à la semaine +/- 8

        try {
            
            let planetAdded = await planetsRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({getters:true, virtuals:false});
            planetAdded = planetsRepository.transform(planetAdded);

            res.status(201).json(planetAdded);

        } catch(err) {
            return next(err);
        }
    }

    async deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            
            const deleteResult = await planetsRepository.delete(idPlanet);
            
            if(!deleteResult) {
                return next(HttpError.NotFound(`La planète avec le id ${idPlanet} n'existe pas.`));
            } else {
                res.status(204).end();
            }

        }catch(err) {
            return next(err);
        }
        
       
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpError.NotImplemented());
    }

}

//Super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;