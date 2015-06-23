# OfflineLibrary

## Install LibraryBox on TP Link MR 3020

See [Installation Instructions](docs/installation.md)

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

## QUESTIONS

* which file types need to be supported?
* **right now its only possible to upload files up to 15 mb**
