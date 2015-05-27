# CONFIGURE LIBRARY BOX FOR OFFLINE LIBRARY

## Enable internet access for box

(These steps only need to be done for development)

First make backup of network config:

```
cp /etc/config/network /etc/config/network.backup
```

then edit `vi /etc/config/network`

the file should look like this after editing (if the routers ip adress is *192.168.1.1*):

```
config interface 'loopback'
        option ifname 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'

config interface 'lan'
        option ifname 'eth0'
        option type 'bridge'
        option proto 'static'
        option ipaddr '192.168.1.2'
        option netmask '255.255.255.0'
        option gateway '192.168.1.1'
        option ip6addr 'fdc0:ffea::1/64'
        list dns '192.168.1.1'
        list dns '8.8.8.8'

config alias
        option interface 'lan'
        option ip6addr 'fdc0:ffea::5a71:f0bb:772f:1cb2/64'
        option proto 'static'
```


### Disable dns resolution of piratebox

Everytime you want to have internet access, you need to switch the dns resolution off. If you don't do this step, the box will resolve always its own IP address.

```
/etc/init.d/piratebox nodns
```
You may add this line above the **exit** command in **/etc/rc.local**.

***!!! Dont forget to disable/delete before deployment. You also need to replace the network config file with the backup.***

### Change Packaging Manager config

change `vi /etc/okpg.conf` to:

```
src/gz attitude_adjustment http://downloads.openwrt.org/attitude_adjustment/12.0
dest root /
dest ram /tmp
lists_dir ext /var/opkg-lists
option overlay_root /overlay
src/gz piratebox http://stable.openwrt.piratebox.de/all/packages/
dest ext /mnt/ext
```

(6th line is important)

## Enable SFTP server
Some clients, e.g. Cyberduck on the Mac, cannot connect to the SCP server provided by OpenWrt's standard ssh server, dropbear, unless an additional binary is installed in /usr/libexec/sftp-server - this can be done with:

```
opkg update
opkg install openssh-sftp-server
```
Now you can use sftp clients such as Cyberduck to connect to the OpenWrt system. Note that no additional startup scripts are required since all of that is handled by dropbear which is most likely already present on your system.

(see <https://trac.cyberduck.io/ticket/4161>)


## configure lighthttpd

*Already installed!*

see <http://wiki.openwrt.org/doc/howto/http.lighttpd>

the config file can be found under **/opt/piratebox/conf/lighthttpd**.

Change line 13 in **lighthttpd.conf**:

```
server.upload-dirs = ( "/mnt/usb/LibraryBox/tmp" )
```

### change redirection

edit file **/opt/piratebox/www/redirect.html**:

change redirect line to:

```
<meta http-equiv="refresh" content="0;url=/content" />
```

***!!! This also needs to be reverted for deployment.***

### WWW Folder

the root folder is under **/mnt/usb/LibraryBox/**. The index.html needs to be placed here: **/mnt/usb/LibraryBox/Content/index.html**

Two folders have to be created with chmod 777:

```
/mnt/usb/LibraryBox/Shared/docs
/mnt/usb/LibraryBox/Shared/images/logo
```

### Change Php.ini

its located under **/etc/php.ini**, change:

```
post_max_size = 100M
upload_max_filesize = 100M
```


## configure sqlite

*Already installed!*

No need to make any changes