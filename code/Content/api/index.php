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

	spl_autoload_register(); // don't load our classes unless we use them

	$mode = 'debug'; // 'debug' or 'production'
	$server = new RestServer($mode);

	$server->addClass('Controller');
	$server->handle();