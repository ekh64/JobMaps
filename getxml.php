<?php
    $locale = $_GET['l'];
	$userip = $_SERVER['REMOTE_ADDR'];
	$useragent = $_SERVER['HTTP_USER_AGENT'];
	$agent = rawurlencode($useragent);
	
	$url = "http://api.indeed.com/ads/apisearch?publisher=1788752251438036&q=&l=".$locale."&sort=&radius=&st=&jt=&start=0&limit=25&fromage=&filter=&latlong=1&co=us&chnl=&userip=".$userip."&useragent=".$agent."&v=2";
	
	$document = new DOMDocument();
	$document->load($url);
	echo $document->saveXML();
	
	?>