// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */
const parser = require('body-parser');
const { response } = require('express');
const express = require('express');




/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');
const router = express.Router();
router.use(parser.urlencoded({extended: true }));
router.use(express.json());
/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');




/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */
var tagStore = new GeoTagStore();
// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
 

  var list = tagStore.getGeoTags(); 
  res.render('index', { 
    taglist: list,
    taglist_json: JSON.stringify(list),
    latitude : "", 
    longitude : ""});
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */
router.post('/tagging', (req, res) => {
  let name = req.body.name;
  let lat = req.body.latitude;
  let long = req.body.longitude;
  let hash = req.body.hashtag;  
  geotag = new GeoTag(name, lat, long ,hash);
  tagStore.addGeoTag(geotag);
  let neartags = tagStore.getNearbyGeoTags(geotag);
  res.render("index", {
    taglist: neartags,
    latitude: lat,
    longitude: long,
    taglist_json: JSON.stringify(neartags)
  });
});
/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

router.post('/discovery', (req, res) => {  
  let searchvalue = req.body.Search;
  let lat = req.body.lat_hidden; 
  let long = req.body.long_hidden;

  geotag = new GeoTag("none", lat, long, "none");
  list = tagStore.searchNearbyGeoTags(geotag, 1,searchvalue);
  res.render("index", {
    taglist: list ,
    latitude: lat,
    longitude:long,
    taglist_json: JSON.stringify(list)
  });
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */
router.get('/api/geotags',(req, res) => {
  if (!req.query.long|| !req.query.lat){
    res.json(tagStore.getNearbyGeoTags(undefined,100));
  }else{
    
    var long  = req.query.long;
    var lat = req.query.lat;  
    var geotag = new GeoTag("", lat, long, "");
    var list = tagStore.searchNearbyGeoTags(geotag,100,req.query.search);
    console.log(lat+":::"+ long+"___"+ req.query.search);
    res.json(list); 
  }

  
});

/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

router.post('/api/geotags',(req,res) => {
 
  const geotag = new GeoTag(req.body.name, req.body.latitude,req.body.longitude, req.body.hashtag);
  var newID = tagStore.addGeoTag(geotag);
  res.setHeader("Content-Location", req.url+newID);
  res.status(201).json(tagStore.getGeoTagByID(newID));
  res.json(geotag);
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */
router.get('/api/geotags/:id', (req, res)=> {
  
  
  var tag = tagStore.getGeoTagByID(req.params.id);
  console.log(tag);
  if(!tag){
    res.status(404).end();
  }else{
    res.json(tag);
  }

});
/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */
router.put('/api/geotags/:id', (req, res)=> {
  let tag = tagStore.getGeoTagByID(req.params.id);
  if(!tag){
    res.status(404).end();
  }else{
    tagStore.updateGeoTag(req.params.id, req.body);
    res.status(202).json(tag);
  }

});

/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

router.delete('/api/geotags/:id', (req, res) => {
  var tag = tagStore.getGeoTagByID(req.params.id);
  if(!tag){
    res.status(404).end();
  }else{
    tagStore.removeGeoTagByID(req.params.id);
    res.json(tag);
  }


});
module.exports = router;
