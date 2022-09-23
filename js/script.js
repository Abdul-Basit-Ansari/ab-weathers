let access = document.getElementById('access');
let allDetails;
let city;
let result = document.getElementById('weatherResult');


window.onload = function getLocation() {
    if (navigator.geolocation) {
        access.innerHTML = "Allow to detect your location"
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        access.innerHTML = "Geolocation is not supported by this browser."
    }
}



function onSuccess(position) {
    access.innerHTML = "Detecting your location...";
    let { latitude, longitude } = position.coords;


    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e228ae2eaf8f4751afb78f864bdf52ea`)
        .then(response => response.json()).then(result => {
            allDetails = result.results[0].components;
            let { city } = allDetails;
            city = city;
            access.innerHTML = "";
           

            let API_KEY = "37881bc9846791ec35df3a34271cf5d4";
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
                .then(function (response) {
                    console.log("Wahi Walar",response.data);

                    

					let result = document.getElementById('weatherResult');
					result.innerHTML = "";
					let data = response.data;
					let city = data.city.name;
					let country = data.city.country;
					let weathertext = data.list[0].weather[0].description;
					let windkph = data.list[0].wind.speed;
					let temp = data.list[0].main.temp;
					let feelsLike = data.list[0].main.feels_like;
					let humidity = data.list[0].main.humidity;
					let currentdate = new Date();
					const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					let day = weekday[currentdate.getDay()];
					let datetime = "" + currentdate.getDate() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear()
					console.log(datetime, currentdate);
					let time = currentdate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
					access.style.display = 'none';
					result.innerHTML = `<div  class="forecast-container myglass">
					<div class="today forecast">
						<div class="forecast-header">
							<div class="day">${day}</div>
							<div class="date">${datetime + '   ' + time}</div>
		
						</div> <!-- .forecast-header -->
						<div class="forecast-content">
							<div class="location">
							<div class="mycity">
								<img class="locationmark" src="images/icon-marker.png" alt="">&nbsp;&nbsp;&nbsp;${city}
							   <p>Humidity : ${humidity} %</p>
							   <p>Feels Like : ${feelsLike} %</p>
								</div>
							<div>
								<div class="mycountry">${country}</div>
								<p>${weathertext.toUpperCase()}</p>
								</div>
							</div>
							<div class="degree">
								<div class="num">${temp}<sup>o</sup>C</div>
								<div class="forecast-icon">
									<img src="icon" alt="" width=90>
									</div>
									</div>
									
							
							<span style="display:inline-block;margin-top:20px;"><img src="images/icon-wind.png" alt="">${windkph}km/h</span>
							
						</div>
					</div>    
				</div>`
                })
           
        });
    access.innerHTML = "";

}


function onError(error) {
    console.log(error);
    if (error.code == 1) {
        access.innerHTML = "User denied the request for Geolocation.";
    }
    else if (error.code == 2) {
        access.innerHTML = "Location information is unavailable.";
    }
    else if (error.code == 3) {
        access.innerHTML = "Something went wrong.";
    }
}





function myweather() {

	let mycity = document.getElementById('mycity').value;
	let API_KEY = "37881bc9846791ec35df3a34271cf5d4";
	axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${mycity}&appid=${API_KEY}&units=metric`)
	// axios.get(`https://api.weatherapi.com/v1/current.json?key=76007bb94a1842099f7154509222907&q=${city}&aqi=no`)
		.then(function (response) {
			console.log("Wahi Walar",response.data);

			

			let result = document.getElementById('weatherResult');
			result.innerHTML = "";
			let data = response.data;
			let city = data.city.name;
			let country = data.city.country;
			let weathertext = data.list[0].weather[0].description;
			let windkph = data.list[0].wind.speed;
			let temp = data.list[0].main.temp;
			let feelsLike = data.list[0].main.feels_like;
			let humidity = data.list[0].main.humidity;

			access.style.display = 'none';
			
			result.innerHTML = `<div  class="forecast-container myglass">
			<div class="today forecast">
				<div class="forecast-header">

				</div> <!-- .forecast-header -->
				<div class="forecast-content">
					<div class="location">
					<div class="mycity">
						<img class="locationmark" src="images/icon-marker.png" alt="">&nbsp;&nbsp;&nbsp;${city}
					   <p>Humidity : ${humidity} %</p>
					   <p>Feels Like : ${feelsLike} %</p>
						</div>
					<div>
						<div class="mycountry">${country}</div>
						<p>${weathertext.toUpperCase()}</p>
						</div>
					</div>
					<div class="degree">
						<div class="num">${temp}<sup>o</sup>C</div>
							</div>
							
					
					<span style="display:inline-block;margin-top:20px;"><img src="images/icon-wind.png" alt="">${windkph}km/h</span>
					
				</div>
			</div>    
		</div>` 
		
		
		// handle success
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
}
