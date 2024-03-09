function displayTime() {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var dateTime = new Date();
    var dayOfWeek = daysOfWeek[dateTime.getDay()];
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    if (hrs >= 12) {
        session.innerHTML = 'PM';
    } else {
        session.innerHTML = 'AM';
    }

    if (hrs > 12) {
        hrs = hrs - 12;
    }

    hrs = hrs.toString().padStart(2, '0'); // Ensure two digits for hours
    min = min.toString().padStart(2, '0'); // Ensure two digits for minutes
    sec = sec.toString().padStart(2, '0'); // Ensure two digits for seconds

    // Remove the excess comma after the day
    document.getElementById('days').innerHTML = dayOfWeek;
    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
}

setInterval(displayTime, 1000); // Update every second
