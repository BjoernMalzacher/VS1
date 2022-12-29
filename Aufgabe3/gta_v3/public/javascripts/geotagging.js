// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */
// This script is executed when the browser loads index.htm
// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation(){
    try {
        lat = document.getElementById("latHidden")?.getAttribute("value");
        long = document.getElementById("Longhidden")?.getAttribute("value");
        if(!lat || !long){
            LocationHelper.findLocation(overwriteLocation); 
       
        }else{
            createMap(lat, long);
   
        } 
    } catch (error) {
        alert(error.message);    
    } 
}
function createMap(lat, long){
    mManager = new MapManager("GNQ8FCI311cYDR2EQ9UtoCZGidMfvBIK");
    let json_list =  document.getElementById("mapView").getAttribute("data-tags");
    if(!json_list){
        json_list =[];
    }
    mpQuestURL = mManager.getMapUrl(lat, long, JSON.parse(json_list));
    document.getElementById("mapView")?.setAttribute("src", mpQuestURL);
}
function overwriteLocation(helper){
    
        document.getElementById("Latitute_value")?.setAttribute("value",helper.latitude);
        document.getElementById("Latitute_value")?.setAttribute("readonly",true);
    
        document.getElementById("Longitute_value")?.setAttribute("value",helper.longitude);
        document.getElementById("L  ongitute_value")?.setAttribute("readonly",true);
        
        document.getElementById("latHidden")?.setAttribute("value", helper.latitude);
        document.getElementById("longHidden")?.setAttribute("Value", helper.longitude);
    
        createMap(helper.latitude, helper.longitude);
    }  
   



// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    console.log("i am getting called");
    updateLocation();       
});