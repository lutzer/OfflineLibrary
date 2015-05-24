<?php
/*
 * ADMIN SETTINGS
 */


/*
 * DATABASE SETTINGS
 */

// document database
define("DATABASE_FILE","../../documents.sqlite");
define("DATABASE_TABLE_DOCUMENTS","documents");
define("DATABASE_TABLE_TOPICS","topics");

// settings database
define("DATABASE_SETTINGS_FILE","../../settings.sqlite");
define("DATABASE_SETTINGS_TABLE","settings");

define("DIR_RECORD_FILES","../../Shared/docs");
define("DIR_LOGO_FILE","../../Shared/images/logo");

define("UPLOAD_FILE_MAX_SIZE",(8*1024*1024*100)); // 100mb
