// Function to generate a table with provided data
function generateTable(data) {
    // Create table element
    var table = document.createElement('table');

    // Create table header row
    var headerRow = table.insertRow();
    for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
            var headerCell = document.createElement('th');
            headerCell.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
            headerRow.appendChild(headerCell);
        }
    }

    // Create table body rows
    data.forEach(function(item, index) {
        var row = table.insertRow();
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                var cell = row.insertCell();
                cell.id = key + '-cell-' + (index + 1);
                cell.textContent = item[key];
                // Add event listener to cell for editing
                cell.contentEditable = true;
                cell.addEventListener('input', function(event) {
                    var rowIndex = this.parentElement.rowIndex - 1; // Adjust for header row
                    var property = this.id.split('-')[0];
                    data[rowIndex][property] = this.textContent;
                    // Update localStorage
                    localStorage.setItem('data', JSON.stringify(data));
                });
            }
        }
    });

    return table;
}

// Function to add a new row with custom values
function addNewRow(date, time, temperature, pH, turbidity, result) {
    // Create a new row
    var newRow = {};

    // Assign values to each property of the new row object
    newRow.date = date;
    newRow.time = time;
    newRow['Temperature (°C)'] = temperature;
    newRow['pH Value'] = pH;
    newRow['Turbidity (NTU)'] = turbidity;
    newRow.result = result;

    // Push the new row object to the data array
    data.push(newRow);

    // Update the table to reflect the changes
}