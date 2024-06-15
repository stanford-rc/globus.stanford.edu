---
layout:      page
toc:          true
title:       Globus Connect Server 4 to 5 Transition
see-also: true
id: server5
description: Transitioning from Globus Connect Server 4 to Globus Connect Server 5
---

## Conceptual Changes

With Globus Connect Server 4, the term _Endpoint_ meant one of three things:

* A _Globus Connect Personal Endpoint_, which runs on a single-user machine (a
  desktop or laptop, for example).

* A _Globus Connect Server Endpoint_, which run on a multi-user system, and
  which allows users to authenticate and access files as themselves.

* A _Shared Endpoint_, which runs on top of one of the other two endpoints, and
  which allows non-local users access to files belonging to a local user.

Starting with version 5, some new terms are introduced:

* A _Collection_ is—appropriately—a collection of files and directories, all of
  which live under a common path.  Each collection can have its own set of
  authorized users.  Collections may be accessed using GridFTP, or (new in
  version 5) over HTTPS.

* A _Storage Gateway_ is an abstract term used to represent the type of
  filesystem where the collections live.  For example, if a collection exists
  as a directory on a local (ext4, xfs, …) or network-attached (NFS, GPFS, …)
  file system, then that collection will be accessed through a "POSIX Gateway".
  If the collection exists on Google Drive, then the collection will be
  accessed through a Google Drive storage gateway.

  Storage gateways are implemented using _Connectors_.  The Google Drive
  connector was introduced in Globus Connect Server version 5.0, and the POSIX
  connector in version 5.1.

* _Endpoint_ now refers to a grouping of one or more storage gateways under a
  single name.

* _Data Transfer Node_ refers to a physical machine, which is running one
  instance of the Globus Connect Server software, and one instance of the
  appropriate connector software for each storage gateway used on the endpoint.

The following diagram from Globus puts all of those terms together:

PIC

For existing Globus Connect Server 4 environments, upgrading to version 5 means
making a new endpoint, which will have one storage gateway (a POSIX gateway).
Then, you will create a new collection for each directory tree that local users
are able to access.  Your users will then create additional collections, as
they make shared endpoints.

TBD

**The MyProxy and MyProxy OAuth authentication methods are not supported!**

To be clear: If you are _not_ using the CILogon authentication method, then
_you can not upgrade to Globus Connect Server 5_.  Upgrading to 5 is only
possible if you are willing to switch to the CILogon authentication method at
the same time.

The procedural part of this document is divided into three sections:

1. Preparatory work that can be done before a downtime.

2. Disruptive work, which must be done during a downtime.

3. Cleanup work, which must be done after the downtime.

The preparatory work involves firewall changes, so if your server is behind a
network firewall, you should perform the pre-downtime changes several days
before your scheduled downtime.

## Pre-Downtime Changes

The first thing you need to do, before making any changes, is to locate all of
the documents where your existing endpoint is mentioned.  Your endpoint's
identity is going to change, so you should know where it is referenced.  You
should not (nor can you) make any documentation changes now, but you should
know where all of the documents are located.

You should also let your entire userbase know that the Globus endpoints will be
unavailable.  During the downtime, all in-progress transfers will be cancelled,
so users should hold on on transferring data, until the downtime is complete.

You should also notify everyone who has shared endpoints, because all shared
endpoints will need to be re-created after the downtime.
[SRCC](mailto:srcc-support@stanford.edu) can help identify the shared endpoint
owners.

Globus Connect Server 5 makes some changes to the ports that it uses, so you
may need to add an inbound rule:

* From _any IP address_ (in the `untrust` zone), to TCP port `443`.

  If you are running a MyProxy OAuth server, then you may have already had this
  port open.

  The port is now used for three things:

  * Globus management traffic.

  * GridFTP control traffic (used to coordinate transfers).

  * HTTPS endpoint access.

If you firewall outbound traffic, _and_ you plan on using the Google Drive
connector, then you will need to allow _all_ outbound traffic to TCP port
`443`.  This is because Google does not have a published list of IP ranges for
Google Drive.

## Disruptive Changes

Delete and reinstall!

Stop MyProxy and GridFTP.  Also, if you used the MyProxy OAuth authentication
method, also stop Apache.

service globus-gridftp-server stop
service myproxy-server stop
service httpd stop

Uninstall all Globus packages:

apt-get purge globus-connect-server
apt-get autoremove

yum remove globus-connect-server
yum autoremove

NOTE: Pay careful attention to the packages that your package manager wants to auto-remove.  For
example, if Apache was installed as part of the original Globus Connect Server
installation, and you have started using Apache for other things, then you will
want to keep the `apache2` (on Debian/Ubuntu) or `httpd` (on CentOS) package.

On RHEL/CentOS: Install the `yum-utils` package.  For each top-level package
that you know you want to keep, run `yumdb set reason user PACKAGE_NAME`.
Then, try `yum autoremove` again.

On Debian/Ubuntu: Run `apt-mark manual PACKAGE_NAME`.  Then, try `apt-get
autoremove` again.

Make sure old Globus configuration has been removed:

rm /etc/globus-connect-server.conf
rm -r /etc/grid-security /var/lib/globus /var/lib/globus-connect-server

If you previously used the MyProxy OAuth authentication method, you shoudl also
delete the custom logo and CSS files:

rm /etc/globus-myproxy-oauth-logo.png /etc/globus-myproxy-oauth-stylesheet.css

TBD

## Post-Downtime Changes

Once Globus Connect Server 5 is up and running, there is some final cleanup
work for you to do.  First, there is a firewall rule to remove.

You should have a firewall rule in place which allows traffic from
`54.237.254.192/29` to connect to your server on TCP ports `2811` and `7512`.
This firewall rule should be removed.  GridFTP control traffic—which used to
use port 2811—now lives on port 443.  Also, MyProxy—which used to use port
7512—is no longer used.

Finally, if this was the last endpoint associated with your Globus ID, you
should email [srcc-support@stanford.edu](mailto:srcc-support@stanford.edu), to
report that you are no longer using your Globus ID.  SRCC will assist you in
deleting your Globus ID from Globus.




