/**
 * @author Erica
 */
var map;
var geocoder;
var locale;
var infowindow;

/*
 * Credit for this method goes to the Google Maps api tutorial
 * https://developers.google.com/maps/documentation/javascript/tutorial
 */
function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(40.741014,-74.006653),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
        infowindow = new google.maps.InfoWindow();
} 
    
function generateXMLq(){
	locale = document.getElementById("l").value;
	getXML();
}


function getXML(){
	var xmlRQ = new XMLHttpRequest();
  	xmlRQ.open("GET","getxml.php?l="+locale,true);
	xmlRQ.send();
	xmlRQ.onreadystatechange=function(){
  		if (xmlRQ.readyState==4 && xmlRQ.status==200)
    	{
    		var res = xmlRQ.responseText;
    		var parser=new DOMParser();
  			var xmlDoc=parser.parseFromString(res,"text/xml");
    		parseXML(xmlDoc);
    	}
  	}	
}

function parseXML(rslts){
	var results = rslts.getElementsByTagName("result");
	for(var i=0; i<results.length ;i++){
		plot(results[i],i);
	}
	center();
}

function plot(listing,z){
	var deets = {
		"lat":listing.getElementsByTagName("latitude")[0].childNodes[0].nodeValue,
		"ltude":listing.getElementsByTagName("longitude")[0].childNodes[0].nodeValue,
		"jobtitle":listing.getElementsByTagName("jobtitle")[0].childNodes[0].nodeValue,
		"company": listing.getElementsByTagName("company")[0].childNodes[0].nodeValue,
		"formloc":listing.getElementsByTagName("formattedLocation")[0].childNodes[0].nodeValue,
		"url": listing.getElementsByTagName("url")[0].childNodes[0].nodeValue,
		"zvalue": z
	}
	addMarkers(deets);
}

/*
 * centers map around the zipcode
 * credit https://developers.google.com/maps/documentation/javascript/geocoding
 */

function center() {
	geocoder.geocode({'address': locale}, function(results,status){
			if(status == google.maps.GeocoderStatus.OK){
				map.setCenter(results[0].geometry.location);
			}
			else
				alert("Something went wrong");
		});
}

function addMarkers(info){
	var coor = new google.maps.LatLng(info["lat"],info["ltude"]);
	var marker = new google.maps.Marker({
            position: coor,
            title: info["jobtitle"],
            map: map,
            zIndex: info["z"]
        });
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading"><a href="'+info["url"]+'" target="_blank">'+info["jobtitle"]+'</a> - '+info["company"]+'</h1>'+
        '<h2 id="bodyContent">'+info["formloc"]+
        '</h2>'+
        '</div>';
        

    google.maps.event.addListener(marker, 'click', function() {
    	infowindow.setOptions({
    	content: contentString,
    	position: coor,
    	zIndex: info["z"]
    });

      infowindow.open(map,marker);
    });     
        
        
        
}