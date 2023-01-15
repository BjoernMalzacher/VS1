// File origin: VS1LAB A2




class GeoTag {
    latitude = '';
    longitude =  ''; 
    name = '';
    hashtag ='';
    
    constructor(name, latitude, longitude,hashtag ){
        
        this.latitude = latitude; 
        this.longitude = longitude;
        this.name = name;
        this.hashtag = hashtag;
    }

}

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
        json_list = "[]";
    }

    mpQuestURL = mManager.getMapUrl(lat, long, JSON.parse(json_list), 5);
    document.getElementById("mapView")?.setAttribute("src", mpQuestURL);
}
function overwriteLocation(helper){
    
        document.getElementById("Latitute_value")?.setAttribute("value",helper.latitude);
        document.getElementById("Latitute_value")?.setAttribute("readonly",true);
    
        document.getElementById("Longitute_value")?.setAttribute("value",helper.longitude);
        document.getElementById("Longitute_value")?.setAttribute("readonly",true);
        
        document.getElementById("latHidden")?.setAttribute("value", helper.latitude);
        document.getElementById("longHidden")?.setAttribute("Value", helper.longitude);
    
        createMap(helper.latitude, helper.longitude);
    }  
   


    async function submitFunc(event){
        var lat = document.getElementById("Latitute_value")?.getAttribute("Value");
        var long = document.getElementById("Longitute_value")?.getAttribute("Value");
        var name = document.getElementById("name_value")?.value;        
        var hash = document.getElementById("Hash_id")?.value;
        var geotag = new GeoTag(name,lat,long,hash);
        console.log(geotag);
       await fetch('http://localhost:3000/api/geotags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(geotag)
        })
.catch(error => console.error(error));
        addtoListElement(geotag);
        event.preventDefault();
}
function addtoListElement(geotag){
    var p = document.getElementById("discoveryResults").innerHTML 
    p = p + "<li>"+ geotag.name+" ( "+ geotag.latitude+","+ geotag.longitude+") "+ geotag.hashtag+" </li>";
    document.getElementById("discoveryResults").innerHTML = p;
    
}
function emptyListElement(){
    document.getElementById("discoveryResults").innerHTML = "";
    
}
async function  searchFunc(event){
    var lat = document.getElementById("latHidden")?.getAttribute("Value");
    var long = document.getElementById("longHidden")?.getAttribute("Value");
    var search = document.getElementById("search_value")?.value;
    await fetch('http://localhost:3000/api/geotags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
            'latitude' : lat,
            'longitude': long,
            'search' : search

        }
        }).then(response => response.json()).then( data => {
                emptyListElement();
                for(let index = 0; index < data.length; index++) {
                    addtoListElement(data[index]);
                    
                }
                document.getElementById("mapView")?.setAttribute('data-tags',JSON.stringify(data));
                 createMap(lat,long);
            }
              

            )

      .catch(error => console.error(error));
      event.preventDefault();
}
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();       
    document.getElementById("tag-form")?.addEventListener('submit', submitFunc)
    
    document.getElementById("discoveryFilterForm")?.addEventListener('submit', searchFunc)

});

