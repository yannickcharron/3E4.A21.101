const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() => {
    getPlanet(urlParams.planet);

    $('#btnAddPortal').click(() => {
        addPortal();
    })

});

function addPortal() {
    const position = $('#txtPosition').val();
    const affinity = $('#cboAffinity').val();

    console.log(position);
    console.log(affinity);
}

async function getPlanet(url) {
    const response = await axios.get(url); 
    if(response.status === 200) {
        const planet = response.data;
        console.log(planet);

        $('#imgIcon').attr('src', planet.icon);
        $('#lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);   
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        const position = `(${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)})`;
        $('#lblPosition').html(position);
        
        //Satellites
        if(planet.satellites.length > 0) {
            let satellitesHtml = '';
            planet.satellites.forEach(s => {
                satellitesHtml += `<li>${s}</li>`;
            });
            $('#satellites').html(satellitesHtml);
        } else {
            $('#satellites').html('<li>Aucun satellite</li>');
        }

        displayPortals(planet.portals);

    }
}

function displayPortals(portals) {

    let portalsHtml = '';
    
    portals.forEach(p => {
        portalsHtml += '<tr>'
        portalsHtml += `<td>${p.position}</td>`;
        portalsHtml += `<td><img src="img/${p.affinity}.png" title="${p.affinity}" /></td>`;
        //3. Dans chaque tr --> 2 td (position, affinity)
        portalsHtml += '</tr>'
    }); 

    
    $('#portals tbody').html(portalsHtml);
    //4. Ajouter la chaine dans la page
}
