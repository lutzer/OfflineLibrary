<?php

	require_once('config.php');
	require_once("DocumentsDatabase.php");
	require_once("SettingsDatabase.php");
	require_once('RestServer.php');
	require_once('Validator.php');
	

	$UPLOAD_ALLOWED_EXTENSIONS = array("jpg", "gif", "png", "txt", "pdf", "doc", "docx", "odt", "epub");

	class Controller {

		/**
		* @url GET /?documents
		*/
		function listDocuments() {
			$db = new DocumentsDatabase();
			$result = $db->listDocuments();
			return $result;
		}

		/**
		 * @url GET /?documents/$id
		 */
		function getDocument($id = null) {
			$db = new DocumentsDatabase();
			$result = $db->getDocument($id);
			return $result;
		}
		
		/**
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
		}

		/**
		* @url GET /?topics
		*/
		function listTopics() {
			$db = new DocumentsDatabase();
			$result = $db->listTopics();
			return $result;
		}
		
		/**
		 * @url GET /?settings
		 */
		function getSettings() {
			$db = new SettingsDatabase();
			$result = $db->getSettings();
			return $result;
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
		if(!is_dir($path))  {
			mkdir($path,0755);
			//chmod($path,0777);
		} else {
			throw new Exception('Cant create directory for file upload.');
		}
		
		if (is_uploaded_file($tmp_file)) {
			move_uploaded_file($tmp_file, $path.'/'.$filename);
		} else {
			throw new Exception('No file submitted.');
		}
	}

	spl_autoload_register(); // don't load our classes unless we use them

	$mode = 'debug'; // 'debug' or 'production'
	$server = new RestServer($mode);

	$server->addClass('Controller');
	$server->handle();