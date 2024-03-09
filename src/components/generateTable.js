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
    updateTable(); // Call the updateTable function
}

// Placeholder function for updating the table
function updateTable() {
    // Retrieve the 'collected-data' element
    var collectedDataElement = document.getElementById('collected-data');

    // Remove the existing table
    collectedDataElement.innerHTML = '';

    // Regenerate the table with the updated data
    var collectedDataTable = generateTable(data);
    collectedDataElement.appendChild(collectedDataTable);

    // Update localStorage
    localStorage.setItem('data', JSON.stringify(data));
}

// Call the function to generate the initial table
var data = JSON.parse(localStorage.getItem('data')) || []; // Initialize data from localStorage
updateTable();

// Function to get current date and time
function getCurrentDateTime() {
    // Create a new Date object
    let currentDate = new Date();

    // Get current date
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Month starts from 0
    let year = currentDate.getFullYear();

    // Get current time
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let meridiem = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format the date and time
    let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    let formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${meridiem}`;

    // Return the current date and time
    return {
        date: formattedDate,
        time: formattedTime
    };
}

// Log the contents of 'data' stored in localStorage
console.log("Contents of 'data' in localStorage:", JSON.parse(localStorage.getItem('data')));



////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EVERY 1 MIN FOR DEBUGGIN UNCOMMENT IF IDEDEBUG

// Example usage to add a new row every minute
/*setInterval(function() {
    const currentDateTime = getCurrentDateTime();
    
    // Add new row with dummy data
    addNewRow(currentDateTime.date, currentDateTime.time, 37, '7.5', 20, 'MODERATE');

    // Log the contents of 'data' stored in localStorage
    console.log("Contents of 'data' in localStorage:", JSON.parse(localStorage.getItem('data')));
}, 60000); // Check every minute (1000 milliseconds = 1 second)*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EVERY 5 MINS FOR DEBUGGIN UNCOMMENT IF IDEDEBUG

// Example usage to add a new row every 5 minutes
/*setInterval(function() {
    const currentDateTime = getCurrentDateTime();
    
    // Extract minutes from current time
    const minutes = parseInt(currentDateTime.time.split(':')[1]);

    // Check if the current time is a multiple of 5 minutes
    if (minutes % 5 === 0) {

        addNewRow(currentDateTime.date, currentDateTime.time, 37, '7.5', 20, 'MODERATE');

        // Log the contents of 'data' stored in localStorage
        console.log("Contents of 'data' in localStorage:", JSON.parse(localStorage.getItem('data')));
    }
}, 60000); // Check every minute (1000 milliseconds = 1 second)*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Example usage to add a new row every hour
setInterval(function() {
    const currentDateTime = getCurrentDateTime();
    
    // Extract hours and minutes from current time
    const hours = parseInt(currentDateTime.time.split(':')[0]);
    const minutes = parseInt(currentDateTime.time.split(':')[1]);

    // Check if the current time is at the start of an hour (minutes = 0)
    if (minutes === 0) {

        addNewRow(currentDateTime.date, currentDateTime.time, 37, '7.5', 20, 'MODERATE');

        // Log the contents of 'data' stored in localStorage
        console.log("Contents of 'data' in localStorage:", JSON.parse(localStorage.getItem('data')));
    }
}, 60000); // Check every minute (1000 milliseconds = 1 second)

