import {getStationsData, getAvailability, updateData, secondsToDateString} from "./data_functions.js"
import {updateLastUpdatedText, displayMatches, updateTable} from './dom_functions.js'

const data = [];
const refreshButton = document.querySelector('#refresh');
const searchInput = document.querySelector('.search');

getStationsData()
    .then(stationsData => {
        data.push(stationsData);
        refresh();
    })
    .catch(err => {
        console.error("Klarte ikke loade data", err);
        updateLastUpdatedText("Fikk ikke til å loade data :(")
    });

async function refresh() {
    try {
        const availability = await getAvailability();

        const stationsAvailability = availability.stationsAvailability;
        const oldData = data[data.length-1];
        const updatedStationsData = updateData(oldData, stationsAvailability);

        data.push(updatedStationsData);
        updateTable(updatedStationsData);

        const lastUpdated = availability.lastUpdated;
        const lastUpdatedText = secondsToDateString(lastUpdated);
        updateLastUpdatedText(lastUpdatedText);
    } catch(err) {
        console.error("Error updating!", err);
        updateLastUpdatedText("Oppdatering feilet!");
    }
}

refreshButton.addEventListener("click", refresh);
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

export default data