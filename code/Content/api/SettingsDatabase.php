<?php

require_once("config.php");

class SettingsDatabase extends SQLite3 {
	function __construct() {
		$this->open(DATABASE_SETTINGS_FILE);
	}

	function create() {

		$this->drop();

		//set encoding
		$this->exec("PRAGMA encoding = 'UTF-8'");

		//create topic table
		$this->exec("CREATE TABLE ".DATABASE_SETTINGS_TABLE." ".
			"(about_text TEXT NOT NULL DEFAULT '-',".
			"footer_text TEXT NOT NULL DEFAULT 'Powered by OfflineLibrary',".
			"logo TEXT NOT NULL DEFAULT 'images/logo.png',".
			"header_color INTEGER DEFAULT 0,".
			"content_color INTEGER DEFAULT 0".
			")"
		);
		
		//insert one default row
		$this->exec("INSERT INTO ".DATABASE_SETTINGS_TABLE." DEFAULT VALUES");
	}

	function drop() {
		$this->exec("DROP TABLE ".DATABASE_SETTINGS_TABLE);
	}

	//get settings
	function getSettings() {
		$query = "SELECT * FROM ".DATABASE_SETTINGS_TABLE;
		$result = $this->query($query);
		if ($result)
			return $result->fetchArray(SQLITE3_ASSOC);
		return array();
	}

	//updateSettings
	function updateSettings($settings) {
		$stmt = $this->prepare("UPDATE ".DATABASE_SETTINGS_TABLE." SET ".
			"about_text=:about_text, footer_text=:footer_text, logo=:logo, ".
			"header_color=:header_color, content_color=:content_color"
		);

		foreach ($settings as $key => $value)
			$stmt->bindValue(':'.$key,$value);
		$stmt->execute();
	}

}