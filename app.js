window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationName = document.querySelector(".location-name");
    let locationIcon = document.querySelector(".weather-icon")
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://secret-ocean-49799.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=d2a6dd40cf2fce24b537a9171262cc23`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    const { description } = data.weather[0];
                    const { name } = data;
                    const { icon } = data.weather[0];
                    

                    //Set DOM Element from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationName.textContent = name;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                    
                    
                    
                   //Formula for Celsius
                 let celsius = (temp - 32) * (5 / 9);
                    //Set Icon
                    


                    //Change temperature from Celsius/Fahrenheit
                        temperatureSection.addEventListener("click", () => {
                            if(temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius);
                        } else { 
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                        }
                });
            });
        });
    }
});