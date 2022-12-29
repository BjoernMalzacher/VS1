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

}

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation(){
    try {
        
        LocationHelper.findLocation(overwriteLocation);
    
    } catch (error) {
        alert(error.message);    
    } 
}
function overwriteLocation(helper){
    
    document.getElementById("Latitute_value")?.setAttribute("value",helper.latitude);
    document.getElementById("Longitute_value")?.setAttribute("value",helper.longitude);
    document.getElementById("latHidden")?.setAttribute("value", helper.latitude);
    document.getElementById("longHidden")?.setAttribute("Value", helper.longitude);
    mManager = new MapManager("GNQ8FCI311cYDR2EQ9UtoCZGidMfvBIK");
    mpQuestURL = mManager.getMapUrl(helper.latitude, helper.longitude);
    document.getElementById("mapView")?.setAttribute("src", mpQuestURL);
}   



// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();       
})