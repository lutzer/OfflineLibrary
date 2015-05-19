<?php

require_once("config.php");

class DocumentsDatabase extends SQLite3 {
	function __construct() {
		$this->open(DATABASE_FILE);
	}

	function create() {

		$this->drop();

		//set encoding
		$this->exec("PRAGMA encoding = 'UTF-8'");

		//create topic table
		$this->exec("CREATE TABLE ".DATABASE_TABLE_TOPICS." ".
			"(id INTEGER PRIMARY KEY AUTOINCREMENT,".
			"topic_name TEXT NOT NULL,".
			"topic_color INTEGER".
			")"
		);

		// create document table
		$this->exec("CREATE TABLE ".DATABASE_TABLE_DOCUMENTS." ".
			"(id INTEGER PRIMARY KEY AUTOINCREMENT,".
			"title TEXT NOT NULL,".
			"author TEXT NOT NULL,".
			"description TEXT,".
			"keywords TEXT NOT NULL DEFAULT '',".
			"topic_id INTEGER,".
			"published INT DEFAULT 0,".
			"isbn TEXT,".
			"language TEXT DEFAULT 'English',".
			"created_at NUMERIC DEFAULT 0,".
			"file TEXT NOT NULL,
			FOREIGN KEY(topic_id) REFERENCES ".DATABASE_TABLE_TOPICS."(id)".
			")"
		);
	}

	function drop() {
		$this->exec("DROP TABLE ".DATABASE_TABLE_DOCUMENTS);
		$this->exec("DROP TABLE ".DATABASE_TABLE_TOPICS);
	}


	function getDocument($id) {
		$stmt = $this->prepare("SELECT documents.*,topics.topic_name,topics.topic_color ".
		"FROM ".DATABASE_TABLE_DOCUMENTS." AS documents ".
		"LEFT OUTER JOIN ".DATABASE_TABLE_TOPICS." AS topics ON topic_id=topics.id ".
		"WHERE documents.id=:id");
		$stmt->bindValue(":id",$id);
		$result = $stmt->execute();
		if ($result)
			return $result->fetchArray(SQLITE3_ASSOC);
		return array();
	}

	function listDocuments() {
		$query = "SELECT documents.*,topics.topic_name,topics.topic_color ".
		"FROM ".DATABASE_TABLE_DOCUMENTS." AS documents ".
		"LEFT OUTER JOIN ".DATABASE_TABLE_TOPICS." AS topics ON topic_id=topics.id";
		$result = $this->query($query);
		if ($result)
			return $this->fetchAllRows($result,SQLITE3_ASSOC);
		return array();
	}

	//insert or edit
	function insertDocument($document) {
		$stmt = $this->prepare("INSERT OR REPLACE INTO ".DATABASE_TABLE_DOCUMENTS." ".
			"(id,title,author,description,keywords,topic_id,published,isbn,language,file) VALUES ".
			"(:id,:title,:author,:description,LOWER(:keywords),:topic_id,:published,:isbn,:language,:file)"
		);

		foreach ($document as $key => $value)
			$stmt->bindValue(':'.$key,$value);

		$stmt->execute();
	}

	function deleteDocument($id) {
		$stmt = $this->prepare("DELETE FROM ".DATABASE_TABLE_DOCUMENTS." WHERE id=:id");
		$stmt->bindValue(':id',$id);
		$stmt->execute();
	}

	function insertTopic($topic) {
		$stmt = $this->prepare("INSERT OR REPLACE INTO ".DATABASE_TABLE_TOPICS." ".
			"(id,topic_name,topic_color) VALUES ".
			"(:id,:topic_name,:topic_color)"
		);

		foreach ($topic as $key => $value)
			$stmt->bindValue(':'.$key,$value);

		$stmt->execute();
	}

	function listTopics() {
		$query = "SELECT * FROM ".DATABASE_TABLE_TOPICS;
		$result = $this->query($query);
		if ($result)
			return $this->fetchAllRows($result,SQLITE3_ASSOC);
		return array();
	}

	function deleteTopic($id) {
		$stmt = $this->prepare("DELETE FROM ".DATABASE_TABLE_TOPICS." WHERE id=:id");
		$stmt->bindValue(':id',$id);
		$stmt->execute();
	}


	// fetches all rows from a sqlite3 result
	public static function fetchAllRows($result) {
		$rows = array();
		while($row = $result->fetchArray(SQLITE3_ASSOC))
			array_push($rows,$row);
		return $rows;
	}

}