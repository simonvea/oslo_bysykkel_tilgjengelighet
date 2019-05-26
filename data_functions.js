
async function getStationsData() {
    const stationsInfoUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
    const data = await getData(stationsInfoUrl);
    const stationsData = data.data.stations;

    return stationsData
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function getAvailability() {
    const availabilityUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";
    const data = await getData(availabilityUrl);

    const stationsAvailability = data.data.stations;
    const lastUpdated = data.last_updated;

    return {lastUpdated, stationsAvailability}
}

function updateData(oldData, newData) {

    if(!oldData || !newData) {throw new Error};

    const updatedData = oldData.map(oldStationData => {
        const newStationsData = newData.find(newStationData => {
           return newStationData.station_id == oldStationData.station_id
        });
        return {...oldStationData, ...newStationsData}
    })
    return updatedData
}

function secondsToDateString(seconds) {
    const time = parseInt(String(seconds).padEnd(13,0)); //seconds => miliseconds
    const dateString = new Date(time).toLocaleString();
    const lastUpdatedString = "Sist oppdatert: " + dateString;
    return lastUpdatedString
 }

 export {getStationsData, getAvailability, updateData, secondsToDateString}