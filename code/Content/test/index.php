<head>
<meta charset="UTF-8">
</head>
<body>
<?php

	require("../api/DocumentsDatabase.php");
	require("../api/SettingsDatabase.php");

	
	// API TESTS

	echo "<h1>DOCUMENT DB</h1>";
	$db = new DocumentsDatabase();
	$db->create();

	//create topics
	$db->insertTopic(array(
		"id" => null,
		"topic_name" => "Life, Universe and the whole Rest",
		"topic_color" => 1
	));
	$db->insertTopic(array(
		"id" => null,
		"topic_name" => "Lorem ipsum",
		"topic_color" => 2
	));
	$db->insertTopic(array(
		"id" => null,
		"topic_name" => "Schildkröten",
		"topic_color" => 3
	));
	$db->insertTopic(array(
		"id" => null,
		"topic_name" => "To be deleted",
		"topic_color" => 4
	));

	//fill database
	$db->insertDocument(array(
		"id" => null,
		"title" => "The Hitchhikers Guide to the Galaxy",
		"author" => "Adams, Douglas",
		"description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis vestibulum nisi at fermentum. Cras tempus, metus in pretium elementum, est dolor fringilla diam, ut euismod nulla ipsum non est. Proin dignissim nulla nunc, at tristique sem facilisis vel. Nunc ",
		"keywords" => "scifi fantasy comedy",
		"topic_id" => 1,
		"published" => 1979,
		"language" => "German",
		"file" => "hitchhiker.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"description" => "Etiam vulputate neque turpis, vel malesuada tellus commodo ut. Proin gravida augue odio, Aenean varius quam at quam convallis, id porta nulla luctus. Nullam a tincidunt odio, sit amet mollis elit. Pellentesque et tristique enim. Aliquam vel dolor et lectus venenatis varius at aliquam nulla. Integer vehicula nibh justo, aliquet feugiat ex maximus et. Curabitur ex velit, commodo vitae odio id, ultrices euismod ante. Curabitur lacinia est sed urna cursus, vitae finibus metus vulputate. Duis iaculis a est eget mollis. Maecenas feugiat sem sit amet tellus convallis, in placerat nisi sollicitudin. Duis vehicula ipsum nec elit dignissim, at ornare orci blandit. Donec varius sollicitudin euismod. Praesent ac imperdiet massa.",
		"keywords" => "french Literature",
		"topic_id" => 2,
		"published" => 1856,
		"language" => "French",
		"file" => "bovary.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"topic_id" => 2,
		"keywords" => "French literature",
		"language" => "French",
		"file" => "bovary.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"topic_id" => 3,
		"description" => "Etiam vulputate neque turpis, vel malesuada tellus commodo ut. Proin gravida augue odio,",
		"file" => "bovary.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "To be deleted",
		"author" => "Noone",
		"file" => "bovary.pdf"
	));

	// list all documents	
	echo "<h2>ALL DOCUMENTS</h2>";
	$rows = $db->listDocuments();
	var_dump($rows);


	// list all topics
	echo "<h2>ALL TOPICS</h2>";	
	$rows = $db->listTopics();
	var_dump($rows);

	echo "<h2>DELETE TOPIC</h2>";	
	$db->deleteTopic(4);
	$rows = $db->listTopics();
	var_dump($rows);

	echo "<h2>DELETED 5th DOCUMENT</h2>";	
	$db->deleteDocument(5);
	$rows = $db->listDocuments();
	var_dump($rows);

	echo "<h2>GET THIRD DOCUMENT</h2>";	
	$rows = $db->getDocument(3);
	var_dump($rows);

	echo "<h2>CHANGE TITLE</h2>";
	$db->insertDocument(array(
		"id" => 1,
		"title" => "The Hitchhikers Guide to the Galaxy (2)",
		"author" => "Adams, Douglas",
		"description" => "Aenean varius quam at quam convallis, id porta nulla luctus. Nullam a tincidunt odio, sit amet mollis elit. Pellentesque et tristique enim. Aliquam vel dolor et lectus venenatis varius at aliquam nulla. Integer vehicula nibh justo, aliquet feugiat ex maximus et. Curabitur ex velit, commodo",
		"keywords" => "scifi fantasy comedy",
		"topic_id" => 42 ,
		"published" => 1979,
		"language" => "German",
		"file" => "hitchhiker.pdf"
	));
	$rows = $db->getDocument(1);
	var_dump($rows);
	
	echo "<h1>SETTINGS DB</h1>";
	$db = new SettingsDatabase();
	$db->create();
	
	echo "<h2>GET SETTINGS</h2>";
	$rows = $db->getSettings();
	var_dump($rows);
	
	echo "<h2>CHANGE SETTINGS</h2>";
	$db->updateSettings(array(
			"about_text" => "-",
			"footer_text" => "Powered By OfflineLibrary.",
			"logo" => "images/logo.png",
			"header_color" => 0,
			"content_color" => 0
	));
	$rows = $db->getSettings();
	var_dump($rows);
	

?>
</body>