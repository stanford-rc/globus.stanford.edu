---
layout:      page
toc:  true
title:       Globus Connect Server version 4 firewalld Configuration

description: Instructions on how to configure firewalld to work with Globus Connect Server version 4.
---

If you are running a Linux distribution that includes firewalld, you can use
firewalld services and ipsets files to simplify firewall configuration on your
Globus Connect Server endpoint.

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

To begin, three files will need to be installed.

## Files

The first file to ceate tells firewalld about Globus' IP range.  This file
should be created at path `/etc/firewalld/ipsets/globus.xml`, with the
following contents:

```
<?xml version="1.0" encoding="utf-8"?>
<ipset type="hash:net">
  <short>Globus</short>
  <description>Globus IPs</description>
  <option name="family" value="inet"/>
  <entry>54.237.254.192/29</entry>
</ipset>
```

The next file defines a new _service_, which (instead of being a single port)
is a range of ports.  Create this file at path
`/etc/firewalld/services/gridftp-data.xml`, with the following content:

```
<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>GridFTP Data</short>
  <description>GridFTP endpoint-to-endpoint data transfer</description>
  <port protocol="tcp" port="50000-51000"/>
</service>
```

(Yes, with firewalld you can define a single service that takes a range of
ports.)

Now, create a file at path `/etc/firewalld/services/myproxy.xml`, with the
following content:

```
<?xml version="1.0" encoding="utf-8"?>
<service>
  <description>MyProxy Authentication</description>
  <port protocol="tcp" port="7512"/>
</service>
```

{% include info-box.html
   header="What about GridFTP's control port?"
   icon="question-circle"
   content="The port used for GridFTP control traffic (port 2811) is already defined in the
<a href=\"http://www.iana.org/assignments/port-numbers\">IANA list of service names and port numbers</a> under the name \"gsiftp\".  Since the port number is already defined system-wide, a custom service file is not needed."
%}

After creating the files, run `firewall-cmd --reload` to tell firewalld to read
the newly-created files.

Now you can move on to configuring the rules themselves!

## Firewall Rules

There are three rules needed, each of which its own `firewall-cmd` command:

1. Allow anyone to connect to open GridFTP data ports:

   `firewall-cmd --permanent --add-service=gridftp-data`

   The above rule enables the service you created, for inbound traffic, in the
   default firewall zone (unless you are a firewalld power user, it will
   only have one zone in use).

2. Allow Globus IPs to connect to the MyProxy port.

   `firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source ipset="globus" service name="myproxy" accept'`

   This command is much more complicated, because we want to restrict access to
   only a specific set of IPs.  There is no simple `firewall-cmd` command
   available for this, so we have to fall back on the 'rich rule' functionality.

3. Allow access for GridFTP control traffic, from Globus only:

   `firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source ipset="globus" port port="gsiftp" protocol="tcp" accept'`

   This rich rule is similar to the previous one, except we use the keyword
   _port_ instead of _service_.  We do that because `gsiftp` is a port listed in
   the system-wide service/port database (which normally lives at
   `/etc/services`).  If we used the word `service` in the rich rule, firewalld
   would look for a (nonexistant) service description file.

{% include info-box.html
   icon="question-circle"
   header="What about a port for OAuth?"
   content="If you are using OAuth authentication, then you will need a web server (on port 443) open to the world.  But since that web server is being provided by the Linux distribution's Apache package, it should take responsibility for configuring your firewall."
%}

After entering the three commands above, run `firewalld-cmd --reload` to
activate them.

Your inbound host firewall configuration is now complete!  You should now go
back to continue the installation procedure.




