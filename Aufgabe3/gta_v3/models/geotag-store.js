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
    #taglist = [];

    constructor(){
        let examples = GeoTagExamples.tagList;     
        examples.forEach(element => {
            let tag = new GeoTag(element[0], element[1],element[2],element[3]);
            this.#taglist.push(tag);
          });

    }
    addGeoTag(geoTag) {
        this.#taglist.push(geoTag);
        
    
    }
    removeGeoTaG(geoTag) {
        newList0 =[]; 
        newList1 =[];
        list = 0;
        this.#taglist.array.forEach(element => {
            if(geoTag == element){
                if(!list){
                    newList0.push(element);
                }else{
                    newList1.push(element);
                }
            }else{
                list = 1;
            }

            
          });
          this.#taglist = newList0.concat(newList1);

    }    
    getNearbyGeoTags(location, radius) {
        var newList = [];
        this.#taglist.forEach(element=>{
            let distance = Math.sqrt(Math.pow(element.longitude-location.longitude,2)+Math.pow(element.latitude-location.latitude,2));
            if(distance<= radius){
                newList.push(element);
            }
        });
        return newList;
        
    }  
    searchNearbyGeoTags(location, radius, keyword) {
        newList = [];
        list = getNearbyGeoTags(location,radius); 
        list.forEach(element=>{
            if(element.name== keyword || element.hashtag == keyword){
                newList.push(element);
            }
        });
        return newList;
    }


}

module.exports = InMemoryGeoTagStore
