function GoogleMap(){
 	this.map = null; 	
 	this.marker = null;
 	this.oldPosition = null;

	this.initialize = function(){
		this.map = showMap();
	}
 
	var showMap = function(){
		var mapOptions = {
			zoom: 12,
			//center: new google.maps.LatLng(-33, 151),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		} 
		this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); 

		return this.map;
	}

	addMarkersToMap = function(position){
		//alert(this.map);
		// alert (' Lat: ' + position.coords.latitude + '\n' +
  //           ' Long: ' + position.coords.longitude + '\n' +
  //           ' alt: ' + position.coords.altitude + '\n' +
  //           ' accuracy: ' + position.coords.accuracy + '\n' +
  //           ' heading: ' + position.coords.heading + '\n' +
  //           ' speed: ' + position.coords.speed + '\n' +
  //           ' timestamp: ' + position.timestamp + '\n' );
		//var mapBounds = new google.maps.LatLngBounds(); 		
 		if ((this.oldPosition == null)
 				|| (distance(position.coords.latitude, position.coords.longitude, 
 						this.oldPosition.coords.latitude, this.oldPosition.coords.longitude) > 0.050)) {
	 		var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
	 		if (this.marker != null)
	 			this.marker.setMap(null);
	 		this.marker = new google.maps.Marker({
	    		position: myLatLng,
	    		map: this.map,
	    		title: 'Hello World!'
		  	});		
	 		this.map.setCenter(myLatLng);
	 		//this.map.setZoom(12);		
 		}
 		this.oldPosition = position;
 		//alert(distance(position.coords.latitude, position.coords.longitude, position.coords.latitude - 0.001, position.coords.longitude));
		//mapBounds.extend(latitudeAndLongitudeOne);
		//mapBounds.extend(latitudeAndLongitudeTwo);
 
		//map.fitBounds(mapBounds);
 	}
 	distance = function(lat1, lon1, lat2, lon2) {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344; // KM
		//if (unit=="N") { dist = dist * 0.8684 };
		return dist;
}
}