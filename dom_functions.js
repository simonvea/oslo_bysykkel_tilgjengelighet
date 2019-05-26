import data from "./main.js"

function updateLastUpdatedText(text) {
    const textArea = document.querySelector(".last-updated");
    textArea.textContent = text;
}

function displayMatches() {
    const updatedData = data[data.length-1];
    const matchArray = findMatches(this.value, updatedData);
    updateTable(matchArray);
}

function findMatches(wordToMatch, table) {
    return table.filter(station => {
        const regex = new RegExp(wordToMatch, 'gi');
        return station.name.match(regex)
    });
}

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

export {updateLastUpdatedText, displayMatches, updateTable}