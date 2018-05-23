---
layout:      left-sidebar
title:       Globus Connect Server 5 Site Prep and Installation
title_line:  false
description: Instructions on how to prepare your environment for Globus Connect Server 5.
---

# Site Prep and Installation

This page explains how to prepare your environment for Globus Connect Server 5.
Most of this work can be done within an hour, but in some cases (when you need
to reach out to other groups), it may take a few business days for all the
setup to be done.

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Medium Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

"Site Prep and Installation" includes three steps:

* Configuring the firewall.

* Getting a Globus Connect Server v5 UUID.

* Installing Globus Connect Server.

&nbsp;

## Firewall Configuration

Globus Connect Server requires a public IP address, which means your system is
at least going to be behind a host firewall.  For Globus Connect Server to
work, certain inbound and outbound ports will need to be opened.

If you filter _inbound_ traffic, here is what you will need to open:

{% include info-box.html
   header="Don't forget the network firewall"
   content="Not only do these ports need to be opened on your server, they need
   also to be opened on the network firewall.  If you need help, talk to your
   LNA."
%}

* From _any IP address_ (in the `untrust` zone), to TCP port `443`.

  Starting with version 5, Globus Connect Server sends traffic for three
  different functions over port 443:

  * Globus management traffic.

  * GridFTP control traffic (used to coordinate transfers).

  * HTTPS endpoint access.

* From _any IP address, in any zone_, to all TCP and UDP ports from `50000` up
  to and including `51000`.

  These ports are used for data-transfer traffic.  The large range is to
  facilitate a large number of connections.  Almost all transfers are using
  TCP, but some legacy transfers may use UDP, so it is helpful to keep that
  open.

  **Please do not change this port range!**  Although Globus does support using
  a different port range, that can cause problems when exchanging data with a
  site that also uses a firewall: Their firewall may only be expecting
  connections to come from—or go to—this port range, and may block
  everything else.

  The "any" zone is used here; in case you have multiple firewall zones in the
  same vsys, if there are Globus endpoints in those other zones, they will need
  to be able to connect to you.

If you also filter _outbound_ traffic, you need to open the following ports:

* To _any IP address, in any zone_, on all TCP and UDP ports from `50000` up to
  and incuding `51000`.

  Again, it is important that the _entire range_ be opened up.

* To `52.84.0.0/15` (in the `untrust` zone), on port 443.

  This is the AWS CloudFront IP range which hosts
  [downloads.globus.org](https://downloads.globus.org).  It needs to be open
  long enough for software packages to be downloaded.

* To `54.237.254.192/29` (in the `untrust` zone), on port 443.

  This is where Globus' API servers live in AWS.  Globus Connect Server
  communicates back to Globus during endpoint setup and maintenance.

If you use filter outbound traffic and wish to use the Google Drive connector,
then you will also need to allow all outbound traffic on port 443.  The reason
is, Google does not have a fixed set of IP ranges for Google Drive, so limiting
is not possible.

Once firewall rules have been submitted, you should proceed to get your Globus
Connect Server v5 UUID.

&nbsp;

## Globus Connect Server v5 UUID

Each Globus Connect Server 5 installation has a unique ID assigned for it.

To , begin by going to [https://developers.globus.org](https://developers.globus.org).  Click on "Register a new Globus Connect Server v5".

PIC

When you click on the "Register…" link, you will be prompted to "Log in to
Globus Auth".  Choose "Stanford University" from the list of institutions,
click "Continue", and log in.

PIC

Globus Connect Server 5 uses OAuth to authenticate back to Globus, so setting
up a new Globus Connect Server 5 installation is similar to setting up a new
OAuth client.  Begin by clicking on "Add another project".

PIC

For the "Project Name", .  For the "Contact Email", use a group email address
(such as a mailing list).  Once the project is created, you will see a note
saying that the project is empty.


Before you continue, you should proceed to add other team members as admins.
You can do this by clicking on the project's "Add…" button, and choosing
"Add/remove Admins".  Globus uses "SUNETID@stanford.edu" as the username
format.  If you try adding someone, and Globus is unable to find them, then
they may not have used Globus before.  Ask the user to log in to Globus, and
then try again to add them as an admin.

Now you can create a set of credentials for the 

Go back to the project, click on the project's "Add…" button, and
choose "Add new Globus Connect Server".

TBD

## Software Installation

To install the Globus Connect Server software, you will be installing the
`globus-connect-server` package for your Linux distribution.  Follow the
instructions from [Globus Connect Server installation guide Section
3.1](https://docs.globus.org/globus-connect-server-installation-guide/#install_globus_connect_server).

{% include info-box.html
   icon="arrow-alt-circle-up"
   header="Use the Repo"
   content="Be sure to get packages directly from the Globus repository, instead of trying to download and install them manually.  Doing so ensures that Globus will be updated whenever you do regular server patching."
%}

{% include info-box.html
   icon="list-ul"
   header="Expect Many Packages"
   content="The `globus-connect-server` package has a large number of dependencies, because Globus Connect Server consists of multiple products (GridFTP, MyProxy, etc.).  It may be possible to only install a subset of packages, but this has not been documented.  Assistance is welcomed in this area!"
%}

{% include info-box.html
   header="Red Hat, Fedora, CentOS, and Scientific Linux users"
   content="On these distributions, Globus Connect Server requires the `udt` package from EPEL.  If you are not comfortable enabling the entire EPEL repository on your system, you should use the appropraite EPEL repository from [http://yum.stanford.edu/mrepo](yum.stanford.edu).  The EPEL repository there is a curated subset of the entire EPEL repository, and includes the `udt` package."
%}

Once packages are installed, you are ready for [initial configuration]({{
"server/configure.html" | relative_url }})!

{% include left-sidebar/transition.md %}

{% include toc.html id="server5" %}
