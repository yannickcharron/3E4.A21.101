
import Planet from '../models/planet.model.js';

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
}

export default new PlanetsRepository();