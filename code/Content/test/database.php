<?php

define("DATABASE_FILE","documents.sqlite");
define("DATABASE_TABLE_DOCUMENTS","documents");

class Database extends SQLite3 {
	function __construct() {
		$this->open(DATABASE_FILE);
	}

	function create() {

		$this->drop();

		$query = "CREATE TABLE ".DATABASE_TABLE_DOCUMENTS." ".
			"(id INTEGER PRIMARY KEY AUTOINCREMENT,".
			"title TEXT NOT NULL,".
			"author TEXT NOT NULL,".
			"description TEXT,".
			"keywords TEXT,".
			"topic TEXT,".
			"published INT DEFAULT 0,".
			"isbn TEXT,".
			"language TEXT DEFAULT 'English',".
			"created_at NUMERIC DEFAULT 0,".
			"file TEXT NOT NULL".
			")";
		$this->exec($query);
	}

	function drop() {
		$query = "DROP TABLE ".DATABASE_TABLE_DOCUMENTS;
		$this->exec($query);
	}


	function getDocument($id) {
		$query = "SELECT * FROM ".DATABASE_TABLE_DOCUMENTS." WHERE id=".$id;
		$result = $this->query($query);
		if ($result)
			return $result->fetchArray(SQLITE3_ASSOC);
		
		return array();
	}

	function listDocuments() {
		$query = "SELECT * FROM ".DATABASE_TABLE_DOCUMENTS;
		$result = $this->query($query);
		if ($result) {
			$rows = array();
			while($row = $result->fetchArray(SQLITE3_ASSOC))
				array_push($rows,$row);
			return $rows;
		}
		
		return array();
	}

	//insert or edit
	function insertDocument($document) {
		$stmt = $this->prepare("INSERT OR REPLACE INTO ".DATABASE_TABLE_DOCUMENTS." ".
			"(id,title,author,description,keywords,topic,published,isbn,language,file) VALUES ".
			"(:id,:title,:author,:description,:keywords,:topic,:published,:isbn,:language,:file)"
		);

		foreach ($document as $key => $value)
			$stmt->bindValue(':'.$key,$value);

		$stmt->execute();
	}

	function deleteDocument($id) {
		$query = "DELETE FROM ".DATABASE_TABLE_DOCUMENTS." WHERE id=".$id;
		$this->exec($query);
	}

	function listTopics() {
		$query = "SELECT DISTINCT topic FROM ".DATABASE_TABLE_DOCUMENTS;
		$result = $this->query($query);
		if ($result) {
			$rows = array();
			while($row = $result->fetchArray(SQLITE3_ASSOC))
				array_push($rows,$row);
			return $rows;
		} 
		
		return array();
	}

}

