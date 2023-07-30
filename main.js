// Defining a constant variable to store the API key
const API_KEY = '26d427cd145115abab09715730dc4e0d';

// Adding an event listener to execute getWeather function when the DOM is loaded
window.addEventListener('DOMContentLoaded', (e) => {
    getWeather(e);
});

// Variables to store references to various elements in the HTML
var address = document.querySelector('.address')
var icon = document.querySelector('.icon')
var mainTemp = document.querySelector('.mainTemp')
var unit = document.querySelector('#togBtn')
var description = document.querySelector('.description')
var minTemp = document.querySelector('.minTemp')
var maxTemp = document.querySelector('.maxTemp')
var pressure = document.querySelector('.pressure')
var humidity = document.querySelector('.humidity')

// Variables to store references to date elements
var date2 = document.querySelector('.date2')
var date3 = document.querySelector('.date3')
var date4 = document.querySelector('.date4')
var date5 = document.querySelector('.date5')

// Variables to store references to weather icon elements
var icon1 = document.querySelector('.icon1')
var icon2 = document.querySelector('.icon2')
var icon3 = document.querySelector('.icon3')
var icon4 = document.querySelector('.icon4')
var icon5 = document.querySelector('.icon5')

// Variables to store references to temperature elements
var temperature1 = document.querySelector('.Temperature1')
var temperature2 = document.querySelector('.Temperature2')
var temperature3 = document.querySelector('.Temperature3')
var temperature4 = document.querySelector('.Temperature4')
var temperature5 = document.querySelector('.Temperature5')

// Variables to store references to weather description elements
var description1 = document.querySelector('.description1')
var description2 = document.querySelector('.description2')
var description3 = document.querySelector('.description3')
var description4 = document.querySelector('.description4')
var description5 = document.querySelector('.description5')

// Variables to store references to various weather details elements
var sunriseTime = document.querySelector('.sunriseTime')
var sunsetTime = document.querySelector('.sunsetTime')
var cloudPercentage = document.querySelector('.cloudPercentage')
var cloudDetails = document.querySelector('.cloud-details')
var windSpeed = document.querySelector('.windSpeed')
var windDegree = document.querySelector('.windDegree')
var windDetails = document.querySelector('.windDetails')
var rain = document.querySelector('.rain')
var rainDetails = document.querySelector('.rainDetails')
var avgMaxTemp = document.querySelector('.avgMaxTemp')
var avgMinTemp = document.querySelector('.avgMinTemp')

// Variables to store references to location details elements
var long = document.querySelector('.long')
var lat = document.querySelector('.lat')
var population = document.querySelector('.population')

// Adding an event listener to the search form to execute getWeather function when submitted
document.querySelector('.search').addEventListener('submit', getWeather)

// Default city name to display weather information for
var cityName = 'Latur'

// Adding an event listener to the unit toggle button to execute getWeather function when changed
unit.addEventListener('change', getWeather)

// Function to get the day of the week based on a number (0 for Sunday, 1 for Monday, etc.)
function getDay(number) {
    // Use a switch statement to return the corresponding day
    switch (number) {
        case 0:
        case 7:
            return 'Sunday';
        case 1:
        case 8:
            return 'Monday';
        case 2:
        case 9:
            return 'Tuesday';
        case 3:
        case 10:
            return 'Wednesday';
        case 4:
        case 11:
            return 'Thursday';
        case 5:
        case 12:
            return 'Friday';
        case 6:
        case 13:
            return 'Saturday';
    }
}

// Function to get the weather icon image based on the weather string
function getIcon(string) {
    // Use if-else statements to determine the icon based on the weather string
    if (string === 'Rain') {
        return '/img/rain.png';
    } else if (string === 'Clear') {
        return '/img/sun1.png';
    } else if (string === 'Clouds') {
        return '/img/clouds.png';
    }
}

// Function to get the time in AM/PM format based on a timestamp
function getTime(time) {
    // Convert the timestamp to a Date object
    var time = new Date(time * 1000);

    // Extract hours, minutes, and seconds from the Date object
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // Add leading zeros if necessary
    if (hours.toString().length == 1) {
        hours = "0" + hours;
    }
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    }

    // Convert to AM/PM format
    if (hours < 10) {
        return (hours + ' : ' + minutes + ' AM ');
    } else {
        hours = hours - 12;
        if (hours.toString().length == 1) {
            hours = "0" + hours;
        }

        return (hours + ' : ' + minutes + ' PM ');
    }
}

// Function to get a textual description based on cloud percentage
function getCloudText(number) {
    if (number <= 33 && number >= 0) {
        return 'Few parts of the sky are covered with Clouds.';
    } else if (number > 33 && number <= 66) {
        return 'Around Half part of the sky is filled with clouds.';
    } else {
        return 'Most part of the sky is filled with clouds.';
    }
}

