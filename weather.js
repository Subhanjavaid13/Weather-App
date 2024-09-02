const apiKey = "2a6ad6d586f3d5eaffd86acd1793c465";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();
        
        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "sunny.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "heavy-rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "rain.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "haze.png";
        }
    } catch (error) {
        console.log("Error:", error);
    }

}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click(); 
    }
});
checkWeather(Lahore);
