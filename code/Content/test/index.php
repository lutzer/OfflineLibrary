<?php

	require("database.php");

	// API TESTS

	$db = new Database();
	$db->create();

	//fill database
	$db->insertDocument(array(
		"id" => null,
		"title" => "The Hitchhikers Guide to the Galaxy",
		"author" => "Adams, Douglas",
		"description" => "soon is towel day.",
		"keywords" => "scifi fantasy comedy",
		"topic" => "42",
		"published" => 1979,
		"language" => "German",
		"file" => "hitchhiker.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"description" => null,
		"keywords" => null,
		"topic" => "42",
		"published" => 1856,
		"language" => "French",
		"file" => "bovary.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"topic" => "something else",
		"language" => "French",
		"file" => "bovary.pdf"
	));
	$db->insertDocument(array(
		"id" => null,
		"title" => "Madame Bovary",
		"author" => "Flaubert Gustave",
		"file" => "bovary.pdf"
	));

	// list all documents	
	echo "<h1>ALL DOCUMENTS</h1>";
	$rows = $db->listDocuments();
	var_dump($rows);


	// list all topics
	echo "<h1>ALL TOPICS</h1>";	
	$rows = $db->listTopics();
	var_dump($rows);

	echo "<h1>DELETED SECOND DOCUMENT</h1>";	
	$db->deleteDocument(2);
	$rows = $db->listDocuments();
	var_dump($rows);

	echo "<h1>GET FIRST DOCUMENT</h1>";	
	$rows = $db->getDocument(1);
	var_dump($rows);

	echo "<h1>CHANGE TITLE</h1>";
	$db->insertDocument(array(
		"id" => 1,
		"title" => "The Hitchhikers Guide to the Sea",
		"author" => "Adams, Douglas",
		"description" => "soon is towel day.",
		"keywords" => "scifi fantasy comedy",
		"topic" => "42",
		"published" => 1979,
		"language" => "German",
		"file" => "hitchhiker.pdf"
	));
	$rows = $db->getDocument(1);
	var_dump($rows);
