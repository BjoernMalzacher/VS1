// File origin: VS1LAB A3

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

    // TODO: ... your code here ...
    #geotags=[];
    addGeoTag(GeoTag){
        this.#geotags.push(GeoTag);
    }
    removeGeoTag(GeoTag){
        array1=[];
        array2=[];
        second =0;
        this.#geotags.array.forEach(element => {
            if(element==GeoTag){
                second=1;
            }else{
                if(second==0){
                    array1.push(element);
                }else{
                    array2.push(element);
                }
            }
        });
        this.#geotags=array1.concat(array2);
    }
    getNearbyGeoTags(location,radius){
        okay=[];
        this.#geotags.array.forEach(element => {
            distance=Math.sqrt(Math.pow(element.longitude-location.longitude,2)+Math.pow(element.latitude-location.latitude,2));
            if(distance<=radius){
                okay.push(element);
            }
        });
        return okay;
    }
    searchNearbyGeoTags(location,radius,keyword){
        nearbygeotags=getNearbyGeoTags(location,radius);
        allesklar=[];
        nearbygeotags.array.forEach(element => {
            if(element.name==keyword||element.hashtag==keyword){
                allesklar.push(element);
            }
        });
        return allesklar;
    }
    InMemoryGeoTagStore(){
        list=GeoTagExamples.tagList;
        list.array.forEach(element => {
            this.#geotags.push(new GeoTag(element[1],element[2],element[0],element[3]));
        });
    }

}

module.exports = InMemoryGeoTagStore
