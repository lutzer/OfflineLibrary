<?php

	/* Validator Rules */
	const VALIDATE_REQUIRED = 1;
	const VALIDATE_NON_EMPTY_STRING = 2;
	const VALIDATE_YEAR = 4;

	class Validator {
		
		function __construct($data) {
			$this->data = $data;
		}
		
		function validate($rules) {
			$errors = array();
			foreach ($rules as $field => $rule) {
				$error = $this->validateField($field,$rule);
				if ($error)
					array_push($errors,$error);
			}
			return $errors;
		}
		
		function validateField($field,$rule) {
			
			//check if field is set
			if (($rule & VALIDATE_REQUIRED) == VALIDATE_REQUIRED) {
				if (!isset($this->data[$field]) || empty($this->data[$field]))
					return $field." is required.";
			} else {
				if (!isset($this->data[$field]) || empty($this->data[$field]))
					return null;
			}
			
			// check fields
			if (($rule & VALIDATE_NON_EMPTY_STRING) == VALIDATE_NON_EMPTY_STRING) {
				if (trim($this->data[$field])==='')
					return $field." is empty.";
			} 
			if (($rule & VALIDATE_YEAR) == VALIDATE_YEAR) {
				if (!preg_match("/^[1-9]\d*$/",$this->data[$field]))
					return $field." is not a valid year.";
			}
			
			//passed validation
			return  null;			
		}
	
	}