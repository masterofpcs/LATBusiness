function GoogleMap(){
 	// this.map = null; 	
 	// this.marker = null;
 	this.oldPosition = null;
 	// this.oldDispPos = null;
 	// this.rot = 0;

	this.initialize = function(){
		// this.map = showMap();
	}
 
	var showMap = function(){
		// var mapOptions = {
		// 	zoom: 17,
		// 	//center: new google.maps.LatLng(-33, 151),
		// 	mapTypeId: google.maps.MapTypeId.ROADMAP
		// } 
		// this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); 
		// this.marker = new google.maps.Marker();
		// return this.map;
	}

	pad = function(d) {
		    return (d < 10 ? "0" : "") + d;
	}
	
	addMarkersToMap = function(position){
		var d = new Date(position.timestamp);
		var hours = d.getHours(),
		    minutes = d.getMinutes(),
		    seconds = d.getSeconds(),
		    month = d.getMonth() + 1,
		    day = d.getDate(),
		    year = d.getFullYear();

		

		var formattedDate = year + "-" + pad(month) + "-" + pad(day)
				+ " " + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

 		// this.marker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});	
 		// if ((this.oldDispPos == null)
 		// 		|| (google.maps.geometry.spherical.computeDistanceBetween(this.oldDispPos, this.marker.position)
 		// 			> 10)) {
 		// 	this.marker.setMap(null);
	 	// 	if (this.oldDispPos != null) { 	 			
		 //  		this.rot = google.maps.geometry.spherical.computeHeading(this.oldDispPos, this.marker.position);
		 //  		//alert(this.rot);
		 //  	}
		 //  	//alert("2");
		 //  	var icn = {
	  //       		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
	  //       		fillColor: '#00FFFF',
			// 	    fillOpacity: 0.8,
			// 	    strokeColor: '#0090FF',
			// 		scale: 4,
			// 		rotation: this.rot,
			// 	};
		 //  	//alert("3");
	 	// 	this.marker.setIcon(icn);
	 	// 	//alert("4");
		 //  	this.marker.setMap(this.map);
	 	// 	this.map.setCenter(this.marker.position);
	 	// 	this.oldDispPos = this.marker.position;
	 	// }

 		if ((this.oldPosition == null)
 				|| (distance(this.oldPosition.coords.latitude, this.oldPosition.coords.longitude, position.coords.latitude, position.coords.longitude))
 					> 0.05)) {
	 		//alert(document.getElementById("status_div").innerHTML);
	 		document.getElementById("status_div").innerHTML = "Connecting ...";

	 		var addpoint = "http://tracking.ltsegypt.com/addpoint/" + device.uuid + "/" + 
	 				 formattedDate + "/" +  position.coords.latitude + "/" + position.coords.longitude + "/" +
	 				 position.coords.altitude + "/" +  position.coords.speed + "/" + position.coords.accuracy;
	 		
	 		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (xhttp.readyState == 4 && xhttp.status == 200) {
			      if (xhttp.responseText == "1") {
			      	//alert("success");
			      	document.getElementById("status_div").innerHTML = "Data Stored successfully";
			      } 
			      else {
			      	//alert("error");
			      	document.getElementById("status_div").innerHTML = "Error in storing data";
			      }
			    }
			  };
			  xhttp.open("GET", addpoint, true);
			  xhttp.send();
	 		this.oldPosition = position;
 		}  		
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