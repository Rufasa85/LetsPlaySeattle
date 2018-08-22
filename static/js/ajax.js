$(document).ready(function(){
	console.log('linked');
	function distance(lat1, lon1, lat2, lon2, unit="K") {
		let radlat1 = Math.PI * lat1/180
		let radlat2 = Math.PI * lat2/180
		let theta = lon1-lon2
		let radtheta = Math.PI * theta/180
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}
	console.log('funcionts')	
	$('.featureSearch').on('submit',function(e) {
		e.preventDefault();
		let searchTerm = this.querySelector('#search').value;
		$.ajax({
			method:'GET',
			url: `https://data.seattle.gov/resource/64yg-jvpt.json?feature_desc=${searchTerm}`
		}).done(data=>{
			let resultsArr = [];
			console.log('ajax done')
			let myCoords;
			navigator.geolocation.getCurrentPosition(position=>{
				myCoords = position.coords;
			
				console.log(myCoords);
				data.forEach(result=>{
					if (result['location_1']) {
						console.log(result)
						let coords = '';
						let myDist = distance(myCoords.latitude,myCoords.longitude,result['location_1']['coordinates'][0],result['location_1']['coordinates'][1]);
						console.log(myDist, 'kilos')
						if(result['location_1']&&result['location_1']['coordinates']) coords = `<p><location: ${result['location_1']['coordinates']}/p>`
						resultsArr.push({
							distance:myDist,
							text:`<div><h1>${result.name}</h1><h3>${result['location_1_address']}</h3><h3>${myDist.toFixed(2)} kilometres away</h3></div>`
						})
							let marker = new google.maps.Marker({
							    position: {lat:result['location_1']['coordinates'][0],lng:result['location_1']['coordinates'][1]},
							    map: map,
							    title:result.name,
							    animation: google.maps.Animation.DROP
			  				});
					}
				})
				resultsArr.sort((a,b)=>{
					return a['distance']-b['distance']
				});
				console.log(resultsArr)
				let displayArr = resultsArr.map(obj=>{
					return obj['text'];
				})
				let resultsDisplay = document.querySelector('#results');
				resultsDisplay.innerHTML = displayArr.join('');
			})
		});
	})
})