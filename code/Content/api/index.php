<?php

	require_once('config.php');
	require_once("DocumentsDatabase.php");
	require_once("SettingsDatabase.php");
	require_once('RestServer.php');
	require_once('Validator.php');
	
	// PDF, TXT, RTF, DOC(X), EPUB, HTML, ODT
	$UPLOAD_ALLOWED_EXTENSIONS = array("jpg", "jpeg", "gif", "png", "txt", "pdf", "doc", "docx", "odt", "epub", "html", "rtf");

	class Controller {
		
		/* function authorizes user */
		function authorize() {
			if (!isset($_SERVER['PHP_AUTH_USER']))
				return false;
			
			$db = new SettingsDatabase();
			$result = $db->getCredentials();

			// check password
			if ($_SERVER['PHP_AUTH_USER'] == $result['admin_username'] &&
				crypt($_SERVER['PHP_AUTH_PW'],$result['password_salt']) == $result['admin_password'])
				return true;
				
			return false;	
		}

		/**
		* @noAuth
		* @url GET /?documents
		*/
		function listDocuments() {
			
			if (isset($_GET['search'])) {
				$db = new DocumentsDatabase();
				$result = $db->searchDocuments($_GET['search']);
				return $result;
			} else {
				$db = new DocumentsDatabase();
				$result = $db->listDocuments();
				return $result;
			}
		}

		/**
		 * @noAuth
		 * @url GET /?documents/$id
		 */
		function getDocument($id = null) {
			$db = new DocumentsDatabase();
			$result = $db->getDocument($id);
			return $result;
		}
		
		/**
		 * @noAuth
		 * @url POST /?documents
		 * @url PUT /?documents/$id
		 */
		function insertDocument($id = null) {
			
			//validate post data
			$validator = new Validator($_POST);
			$errors = $validator->validate(array(
				'title' => VALIDATE_RULE_REQUIRED | VALIDATE_RULE_NON_EMPTY_STRING,
				'author' => VALIDATE_RULE_REQUIRED | VALIDATE_RULE_NON_EMPTY_STRING,
				'published' => VALIDATE_RULE_YEAR,
				'keywords' => VALIDATE_RULE_REQUIRED | VALIDATE_RULE_TAGS,
				'isbn' => VALIDATE_RULE_ISBN, 
			));
			if (!empty($errors))
				throw new RestException(400, implode(" ",$errors));
			
			//change string cases
			$_POST['title'] = ucfirst($_POST['title']);
			$_POST['author'] = ucwords($_POST['author']);
			$_POST['keywords'] = strtolower($_POST['keywords']);
			
			// submit new entry and upload file
			if ($id == null) {
				if (!isset($_FILES['file']) || empty($_FILES['file']['name']))
					throw new RestException(400, 'No File submitted');
				
				$file = $_FILES['file'];
				
				if ($file['size'] < 1 || $file['size'] > UPLOAD_FILE_MAX_SIZE)
					throw new RestException(400, "File is too large, maximum file size is ".strval(UPLOAD_FILE_MAX_SIZE/8/1024/1024)." MB.");
				
				// append filename to post data and insert in database
				$db = new DocumentsDatabase();
				$_POST['file'] = $file['name']; 
				$db->insertDocument($_POST);
				
				//upload file
				$id = $db->lastInsertRowid();
				$upload_dir = DIR_RECORD_FILES.'/'.$id;
				try {
					checkFileType($file['name']);
					uploadFile($file['tmp_name'],$upload_dir,$file['name']);
				} catch (Exception $e) {
					// delete entry if upload failed
					$db->deleteDocument($id);
					throw new RestException(400, $e->getMessage());
				}
				
				return $db->getDocument($id);
				
			// modify entry
			} else {
				//insert Model and return it
				$db = new DocumentsDatabase();
				$db->insertDocument($_POST);
				return $db->getDocument($id);
			}
			
		}

		/**
		 * @url DELETE /?documents/$id
		 */
		function deleteDocument($id = null) {
			$db = new DocumentsDatabase();
			$db->deleteDocument($id);
			
			$upload_dir = DIR_RECORD_FILES.'/'.$id;
			deleteDirectory($upload_dir);
		}

		/**
		* @noAuth
		* @url GET /?topics
		*/
		function listTopics() {
			$db = new DocumentsDatabase();
			$result = $db->listTopics();
			return $result;
		}
		
		/**
		 * @url DELETE /?topics/$id
		 */
		function deleteTopics($id) {
			$db = new DocumentsDatabase();
			$db->deleteTopic($id);
		}
		
		/**
		 * @url POST /?topics
		 * @url PUT /?topics/$id
		 */
		function insertTopics($id,$data) {
			$db = new DocumentsDatabase();
			$db->insertTopic($data);
		}
		
		
		/**
		 * @noAuth
		 * @url GET /?settings
		 */
		function getSettings() {
			$db = new SettingsDatabase();
			$result = $db->getSettings();
			return $result;
		}
		
		/**
		 * 
		 * @url POST /?settings
		 */
		function updateSettings($data) {
			
			//check if new logo is submitted
			if (isset($_FILES['file'])) {
				$file = $_FILES['file'];
				try {
					uploadFile($file['tmp_name'],DIR_LOGO_FILE,$file['name']);
				} catch (Exception $e) {
					throw new RestException(400, $e->getMessage());
					return;
				}
				$_POST['logo'] = DIR_LOGO_FILE.'/'.$file['name'];
				
				$db = new SettingsDatabase();
				$result = $db->updateSettings($_POST);
				return $result;
				
			}
			
			$db = new SettingsDatabase();
			$result = $db->updateSettings($data);
			return $result;
			
			
		}
		
		/**
		 *
		 * @url GET /?login
		 */
		function login() {
			return "logged in succesfull";
		}
		
		/**
		 *
		 * @url POST /?password
		 */
		function password() {
			
			if (isset($_POST['password'])) {
				$db = new SettingsDatabase();
				$result = $db->updatePassword($_POST['password']);
				return "password updated";
			}
			
			throw new RestException(400,"No password submitted");
		}
		
		/**
		 *
		 * @url GET /?reset
		 */
		function resetDatabase() {
			
			// create settings database
			$db = new SettingsDatabase();
			$db->create();
			$db->updateSettings(array(
				"about_text" => "Lorem ipsum...",
				"footer_text" => "Powered By OfflineLibrary.",
				"logo" => "images/logo.png",
				"header_color" => 0,
				"content_color" => 0
			));
			
			//create standard documents database
			$db = new DocumentsDatabase();
			$db->create();
			$db->insertTopic(array(
				"id" => null,
				"topic_name" => "Culture, Arts & Media",
				"topic_color" => 1
			));
			$db->insertDocument(array(
				"id" => null,
				"title" => "Rethinking Gamification",
				"author" => "Fuchs, Mathias; et al.",
				"description" => "This book is about gamification, and much more. The publication intends to explore the concept of gamification, its history and applications, its implications for theory and practice. It also aims at doing more than simply mapping a trend, or providing guidelines for the design of gamification apps. In this book the concept of gamification will be rethought, through several distinct approaches and a multitude of questions.",
				"keywords" => "games economy gamification",
				"topic_id" => 1,
				"published" => 2014,
				"language" => "English",
				"entry_type" => "Book",
				"file" => "rethinking-gamification.pdf",
				"isbn" => "978-3-95796-001-6"
			));
			$db->insertDocument(array(
				"id" => null,
				"title" => "Digital Solidarity",
				"author" => "Stalder, Felix",
				"description" => "Felix Stalder’s extended essay, Digital Solidarity, responds to the wave of new forms of networked organisation emerging from and colliding with the global economic crisis of 2008. Across the globe, voluntary association, participatory decision making and the sharing of resources, all widely adopted online, are being translated into new forms of social space. This movement operates in the breach between accelerating technical innovation, on the one hand, and the crises of institutions which organise, or increasingly restrain society on the other. Through an inventory of social forms – commons, assemblies, swarms and weak networks – the essay outlines how far we have already left McLuhan’s ‘Gutenberg Galaxy’ behind. In his cautiously optimistic account, Stalder reminds us that the struggles over where we will arrive are only just beginning.",
				"keywords" => "games economy gamification",
				"topic_id" => 1,
				"published" => 2013,
				"language" => "English",
				"entry_type" => "Book",
				"file" => "Digital-Solidarity-Felix-Stalder.pdf",
				"isbn" => "978-1-906496-92-0"
			));
			
		}
	}
	
	function checkFileType($fileName) {
		
		global $UPLOAD_ALLOWED_EXTENSIONS;
		
		$extension = pathinfo($fileName, PATHINFO_EXTENSION);
		if(!in_array($extension, $UPLOAD_ALLOWED_EXTENSIONS)) {
			throw new Exception('Only these file extensions are allowed: '.implode(", .",$UPLOAD_ALLOWED_EXTENSIONS));
		}
	}
	
	function uploadFile($tmp_file,$path,$filename) {
		
		//check if upload dir exists, else create it
		if(!is_dir($path))
			mkdir($path,0755);
		
		if (is_uploaded_file($tmp_file)) {
			// delete file if it exists
			$createFile = $path.'/'.$filename;
			if (is_file($createFile))
				unlink($createFile);
			move_uploaded_file($tmp_file,$createFile);
		} else {
			throw new Exception('Could not copy file');
		}
	}
	
	function deleteDirectory($directory) {
		
		//throw new RestException(400,$directory);
		
		if (!is_dir($directory))
			return;
		
		
		// delete content
		$files = glob($directory . '/*', GLOB_MARK);
		foreach ($files as $file) {
			unlink($file);
		}
		
		//delete empty directory
		rmdir($directory);
	}

	spl_autoload_register(); // don't load our classes unless we use them

	$mode = 'debug'; // 'debug' or 'production'
	$server = new RestServer($mode);

	$server->addClass('Controller');
	$server->handle();