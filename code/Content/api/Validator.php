<?php

	/* Validator Rules */
	const VALIDATE_NON_EMPTY_STRING = 0;
	const VALIDATE_NUMBER = 1;
	const VALIDATE_EXISTS = 2;

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
			
			//field not present
			if (!isset($this->data[$field]))
				return $field." is required.";
			
			// check fields
			if ($rule == VALIDATE_NON_EMPTY_STRING) {
				if (trim($this->data[$field])==='')
					return $field." is empty.";
			}
			
			//passed validation
			return  null;			
		}
	
	}