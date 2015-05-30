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

		//create unique salt and set standard password
		$salt = uniqid(mt_rand(), true);
		$username = 'admin';
		$password = crypt('0000',$salt);
		
		//create topic table
		$this->exec("CREATE TABLE ".DATABASE_SETTINGS_TABLE." ".
			"(about_text TEXT NOT NULL DEFAULT '-',".
			"footer_text TEXT NOT NULL DEFAULT 'Powered by OfflineLibrary',".
			"logo TEXT NOT NULL DEFAULT 'images/logo.png',".
			"header_color INTEGER DEFAULT 0,".
			"content_color INTEGER DEFAULT 0,".
			"admin_username TEXT NOT NULL DEFAULT '".$username."',".
			"admin_password TEXT NOT NULL DEFAULT '".$password."',".
			"password_salt TEXT NOT NULL DEFAULT '".$salt."'".
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
		$query = "SELECT about_text, footer_text, logo, header_color, content_color FROM ".DATABASE_SETTINGS_TABLE;
		$result = $this->query($query);
		if ($result)
			return $result->fetchArray(SQLITE3_ASSOC);
		return array();
	}

	//update Settings
	function updateSettings($settings) {
		$stmt = $this->prepare("UPDATE ".DATABASE_SETTINGS_TABLE." SET ".
			"about_text=:about_text, footer_text=:footer_text, logo=:logo, ".
			"header_color=:header_color, content_color=:content_color"
		);

		foreach ($settings as $key => $value)
			$stmt->bindValue(':'.$key,$value);
		$stmt->execute();
	}
	
	//update Password
	function updatePassword($password) {
		$query = "SELECT password_salt FROM ".DATABASE_SETTINGS_TABLE;
		$result = $this->query($query);

		if ($result) {
			$row = $result->fetchArray(SQLITE3_ASSOC);
		
			$stmt = $this->prepare("UPDATE ".DATABASE_SETTINGS_TABLE." SET ".
					"admin_password=:password"
			);

			$stmt->bindValue(':password',crypt($password,$row['password_salt']));
			$stmt->execute();
		} else {
			throw new Exception('Could not get salt key from database.');
		}
	}
	
	//get Credentials
	function getCredentials() {
		$query = "SELECT admin_username, admin_password, password_salt FROM ".DATABASE_SETTINGS_TABLE;
		$result = $this->query($query);
		if ($result)
			return $result->fetchArray(SQLITE3_ASSOC);
		return array();
	}

}