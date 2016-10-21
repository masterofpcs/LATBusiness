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
    onDeviceReady: function() {        
        app.checkConnection();
        map = new GoogleMap();
        map.initialize();

        //alert (map);
        var watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
        //app.receivedEvent('deviceready');
    },
    onSuccess : function(position){
        // alert (' Lat: ' + position.coords.latitude + '\n' +
        //     ' Long: ' + position.coords.longitude + '\n' +
        //     ' alt: ' + position.coords.altitude + '\n' +
        //     ' accuracy: ' + position.coords.accuracy + '\n' +
        //     ' heading: ' + position.coords.heading + '\n' +
        //     ' speed: ' + position.coords.speed + '\n' +
        //     ' timestamp: ' + position.timestamp + '\n' );
        // alert('test');
        //alert (this.map);
        //alert (app.map);
        addMarkersToMap(position);
    },
    onError: function(error){
        alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
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
