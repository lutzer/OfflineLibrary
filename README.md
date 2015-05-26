# OfflineLibrary

## Install LibraryBox on TP Link MR 3020

Follow these instructions: <http://librarybox.us/building.php>

## Configure Library Box

See [Coniguration Instructions](docs/configure.md)

## TODO

* [x] Validation for Insert new Document
* [x] Delete Documents 
* [x] Clean up materialize.css code in uploadTemplate.html
* [x] create / delete topics
* [x] Modal Dialogs for Error Handling
* [x] Api: Clean up files which are not in database
* [ ] Put rest server in $mode=production
* [ ] Hover effect on drop down menu + grey as all topic color
* [ ] Validate Upload Form in javascript before submitting file

## MEETING TODO LIST

* Document List
    * [x] truncate description
    * [x] make author more prominent
    * [x] keywords zufällig verschieben, evt in weiss darstellen
    * [x] Farben in topic drop down menu
    * [x] Kein Topic-Farbe auf primär farbe ändern
* Upload
    * [ ] Upload size erhöhen wenn möglich 
    * [x] Title Feld automatisch angewählt
    * [x] Autor und Keyword format erklären
    * [x] Autor format: Lastname, Firstname; Lastname2, Firstname2; ...
    * [x] Progressbar für file upload
* Index
    * [x] Kategorien einklappbar
    * [ ] Color Coding für Topics und Title, evt durch farbige bullets
    * [ ] Autor Index: nur erstautor anzeigen
* Admin    
    * [x] Topic Farbe aus 16 Grundfarben auswählbar
    * [x] Header Farbe und Logo auswählbar
    * [x] About, Footer Text auswählbar

## QUESTIONS

* which file types need to be supported?
* **right now its only possible to upload files up to 15 mb**
* float keywords: do we really need it? it doesnt look so great. problem on resizing page