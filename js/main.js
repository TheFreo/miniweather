// let nbDrop = 858; 
// function randRange( minNum, maxNum) {
//   return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
// }
// function createRain() {
// 	for( i=1;i<nbDrop;i++) {
// 	let dropLeft = randRange(0,1600);
// 	let dropTop = randRange(-1000,1400);
// 	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
// 	$('#drop'+i).css('left',dropLeft);
// 	$('#drop'+i).css('top',dropTop);
// 	}
// }
// createRain();

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition);
	}
}

function getPosition(pos) {
	let mn = pos.coords.latitude + ' ' + pos.coords.longitude;
	localStorage.setItem('keepLoc', mn);
	location.reload()
}

const nameLocation = document.getElementById("locationInput");
document.getElementById("popupLocaton").addEventListener("submit", (e) => {
	e.preventDefault()
	localStorage.setItem('keepLoc', nameLocation.value);
	location.reload()
});

let searchLocation = localStorage.getItem('keepLoc');

if (searchLocation === null) {
	searchLocation = 'Moscow';
	document.getElementById('popupLocaton').classList.toggle('popclose');
	getLocation();
}

async function getWeather() {
	const url = `http://api.weatherapi.com/v1/current.json?key=e77fbd1f803c4a6da49173124241707&q=${searchLocation}&aqi=no`;
	console.log(url)
	const res = await fetch(url);
	const data = await res.json();
	if (data.error) {
		locationName.textContent = `${data.error.message}`;
	}
	locationName.textContent = `${data.location.name}`;
	currentTemp.textContent = `${Math.trunc(data.current.temp_c)}°C`;
	weatherText.textContent = `${data.current.condition.text}`;
}
getWeather();

async function getForecast() {
	const url = `https://api.weatherapi.com/v1/forecast.json?key=e77fbd1f803c4a6da49173124241707&q=${searchLocation}&days=4&aqi=no&alerts=no`;
	const res = await fetch(url);
	const data = await res.json();
	for (let i = 0; i < 4; i++) {
		const dateInfo = document.createElement("p");
		const weatherInfo = document.createElement("p");
		let ul = document.getElementById("listDays");
		let li = document.createElement("li");

		li.style.display = 'flex';
		li.setAttribute("id", "day" + i)
		ul.appendChild(li);

		const tet = new Date(`${data.forecast.forecastday[i].date}`);
		dateInfo.textContent = tet.toDateString().slice(0, -5);
		document.getElementById("day" + i).appendChild(dateInfo);

		// const weatherImg = new Image(32, 32);
		// weatherImg.src = data.forecast.forecastday[i].day.condition.icon;
		// document.getElementById("day" + i).appendChild(weatherImg);

		weatherInfo.textContent = `${Math.trunc(data.forecast.forecastday[i].day.avgtemp_c)}°C`;
		document.getElementById("day" + i).appendChild(weatherInfo);
	}
}
getForecast();

document.getElementById('locationName').onclick = function () {
	const popupLoc = document.getElementById('popupLocaton');
	popupLoc.classList.toggle('popclose');
	if (!popupLoc.classList.contains('popclose')) {
		getLocation();
	}
}
