// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * A class to help using the HTML5 Geolocation API.
 */


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
function updateLocation(){
    LocationHelper.findLocation(neu);
}
function neu(parameter){
    document.getElementById("Latitute_value").value = parameter.latitude;
    document.getElementById("Longitute_value").value = parameter.longitude;
    document.getElementById("latitudehidden").value = parameter.latitude;
    document.getElementById("longitudehidden").value = parameter.longitude;
    variable = new MapManager("tBd00F6iMGlgF0aXpVy6AetyDM9vo50A");
    document.getElementById("mapView").src = variable.getMapUrl(parameter.latitude, parameter.longitude);
}
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});