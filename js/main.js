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

let currentLocation = 'Moscow';

async function getWeather() {
	const url = `http://api.weatherapi.com/v1/current.json?key=e77fbd1f803c4a6da49173124241707&q=${currentLocation}&aqi=no`;
	const res = await fetch(url);
	const data = await res.json();
	locationName.textContent = `${data.location.name}`;
	currentTemp.textContent = `+${Math.trunc(data.current.temp_c)}°C`;
	weatherText.textContent = `${data.current.condition.text}`;
}
getWeather();


