/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('bindControl', function ($http, $timeout) {
    'use strict';
    var bindCtrl = this,
        onSuccess = function(position) {
            var logSpan = document.getElementById('logSpan');
            logSpan.innerText = logSpan.innerText + 'onSuccess\n';
            alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    function onError(error) {
        var logSpan = document.getElementById('logSpan');
        logSpan.innerText = logSpan.innerText + 'onError\n';
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    function parseCordovaContacts(cordovaConcats) {
        return cordovaConcats.map(function (e) {
            return {"name": e.displayName,
                   "phoneNumber": (e.phoneNumbers.length ? e.phoneNumbers[0].value : null) };
        }).filter(function (e) {
            //filter out 'undefined's
            return e;
        });
    }

    
    document.addEventListener("deviceready", function () {
        var logSpan = document.getElementById('logSpan');
        logSpan.innerText = logSpan.innerText + 'deviceready handler\n';
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            timeout: 60000,
            enableHighAccuracy: false
        });
//        navigator.contacts.find(['id', 'displayName'], function (contacts) {
//            alert('Found ' + contacts.length + ' contacts.\nThe first one: '+ JSON.stringify(contacts[0]));
//        }, function (err) {
//            alert(err);
//        });
    }, false);
});