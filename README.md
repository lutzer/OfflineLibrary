# OfflineLibrary

## Install LibraryBox on TP Link MR 3020

Follow these instructions: <http://librarybox.us/building.php>

## Configure Library Box

See [Coniguration Instructions](docs/configure.md)

## TODO

* [x] Validation for Insert new Document
* [ ] Delete Documents 
* [ ] Clean up materialize.css code in uploadTemplate.html
* [ ] create / delete topics
* [x] Modal Dialogs for Error Handling
* [ ] Api: Clean up files which are not in database
* [ ] Pagination for documents
* [ ] Put rest server in $mode=production

## MEETING TODO LIST

* Document List
    * [ ] truncate description
    * [ ] make author more prominent
    * [ ] keywords zufällig verschieben, evt in weiss darstellen
    * [ ] Farben in topic drop down menu
    * [ ] Kein Topic-Farbe auf primär farbe ändern
* Upload
    * [ ] Upload size erhöhen wenn möglich 
    * [ ] Title Feld automatisch angewählt
    * [ ] Autor und Keyword format erklären
    * [ ] Autor format: Lastname, Firstname; Lastname2, Firstname2; ...
    * [ ] Keywords auf 5 beschränken
    * [ ] Progressbar für file upload
* Index
    * [ ] Kategorien einklappbar
    * [ ] Color Coding für Topics und Title, evt durch farbige bullets
    * [ ] Autor Index: nur erstautor anzeigen
* Admin
    * [ ] Topic Farbe aus 16 Grundfarben auswählbar
    * [ ] Header Farbe und Logo auswählbar
    * [ ] Primär Hintergrund Farbe auswählbar 

## QUESTIONS

* Who can edit/delete documents
* do we want an Image upload?
* do you need to define topic colors manualy or can they be automaticaly generated?
* Customize look: only logo, about and footer text?
* how big will the book collection be / how much does it has to handle?
* maximum filesize for documents?
* which file types need to be supported?
* Problem: hardware very slow. large uploads take forever and disable the whole box
* right now its only possible to upload files up to 15 mb