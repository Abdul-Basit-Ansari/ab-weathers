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
            console.table(allDetails);
            let { city } = allDetails;
            city = city;
            access.innerHTML = "";
           

            
            axios.get(`https://api.weatherapi.com/v1/current.json?key=76007bb94a1842099f7154509222907&q=${city}&aqi=no`)
                .then(function (response) {
                    console.log(response.data);

                    

					let result = document.getElementById('weatherResult');
					result.innerHTML = "";
					let data = response.data;
					let city = data.location.name;
					let region = data.location.region;
					let country = data.location.country;
					let icon = data.current.condition.icon;
					let weathertext = data.current.condition.text;
					let windmph = data.current.wind_mph;
					let windkph = data.current.wind_kph;
					let temp = data.current.temp_c;
					let cloud = data.current.cloud;
					let humidity = data.current.humidity;
					let lastupdate = data.current.last_updated;
					let ltime = data.location.localtime;
					let currentdate = new Date();
					const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
					let day = weekday[currentdate.getDay()];
					let datetime = "" + currentdate.getDay() + "/" + currentdate.getMonth()
						+ "/" + currentdate.getFullYear()
					console.log(datetime,);
					
					let createdDate = ltime;
					createdDate = new Date(createdDate);
					let date = createdDate.toLocaleDateString();
					let time = createdDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
					access.style.display = 'none';
					result.innerHTML = `<div  class="forecast-container myglass">
					<div class="today forecast">
						<div class="forecast-header">
							<div class="day">${day}</div>
							<div class="date">${date + '   ' + time}</div>
		
						</div> <!-- .forecast-header -->
						<div class="forecast-content">
							<div class="location">
							<div class="mycity">
								<img class="locationmark" src="images/icon-marker.png" alt="">&nbsp;&nbsp;&nbsp;${city}
							   <p>Humidity : ${humidity} %</p>
								</div>
							<div>
								<div class="mycountry">${country}</div>
								<p>${weathertext}</p>
								</div>
							</div>
							<div class="degree">
								<div class="num">${temp}<sup>o</sup>C</div>
								<div class="forecast-icon">
									<img src="${icon}" alt="" width=90>
									</div>
									</div>
									
							
							<span style="display:inline-block;margin-top:20px;"><img src="images/icon-wind.png" alt="">${windkph}km/h</span>
							
							<span><img src="images/mylogo.png" alt="">${cloud}</span>
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
	axios.get(`https://api.weatherapi.com/v1/current.json?key=76007bb94a1842099f7154509222907&q=${mycity}&aqi=no`)
		.then(function (response) {
			
			
			let result = document.getElementById('weatherResult');
					result.innerHTML = "";
					let data = response.data;
					let city = data.location.name;
					let region = data.location.region;
					let country = data.location.country;
					let icon = data.current.condition.icon;
					let weathertext = data.current.condition.text;
					let windmph = data.current.wind_mph;
					let windkph = data.current.wind_kph;
					let temp = data.current.temp_c;
					let cloud = data.current.cloud;
					let humidity = data.current.humidity;
					let lastupdate = data.current.last_updated;
					let ltime = data.location.localtime;
					let currentdate = new Date();
					const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
					let day = weekday[currentdate.getDay()];
					let datetime = "" + currentdate.getDay() + "/" + currentdate.getMonth()
						+ "/" + currentdate.getFullYear()
					console.log(datetime,);
					
					let createdDate = ltime;
					createdDate = new Date(createdDate);
					let date = createdDate.toLocaleDateString();
					let time = createdDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
					access.style.display = 'none';

					result.innerHTML = `<div  class="forecast-container myglass">
					<div class="today forecast">
						<div class="forecast-header">
							<div class="day">${day}</div>
							<div class="date">${date + '   ' + time}</div>
		
						</div> <!-- .forecast-header -->
						<div class="forecast-content">
							<div class="location">
							<div class="mycity">
								<img class="locationmark" src="images/icon-marker.png" alt="">&nbsp;&nbsp;&nbsp;${city}
							   <p>Humidity : ${humidity} %</p>
								</div>
							<div>
								<div class="mycountry">${country}</div>
								<p>${weathertext}</p>
								</div>
							</div>
							<div class="degree">
								<div class="num">${temp}<sup>o</sup>C</div>
								<div class="forecast-icon">
									<img src="${icon}" alt="" width=90>
									</div>
									</div>
									
							
							<span style="display:inline-block;margin-top:20px;"><img src="images/icon-wind.png" alt="">${windkph}km/h</span>
							
							<span><img src="images/mylogo.png" alt="">${cloud}</span>
						</div>
					</div>    
				</div>`

			// handle success
			console.log('city', city, 'temp :', temp);
			console.log('after', result);
			console.log(data);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
}
