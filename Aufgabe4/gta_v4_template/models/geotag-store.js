// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{
     #taglist = new Map();
     #id = 0;

    constructor(){
        let examples = GeoTagExamples.tagList;     
        examples.forEach(element => {
            let tag = new GeoTag(element[0], element[1],element[2],element[3]);
            
            (this.#id++);
            this.#taglist.set(this.#id, tag);
            
          });

    }
    addGeoTag(geoTag) {
        this.#taglist.set((this.#id++), geoTag);
        return this.#id;
    
    }
    getGeoTags(){
        return Array.from(this.#taglist.values());
    }
    getGeoTagByID(id){ 
        return this.#taglist.get(parseInt(id)); 
    }
    updateGeoTag(id, geotag){
        this.#taglist.set(this.#id, geotag);
        
    }

    removeGeoTagByID(id) {
        this.#taglist.delete(parseInt(id));
        
    }    
    getNearbyGeoTags(location , radius =100) {
        if(location != undefined){
        var newList = [];
        }else{
            return Array.from(this.#taglist.values());
        }
        
        this.#taglist.forEach(element=>{
            if(distance(location.latitude, location.longitude, element.latitude,element.longitude)<= radius){
                newList.push(element);
            
            }
    
        });

        return newList;
        
    }  
    searchNearbyGeoTags(location, radius= 100, keyword ="") {
        var list = this.getNearbyGeoTags(location,radius); 
        var newList = [];
        list.forEach(element => {
          let el_name =element.name.toLowerCase();
          let el_hash = element.hashtag.toLowerCase();
          let key_word = keyword.toLowerCase(); 
            if(el_name.includes(keyword.toLowerCase())||el_hash.includes(keyword.toLowerCase())){
                newList.push(element);
            }
        }); 
        return newList;
    }

}
function distance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const p = 0.017453292519943295; // Math.PI / 180
  
    // Calculate the distance
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 +
      Math.cos(lat1 * p) * Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    // Return the distance in kilometers
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  

module.exports = InMemoryGeoTagStore
