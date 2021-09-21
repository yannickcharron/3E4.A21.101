
import Planet from '../models/planet.model.js';

const ZERO_KELVIN = -273.15;

class PlanetsRepository {

    retrieveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retrieveAll(filter) {

        //Équivalent des WHERE en SQL
        const testFilter = {
            discoveredBy:'Skadex',
            temperature: {$gt : 240},
            'position.y':{$lt : 500}
        };
        //WHERE discoveredBy = 'Skadex' AND temperature > 240 AND position.y < 500

        const testFilterOr = {
            $or:[{discoveredBy:'Skadex'}
                ,{temperature: {$gt : 240}}]
        };
        //WHERE discoveredBy = 'Skadex' OR temperature > 240

        return Planet.find(filter);
    }

    create(planet) {
        return Planet.create(planet);
    }

    delete(idPlanet) {
        return Planet.findByIdAndDelete(idPlanet);
    }

    transform(planet, transformOptions = {}) {

        if(transformOptions.unit) {
            switch(transformOptions.unit) {
                case 'c':
                    planet.temperature += ZERO_KELVIN;
                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;
            }
        }

        delete planet.__v;

        return planet;

    }
}

export default new PlanetsRepository();