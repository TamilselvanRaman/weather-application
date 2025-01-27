const apikey = "0996be3de1d030d4dbef3b485fd69e66";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json(); // Parse JSON response

        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on conditions
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "./clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "./clear.png";
                break;
            case "Rain":
                weatherIcon.src = "./rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "./drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "./mist.png";
                break;
            default:
                weatherIcon.src = "./default.png"; // Default icon
        }

        // Show weather info and hide error
        document.querySelector(".Error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        // Display error message if city not found or other issues
        document.querySelector(".Error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
