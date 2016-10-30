'use strict';

/* Lab 3: Airline route display. */

/**
 * App name space.
 *
 * The airlineRouteApp object encapsulates the variables and functions
 * into a namespace to prevent interference with global variables from
 * other libraries. In this case, it isn't strictly necessary, but a good
 * habit to get into.
 *
 * @type {object} airlineRouteApp
 */
var airlineRouteApp = airlineRouteApp || {};


/**
 * Indicates which cities have a direct flight between them.
 * A key has a direct flight to each of the cities in the array
 * associated with that key.
 *
 * @type {object} routes
 * @const
 */
airlineRouteApp.ROUTES = {
  'YYZ': ['YVR', 'YYC', 'YOW'],
  'YVR': ['YYZ', 'YYC'],
  'YXE': ['YYC'],
  'YYC': ['YXE','YVR', 'YYZ'],
  'YOW': ['YYZ']
};

/**
 * Detects presence of class in an element.
 * Return true if element has the class cls, false otherwise.
 *
 * @param {object} element
 * @param {string} cls
 * @return {boolean}
 */
airlineRouteApp.elementHasClass = function(element, cls) {
  return element.classList.contains(cls);
};

/**
 * Create a paragraph element for each route in the routes object.
 * The text of the element will be "SRC <=> DEST" where SRC is is one of
 * the keys in routes, and DEST is in the array of cities.
 * Because routes are bi-directional, they should not be duplicated in the
 * output. In other words only one of the following should appear on the
 * page: "YYZ <=> YVR" xor "YVR <=> YYZ".
 */
airlineRouteApp.buildRoutes = function() {
  var blacklist = new Array();  //list flights that are already printed

  //loops over all routes
  for (var route in airlineRouteApp.ROUTES){
    blacklist.push(route);

    //loops every destination flight
    var src = airlineRouteApp.ROUTES[route];

    for(var i in src){
      var dst = src[i];

      //if flight hasn't been printed
      if(!blacklist.includes(dst)){
        var paragraph = document.createElement("p");
        var flightRoute = route + "<=>" + dst;
        var routesID = document.getElementById('routes');

        paragraph.className += " " + route + " " + dst;
        paragraph.textContent = flightRoute;
        routesID.appendChild(paragraph);
      }
    }
  }

};

/**
 * Create one button element for each city in `routes`.
 * When the button is clicked, it will change the colour to red for all of the
 * paragraph elements with the class "route" and with the class name of
 * the city that is the name of the button.
 *
 * For example, if the user clicks on "YOW", only the "YOW <=> YYZ" route
 * will be coloured red. All other routes will be black.
 */
airlineRouteApp.buildCities = function() {
  // loop through every route
  for (let route in airlineRouteApp.ROUTES){
    var button = document.createElement('button');
    button.appendChild(document.createTextNode(route));
    document.getElementById('cities').appendChild(button);

    button.onclick = function(){
      var paragraphs = document.getElementsByTagName('p');
      for(var i = 0 ; i < paragraphs.length; i++){
        //paragraph contains route name in src or destination
        if (airlineRouteApp.elementHasClass(paragraphs[i], route)){
          paragraphs[i].style.color = "red";
          paragraphs[i].style.display = "block";
        }else{
          paragraphs[i].style.display = "none";
        }
      }
    }
  }

};

/**
 * Init function.
 */
airlineRouteApp.init = function() {
  this.buildRoutes();
  this.buildCities();
};

// Initializing.
airlineRouteApp.init();
