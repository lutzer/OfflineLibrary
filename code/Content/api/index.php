<?php

	require("Database.php");
	require('RestServer.php');

	class Controller {

		/**
		* @url GET /?documents
		*/
		function listDocuments() {
			$db = new Database();
			$result = $db->listDocuments();
			return $result;
		}

		/**
		 * @url GET /?documents/$id
		 */
		function getDocument($id = null) {
			$db = new Database();
			$result = $db->getDocument($id);
			return $result;
		}
		
		/**
		 * @url POST /?documents
		 * @url PUT /?documents/$id
		 */
		function insertDocument($id = null) {
			
			if ($id == null) {
				if (!isset($_FILES['file']))
					throw new RestException(400, 'No File submitted');
				
				$file = $_FILES['file'];
				
				// append filename to post data and insert in database
				$db = new Database();
				$_POST['file'] = $file['name']; 
				$db->insertDocument($_POST);
				
				$id = $db->lastInsertRowid();
				
				//move file to shared directory
				$upload_dir = DIR_RECORD_FILES.'/'.$id;
				try {
					uploadFile($file['tmp_name'],$upload_dir,$file['name']);
				} catch (Exception $e) {
					throw new RestException(400, $e->getMessage());
				}
				
				return $db->getDocument($id);
			}
			
			//insert Model and return it
			/*try {
				$db->insertDocument($_POST);
			} catch (Exception $e) {
				throw new RestException(400, $e->getMessage());
			}*/
			
			
			
		}

		/**
		 * @url DELETE /?documents/$id
		 */
		function deleteDocument($id = null) {
			$db = new Database();
			$db->deleteDocument($id);
		}

		/**
		* @url GET /?topics
		*/
		function listTopics() {
			$db = new Database();
			$result = $db->listTopics();
			return $result;
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
			throw new Exception('Cant copy file to new server.');
		}
		
	}

	spl_autoload_register(); // don't load our classes unless we use them

	$mode = 'debug'; // 'debug' or 'production'
	$server = new RestServer($mode);

	$server->addClass('Controller');
	$server->handle();