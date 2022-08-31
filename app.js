var weatherApp = document.querySelector('#weather__app');
var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var time = document.querySelector('.time');
var temperatureValue = document.querySelector('.temperature .value');
var shortDesc = document.querySelector('.short__desc');
var visibilityValue = document.querySelector('.visibility .value');
var windValue = document.querySelector('.wind .value');
var humidityValue = document.querySelector('.humidity .value');
var body = document.querySelector('body');

function changWeatherUI(searchValue) {
    var weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.trim()}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`;
    search.value = '';

    fetch(weatherApi)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if(data.cod == 200) {
                city.innerHTML = `${data.name}`;
                country.innerText = `${data.sys.country}`;
                time.innerText = new Date().toLocaleString(`${data.sys.country}`);
                temperatureValue.innerHTML = `${Math.floor(data.main.temp)} <sup>o</sup>C`;
                shortDesc.innerText = `${data.weather[0].main}`;
                visibilityValue.innerText = `${data.visibility} (m)`;
                windValue.innerText = `${data.wind.speed} (m/s)`;
                humidityValue.innerText = `${data.main.humidity} (%)`;

                const temp = Math.floor(data.main.temp);
                if(temp > 26) {
                    // hot
                    body.style.background = "linear-gradient(to top, var(--black-low-opacity), var(--black-high-opacity)), url('./images/hot.jpg') no-repeat center /cover";
                    weatherApp.style.background = "url('./images/hot.jpg') no-repeat center /cover"
                } else  if(temp > 23 && temp <= 26) {
                    // warm
                    body.style.background = "linear-gradient(to top, var(--black-low-opacity), var(--black-high-opacity)), url('./images/warm.jpg') no-repeat center /cover";
                    weatherApp.style.background = "url('./images/warm.jpg') no-repeat center /cover"
                } else if (temp >= 20 && temp <= 23) {
                    // cool
                    body.style.background = "linear-gradient(to top, var(--black-low-opacity), var(--black-high-opacity)), url('./images/cool.jpg') no-repeat center /cover";
                    weatherApp.style.background = "url('./images/cool.jpg') no-repeat center /cover"
                } else {
                    // cold
                    body.style.background = "linear-gradient(to top, var(--black-low-opacity), var(--black-high-opacity)), url('./images/cold.jpg') no-repeat center /cover";
                    weatherApp.style.background = "url('./images/cold.jpg') no-repeat center /cover"
                }

            } else {
                alert('Tên Thành Phố Chưa Được Cập Nhật');
            }
        }) 
}


search.addEventListener('keydown', function(e) {
    if(e.keyCode == 13) {
        body.removeAttribute('class');
        const searchValue = search.value;
        changWeatherUI(searchValue);
    }
})

changWeatherUI('ha noi');