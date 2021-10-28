import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    
    retrieveById(idExploration, retrieveOptions) {
        
        const retrieveQuery = Exploration.findById(idExploration);

        if(retrieveOptions.planet) {
            retrieveQuery.populate('planet');
        }

        return retrieveQuery;
    }

    transform(exploration, transformOptions = {}) {

        
        if(transformOptions.embed && transformOptions.embed.planet) {
            //?embed=planet
            //On va devoir faire quelque chose ici ...
        } else {
            //On ne veut pas embed la planet
            exploration.planet = { href: `/planets/${exploration.planet}`};
        }

        //Choix pour le BASE_URL
        //exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;
        exploration.href = `/explorations/${exploration._id}`;
        
        delete exploration._id;

        return exploration;
    }

}

export default new ExplorationsRepository();