// Function to fetch weather data from the OpenWeatherMap API and display it on the page
function getWeather(e) {
    // Prevent the form from submitting and refreshing the page
    e.preventDefault();

    // Get the input value from the search box
    var searchBox = document.querySelector('.searchBox');
    var day = new Date().getDay();
    var units;

    // Set the cityName variable based on the input value
    if (searchBox.value == '') {
        cityName = 'Latur';
    } else {
        cityName = searchBox.value;
    }

    // Check the unit toggle button and set the units variable accordingly (metric or imperial)
    if (unit.checked == false) {
        units = 'metric';
    } else {
        units = 'imperial';
    }

    // Fetch weather data from the OpenWeatherMap API using the cityName and units
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${units}`)
    .then((res) => {
        // Check if the response is not okay (error handling)
        if (!res.ok) {
            throw Error("Sorry, the given location is not found.");
        } else {
            return res.json();
        }
    })
    .then((data) => {
        // Update the HTML elements with the fetched weather data

        // Display the city name
        address.innerHTML = data.city.name;
        // Set the weather icon based on the current weather
        icon.src = getIcon(data.list[0].weather[0].main);

        // Display the temperature (formatted with degree symbol) based on the selected unit system (metric or imperial)
        if (units === 'metric') {
            mainTemp.innerHTML = `${Math.floor(data.list[0].main.temp)}&#730;`;
            minTemp.innerHTML = `Min Temperature &darr; ${data.list[0].main.temp_min}&#730;`;
            maxTemp.innerHTML = `Max Temperature &uarr; ${data.list[0].main.temp_max}&#730;`;
            temperature1.innerHTML = `${Math.floor(data.list[0].main.temp)}&#730;`;
            temperature2.innerHTML = `${Math.floor(data.list[8].main.temp)}&#730;`;
            temperature3.innerHTML = `${Math.floor(data.list[16].main.temp)}&#730;`;
            temperature4.innerHTML = `${Math.floor(data.list[24].main.temp)}&#730;`;
            temperature5.innerHTML = `${Math.floor(data.list[32].main.temp)}&#730;`;
            avgMaxTemp.innerHTML = `${data.list[0].main.temp_max}&#730; `;
            avgMinTemp.innerHTML = `${data.list[0].main.temp_min}&#730; `;
        } else {
            mainTemp.innerHTML = Math.floor(data.list[0].main.temp);
            minTemp.innerHTML = `Min Temperature &darr; ${data.list[0].main.temp_min}`;
            maxTemp.innerHTML = `Max Temperature &uarr; ${data.list[0].main.temp_max}`;
            temperature1.innerHTML = Math.floor(data.list[0].main.temp);
            temperature2.innerHTML = Math.floor(data.list[8].main.temp);
            temperature3.innerHTML = Math.floor(data.list[16].main.temp);
            temperature4.innerHTML = Math.floor(data.list[24].main.temp);
            temperature5.innerHTML = Math.floor(data.list[32].main.temp);
            avgMaxTemp.innerHTML = `${data.list[0].main.temp_max} `;
            avgMinTemp.innerHTML = `${data.list[0].main.temp_min} `;
        }

        // Display the weather description, pressure, and humidity
        description.innerHTML = data.list[0].weather[0].description;
        pressure.innerHTML = `Pressure ${data.list[0].main.pressure} hPa`;
        humidity.innerHTML = `Humidity ${data.list[0].main.humidity} %`;

        // Display the dates for the next five days
        date2.innerHTML = getDay(day + 1);
        date3.innerHTML = getDay(day + 2);
        date4.innerHTML = getDay(day + 3);
        date5.innerHTML = getDay(day + 4);

        // Set the weather icons and descriptions for the next five days
        icon1.src = getIcon(data.list[0].weather[0].main);
        icon2.src = getIcon(data.list[8].weather[0].main);
        icon3.src = getIcon(data.list[16].weather[0].main);
        icon4.src = getIcon(data.list[24].weather[0].main);
        icon5.src = getIcon(data.list[32].weather[0].main);

        description1.innerHTML = data.list[0].weather[0].description;
        description2.innerHTML = data.list[8].weather[0].description;
        description3.innerHTML = data.list[16].weather[0].description;
        description4.innerHTML = data.list[24].weather[0].description;
        description5.innerHTML = data.list[32].weather[0].description;

        // Display sunrise and sunset times
        sunriseTime.innerHTML = getTime(data.city.sunrise);
        sunsetTime.innerHTML = getTime(data.city.sunset);

        // Display cloud percentage and textual description
        cloudPercentage.innerHTML = `${data.list[0].clouds.all}%`;
        cloudDetails.innerHTML = getCloudText(data.list[0].clouds.all);

        // Display wind speed and degree details
        windSpeed.innerHTML = `${data.list[0].wind.speed}m/s`;
        windDegree.innerHTML = `${data.list[0].wind.deg}&#730;`;
        windDetails.innerHTML = `The velocity of wind will be ${data.list[0].wind.speed}m/s with an angle of ${data.list[0].wind.deg}&#730; to the North.`;

        // Display rain volume for the last 3 hours
        rain.innerHTML = `${data.list[0].rain["3h"]}`;
        rainDetails.innerHTML = `Rain volume for the last 3 hours is ${data.list[0].rain["3h"]} mm.`;

        // Display longitude and latitude of the city
        long.innerHTML = `Longitude: ${data.city.coord.lon}`;
        lat.innerHTML = `Latitude: ${data.city.coord.lat}`;
    })
    .catch((err) => {
        // Handle any errors that occurred during the fetch process
        console.log("Weather data not found");
    });
}
