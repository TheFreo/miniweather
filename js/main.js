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
	} else {
		alert('devvv');
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
	locationName.textContent = `${data.location.name}`;
	currentTemp.textContent = `${Math.trunc(data.current.temp_c)}°C`;
	weatherText.textContent = `${data.current.condition.text}`;
}
getWeather();

document.getElementById('locationName').onclick = function () {
	const popupLoc = document.getElementById('popupLocaton');
	popupLoc.classList.toggle('popclose');
	if (!popupLoc.classList.contains('popclose')) {
		getLocation();
	}
}

