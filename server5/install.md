---
layout:      page
toc:  true
title:       Globus Connect Server 5 Site Prep and Installation
see-also: true
id: server5
description: Instructions on how to prepare your environment for Globus Connect Server 5.
---


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

"Site Prep and Installation" includes two steps:

* Configuring the firewall.

* Installing Globus Connect Server.

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
  communicates back to Globus during endpoint setup and operations.

If you use filter outbound traffic and wish to use the Google Drive connector,
then you will also need to allow all outbound traffic on port 443.  The reason
is, Google does not have a fixed set of IP ranges for Google Drive, so limiting
is not possible.

Once firewall rules have been submitted, you should proceed to install Globus
Connect Server software.

## Software Installation

To install Globus Connect Server v5 software, you should follow one of two
installation guides.  The installation guide you choose depends on if you can
follow the "simple" process or the "complex" process.

To follow the "simple" process, all of the following must be true:

1. Your users are using SUNetIDs.  If you users are using other usernames, you
   will need to use the "complex" process, following the steps to configure
   Identity Mapping.

2. Your storage is all 'POSIX storage'.  That is, the storage is either
   directly-attached to your DTN, is clustered storage (like Lustre), or is
   network-mounted storage (via NFS).

If you will be following the "simple" process, visit [Section
1](https://docs.globus.org/globus-connect-server/v5.4/quickstart/#gcsv5-install)
of the [Globus Connect Server v5 Quickstart
Guide](https://docs.globus.org/globus-connect-server/v5.4/quickstart/).  You
will follow all of the steps of the Quickstart Guide, *except* you will be
skipping the "Create OIDC Server" step.

If you will be following the "complex" process, visit [Section
4](https://docs.globus.org/globus-connect-server/v5.4/#install_section) of the
[Globus Connect Server v5 Installation
Guide](https://docs.globus.org/globus-connect-server/v5.4/).  You will need to
follow Sections 4 and 5 of the Installation Guide.

**NOTE:** During both processes, you will reach a point where you will need to
"Set the endpoint as managed".  This involves attaching your endpoint to
Stanford's Globus subscription.  You will need assistance in this step; send
your endpoint's UUID to
[srcc-support@stanford.edu](mailto:srcc-support@stanford.edu), so we can add
the endpoint to the University's subscription.

{% include info-box.html
   icon="arrow-alt-circle-up"
   header="Use the Repo"
   content="Be sure to get packages directly from the Globus repository, instead of trying to download and install them manually.  Doing so ensures that Globus will be updated whenever you do regular server patching."
%}

{% include info-box.html
   icon="list-ul"
   header="Expect Many Packages"
   content="Globus Connect Server v5 is distributed by a large number of packages, each of which implements a different part of GCSv5."
%}

{% include info-box.html
   header="Red Hat & Enterprise Linux users"
   content="On these distributions, Globus Connect Server requires the `udt` package from EPEL.  If you are not comfortable enabling the entire EPEL repository on your system, you should use the appropraite EPEL repository from yum.stanford.edu.  The EPEL repository mirror on yum.stanford.edu is a curated subset of the entire EPEL repository, and includes the `udt` package."
%}
