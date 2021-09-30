const SERVICE_URL = 'https://api.andromia.science/planets/';

$(document).ready(() => {    
    getPlanets();
});


async function getPlanets() {

    try {
        const response = await axios.get(SERVICE_URL);
        if(response.status === 200) {
            const planets = response.data;
            planets.forEach(p => {
                $('#planets').append(displayPlanet(p));
            });
        } else {
            console.log(response);
        }
    } catch(err) {
        console.log(err);
    }

}

function displayPlanet(planet) {

    let planetHtml = '<div class="card col-2"><a href="details.html">';
    planetHtml += `<img src="${planet.icon}" />`;
    planetHtml += `<h5 class="nom-planet">${planet.name}</h5></a>`;
    planetHtml += '</div>';

    return planetHtml;

}