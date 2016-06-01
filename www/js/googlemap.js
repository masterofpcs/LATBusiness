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
		//alert (formattedDate);
		//alert(this.map);
		// alert (' Lat: ' + position.coords.latitude + '\n' +
  //           ' Long: ' + position.coords.longitude + '\n' +
  //           ' alt: ' + position.coords.altitude + '\n' +
  //           ' accuracy: ' + position.coords.accuracy + '\n' +
  //           ' heading: ' + position.coords.heading + '\n' +
  //           ' speed: ' + position.coords.speed + '\n' +
  //           ' timestamp: ' + position.timestamp + '\n' );
		//var mapBounds = new google.maps.LatLngBounds(); 		
		var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
 		if (this.marker != null)
 			this.marker.setMap(null);
 		// var image = {
		    
		 //    // This marker is 20 pixels wide by 32 pixels high.
		 //    size: new google.maps.Size(20, 32),
		 //    // The origin for this image is (0, 0).
		 //    origin: new google.maps.Point(0, 0),
		 //    // The anchor for this image is the base of the flagpole at (0, 32).
		 //    anchor: new google.maps.Point(0, 32),
		    
		 //  };

 		this.marker = new google.maps.Marker({
    		position: myLatLng,
    		map: this.map,    		
    		title: 'Hello World!'
	  	});
 		this.map.setCenter(myLatLng);
 		if ((this.oldPosition == null)
 				|| (distance(position.coords.latitude, position.coords.longitude, 
 						this.oldPosition.coords.latitude, this.oldPosition.coords.longitude) > 0.050)) {
	 		//alert(document.getElementById("status_div").innerHTML);
	 		document.getElementById("status_div").innerHTML = "Connecting ...";

	 		var addpoint = "http://139.162.241.44/addpoint/" + device.uuid + "/" + 
	 				 formattedDate + "/" +  position.coords.longitude + "/" + position.coords.latitude + "/" +
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
	 	// 	$.ajax({
	 	// 		url: "addpoint", 
	 	// 		success: function(result){
   //          		alert(result);
   //      		}
   //      	});
   //      	alert(addpoint);
	 	// 	$.ajax({
			// 	type: "GET",
			// 	url: addpoint,				 
			// 	 success: function(data){
			// 	 	alert(data);
			// 	 	if(data=="1"){
			// 	 		alert("inserted");
			// 	 	}
			// 	 	else if(data=="0"){
			// 	 		alert("error");
			// 	 	}
			// 	 },
			// 	 error: function () {
			// 	 	// body...
			// 	 	alert("error")
			// 	 }

			// });
			// alert(addpoint);

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