# OfflineLibrary

## Install LibraryBox on TP Link MR 3020

Follow these instructions: <http://librarybox.us/building.php>

## Configure Library Box

See [Coniguration Instructions](docs/configure.md)

## Install Offline Library

1. Follow the [Coniguration Instructions](docs/configure.md). Only these two steps are necessary:
    * setup the lighthttpd config
    * change the php.ini
2. Replace code/content Folder in **/mnt/usb/LibraryBox/**
3. Create the two directories with chmod 777:
`/mnt/usb/LibraryBox/Shared/docs`
`/mnt/usb/LibraryBox/Shared/images/logo`

4. Reboot The LibraryBox


## TODO

* [x] Validation for Insert new Document
* [x] Delete Documents 
* [x] Clean up materialize.css code in uploadTemplate.html
* [x] create / delete topics
* [x] Modal Dialogs for Error Handling
* [x] Api: Clean up files which are not in database
* [ ] Put rest server in $mode=production
* [ ] Validate Upload Form in javascript before submitting file

## MEETING TODO LIST

* Document List
    * [x] truncate description
    * [x] make author more prominent
    * [x] keywords zufällig verschieben, evt in weiss darstellen
    * [x] Farben in topic drop down menu
    * [x] Kein Topic-Farbe auf primär farbe ändern
    * [x] Fix Column layout, no blank space
    * [x] Add Entry Type Property
* Upload
    * [ ] Upload size erhöhen wenn möglich 
    * [x] Title Feld automatisch angewählt
    * [x] Autor und Keyword format erklären
    * [x] Autor format: Lastname, Firstname; Lastname2, Firstname2; ...
    * [x] Progressbar für file upload
    * [x] Disclaimer unter upload formular einfügen
* Index
    * [x] Kategorien einklappbar
    * [x] Color Coding für Topics und Title, evt durch farbige bullets
    * [ ] Autor Index: nur erstautor anzeigen
* Admin    
    * [x] Topic Farbe aus 16 Grundfarben auswählbar
    * [x] Header Farbe und Logo auswählbar
    * [x] About, Footer Text auswählbar
* Header
    * [x] Topic schrift weiss 
    * [x] Search funktion implementieren
    * [x] Header Schriftzug neben Logo "Offline Library"

* Other
    * [x] "Topic" durch "collection" ersetzt werden 
    * [ ] Logout mechanismus
    * [ ] Special Characters in upload file 
    * [ ] Collection:name statt topic_id bei filter

## QUESTIONS

* which file types need to be supported?
* **right now its only possible to upload files up to 15 mb**