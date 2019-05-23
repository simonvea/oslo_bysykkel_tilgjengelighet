
const stationsInfoUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
const availabilityUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";

let stations;

//get data
async function getStationsData(url) {
    const response = await fetch(url);
    const data = await response.json();
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
        const updatedData = await updateAvailability(stations);
        stations = updatedData; //update global variable "stations" with new up-to-date data
        updateTable(updatedData);
        updateLastUpdatedText();
    } catch(err) {
        console.error("Error updating!", err)
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