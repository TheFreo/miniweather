const apiKey = 'e77fbd1f803c4a6da49173124241707';

const themeColor = document.querySelector('meta[name="theme-color"]');

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
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=3&aqi=no&alerts=no`;
	const res = await fetch(url);
	const data = await res.json();

	if (data.error) {
		locationName.textContent = `${data.error.message}`;
	}

	locationName.textContent = `${data.location.name}`;
	currentTemp.textContent = `${Math.trunc(data.current.temp_c)}°C`;
	weatherText.textContent = `${data.current.condition.text}`;
	weatherWind.textContent = `${data.current.wind_mph}m/s`;

	const weatherImg = new Image(100, 100);
	weatherImg.src = data.current.condition.icon;
	currentImg.appendChild(weatherImg);

	console.log(url);

	for (let i = 0; i < 3; i++) {
		const dateInfo = document.createElement("p");
		const weatherInfo = document.createElement("p");
		let ul = document.getElementById("listDays");
		let li = document.createElement("li");

		li.setAttribute("id", "day" + i)
		ul.appendChild(li);

		const tet = new Date(`${data.forecast.forecastday[i].date}`);
		dateInfo.textContent = tet.toDateString().slice(0, -5);
		document.getElementById("day" + i).appendChild(dateInfo);

		const weatherImg = new Image(32, 32);
		weatherImg.src = data.forecast.forecastday[i].day.condition.icon;
		document.getElementById("day" + i).appendChild(weatherImg);

		weatherInfo.textContent = `${Math.trunc(data.forecast.forecastday[i].day.maxtemp_c)}°     ${Math.trunc(data.forecast.forecastday[i].day.mintemp_c)}°`;
		document.getElementById("day" + i).appendChild(weatherInfo);
	}
}
getWeather();

document.getElementById('locationName').onclick = function () {
	const popupLoc = document.getElementById('popupLocaton');
	popupLoc.classList.toggle('popclose');
}

document.getElementById('geoButton').onclick = function () {
	getLocation();
}



function darkTheme() {
	const wrapper = document.body;
	wrapper.classList.toggle('darkthm');
	const but = document.getElementById('themeToggle');
	but.classList.toggle('darkthm');
	const but2 = document.getElementById('locationName');
	but2.classList.toggle('darkthm');
	const git = document.querySelector('.git');
	git.classList.toggle('darkimg');
	const windd = document.querySelector('.windIcon');
	windd.classList.toggle('darkimg');
	if (themeColor.content === '#fff') {
		themeColor.content = '#2E3643';
	} else {
		themeColor.content = '#fff'
	}
}

document.getElementById('themeToggle').onclick = function () {
	darkTheme();
}

let dateTime = new Date();
let hour = dateTime.getHours();

if (hour < 6) {
	darkTheme();
	themeColor.content = '#2E3643';
}
