$(document).ready(function(){
	console.log('linked');
	$('.featureSearch').on('submit',function(e) {
		e.preventDefault();
		let searchTerm = this.querySelector('#search').value;
		$.ajax({
			method:'GET',
			url: `https://data.seattle.gov/resource/64yg-jvpt.json?feature_desc=${searchTerm}`
		}).done(data=>{
			console.table(data);
			let resultsArr = [];
			data.forEach(result=>{
				console.log(result['location_1']['coordinates']);
				let coords = ''
				if(result['location_1']&&result['location_1']['coordinates']) coords = `<p><location: ${result['location_1']['coordinates']}/p>`
				resultsArr.push(`<div><h1>${result.name}</h1><h3>${result['location_1_address']}</h3><h5>${result['feature_desc']}</h5>${coords}</div>`)
				let marker = new google.maps.Marker({
				    position: {lat:result['location_1']['coordinates'][0],lng:result['location_1']['coordinates'][1]},
				    map: map,
				    title:result.name,
				    animation: google.maps.Animation.DROP
  				});
			})
			let resultsDisplay = document.querySelector('#results');
			resultsDisplay.innerHTML = resultsArr.join('');
		});
	})
})