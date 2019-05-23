
const stationsInfoUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
const availabilityUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";

let stations, lastUpdated;

//get data
async function getStationsData(url) {
    const response = await fetch(url);
    const data = await response.json();
    lastUpdated = data.last_updated;
    return data.data.stations
}

//combine data
async function updateAvailability(oldData) {
    const updatedAvailabilityData = await getStationsData(availabilityUrl);
    const newData = oldData.map(station => {
        const stationAvailability = updatedAvailabilityData.find(stationAvailabilityData => {
           return stationAvailabilityData.station_id == station.station_id
        });
        return {...station, ...stationAvailability}
        //if two names in merging object are the same, the last object (stationAvailability) will overwrite the first (station)
        //this means changed data will be updated! =)
    })
    return newData
}

//refresh data
async function refresh() {
    try {
        if(!stations) {stations = await getStationsData(stationsInfoUrl);}
        const updatedData = await updateAvailability(stations);
        stations = updatedData; //update global variable "stations" with new up-to-date data
        updateTable(updatedData);
        updateLastUpdatedText();
    } catch(err) {
        console.error("Error updating!", err);
        updateLastUpdatedText("Oppdatering feilet!");
    }
}

//show data

function updateTable(array) {
    const tableBody = document.querySelector("tbody");
    const html = array.map(station => {
        return `
            <tr id=${station.station_id}>
                <td>${station.name}</td>
                <td>${station.num_bikes_available} / ${station.capacity}</td>
                <td>${station.num_docks_available}</td>
            </tr>
        `
    }).join('')
    tableBody.innerHTML = html;
}

function updateLastUpdatedText(text) {
    const textArea = document.querySelector(".last-updated");

    if(!text) {
        let time = parseInt(String(lastUpdated).padEnd(13,0)); //Make lastUpdated usable in Date object by transforming it from seconds to milliseconds since 1970 (adds 3 digits)
        time = new Date(time).toLocaleString();
        textArea.textContent = `Sist oppdatert: ${time}`;
    } else {
        textArea.textContent = text;
    }
}

//search for data 

const searchInput = document.querySelector('.search');

function findMatches(wordToMatch, stations) {
    return stations.filter(station => {
        const regex = new RegExp(wordToMatch, 'gi');
        return station.name.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, stations);
    updateTable(matchArray);
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);