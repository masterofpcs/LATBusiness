/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    map : null,
    failureCount: 0,
    // Application Constructor
    initialize: function() {
        
        //alert ('test2');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    checkConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        // alert('Device Model: '    + device.model    + '<br />' +
        //         'Device Cordova: '  + device.cordova  + '<br />' +
        //         'Device Platform: ' + device.platform + '<br />' +
        //         'Device UUID: '     + device.uuid     + '<br />' +
        //         'Device Version: '  + device.version  + '<br />');
    },
    onBackButton: function(status) {
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
        location.reload();
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
        return false;
    },
    onBatteryStatus: function(status) {
            //alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
            //document.getElementById("status_div").innerHTML = "Level: " + status.level + " isPlugged: " + status.isPlugged;
            
                document.getElementById("status_div").innerHTML = "Charger Unplugged ...";
                if(!status.isPlugged)
                    var addpoint = "http://tracking.ltsegypt.com/discharge/" + device.uuid + "/" + status.level;
                else
                    var addpoint = "http://tracking.ltsegypt.com/charge/" + device.uuid + "/" + status.level;
                //alert(addpoint);
                //if(status.level < 100)
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                      if (xhttp.responseText == "1") {
                        //alert("success");
                        document.getElementById("status_div").innerHTML = "Charging data sent successfully";
                      } 
                      else {
                        //alert("error");
                        document.getElementById("status_div").innerHTML = "Error in storing data";
                      }
                    }
                  };
                  xhttp.open("GET", addpoint, true);
                  xhttp.send();
              
        },
        
    onDeviceReady: function() {
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
        document.addEventListener("backbutton", app.onBackButton, false);
        app.checkConnection();
        map = new GoogleMap();
        map.initialize();

        //alert (map);
        var watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true });
        //app.receivedEvent('deviceready');
    },
    onSuccess : function(position){
        addMarkersToMap(position);
    },
    onError: function(error){
        app.failureCount++;
        document.getElementById("status_div").innerHTML = 'GPS Err code: '    + error.code + " FailureCount " + app.failureCount +
          '  message: ' + error.message;
        //navigator.geolocation.clearWatch(watchID);
        if (failureCount > 5)
            watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { maximumAge: 60000, timeout: 15000, enableHighAccuracy: false });
        else
            watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { maximumAge: 60000, timeout: 15000, enableHighAccuracy: true });
        //window.addEventListener("batterystatus", app.onBatteryStatus, false);
        //location.reload();
        //window.addEventListener("batterystatus", app.onBatteryStatus, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
