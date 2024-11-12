const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const forecastList = document.querySelector('.forecast-list');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "716f2521910c7dfc9e040337e88a70c8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    const forecast_data = await fetch(`${forecastUrl}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
    }

    // generate forecast list
    forecastList.innerHTML = '';
    forecast_data.list.forEach((item, index) => {
        if (index % 8 === 0 && index < 56) { // show every 8th item (i.e., every day) for 7 days
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <p>${new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>${Math.round(item.main.temp - 273.15)}°C</p>
                <p>${item.weather[0].description}</p>
            `;
            forecastList.appendChild(forecastItem);
        }
    });
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});