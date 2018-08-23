function showPage() {
 	document.getElementById("loader").style.display = "none";
  	document.getElementById("content").style.display = "block";
}
function initMap() {
	navigator.geolocation.getCurrentPosition(position=> {
  		map = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: position.coords.latitude, lng: position.coords.longitude	},
    		zoom: 13
    	})
    	showPage()
	})
}