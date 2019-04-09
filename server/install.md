---
layout:      left-sidebar
title:       Globus Connect Server Site Prep and Installation
title_line:  false
description: Instructions on how to prepare your environment for Globus Connect Server.
---

# Site Prep and Installation

This page explains how to prepare your environment for Globus Connect Server.
Most of this work can be done within an hour, but in some cases (when you need
to reach out to other groups), it may take a few business days for all the
setup to be done.

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Moderate Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

"Site Prep and Installation" includes three steps:

* Configuring the firewall.

* Getting (and activating) a Globus ID.

* Installing Globus Connect Server.

&nbsp;

## Firewall Configuration

Globus Connect Server requires a public IPv4 address, which means your system is
at least going to be behind a host firewall.  For Globus Connect Server to
work, certain inbound and outbound ports will need to be opened.

If you filter _inbound_ traffic, here is what you will need to open (the zone
names are for systems behind a network firewall):

{% include info-box.html
   header="IPv6 Support"
   icon="globe"
   content="At this time, Globus does not use IPv6.  All IP addresses should be entered using IPv4."
%}

{% include info-box.html
   header="Do you use firewalld or ufw?"
   content="If you use firewalld or ufw, go to our <a href=\"firewalld.html\">firewalld page</a> or our <a href=\"ufw.html\">ufw page</a> for an easier way to configure your host firewall."
%}

{% include info-box.html
   header="Don't forget the network firewall"
   icon="exclamation-circle"
   content="Not only do these ports need to be opened on your server, they need
   also to be opened on the network firewall.  If you need help, talk to your
   LNA."
%}

* From `54.237.254.192/29` (in the `untrust` zone), to TCP ports `2811` and
  `7512`.

  Port 2811 is used for Globus to issue transfer-related control commands to
  your endpoint.  For example, directory listing, and initiating transfer to
  another endpoint.

  Port 7512 is used for the MyProxy authentication service.  Globus sends
  credentials to MyProxy over this connection, receiving certificates in
  return.

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

  _If you are in the School of Medicine_, or your network firewall is
  controlled by MedIRT, when you submit your firewall request, tell them to use
  the "ssl application", not the "gridftp application".  If MedIRT have any
  questions, ask them to refer to "SNOW incident INC00282086".

If you use MyProxy OAuth, one more inbound port will be needed:

* From _any IP address_ (in the `untrust` zone), to TCP port `443`.

  If you are using the MyProxy OAuth 2.0 server to process user credentials,
  then this port will need to be open to all of the people who would
  need to authenticate.
  
  If only Stanford people will be authenticating, then you _might_ be able to
  get away with limiting this to only campus and VPN IPs (that is, to the "SU
  All Nets" listed in [Stanford Network
  Numbers](https://uit.stanford.edu/guide/lna/network-numbers)).

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

Once firewall rules have been submitted, you should proceed to get your Globus
ID activated.

&nbsp;

## Globus ID Activation

People may not own Globus Connect Server endpoints directly.  Globus Connect
Server endpoints are owned by entities, with people acting as the
administrators and users.  The Globus ID exists as a way for entities to have a
Globus identity, and directly own Globus Connect Server endpoints.

{% include info-box.html
   header="Last-Resort Globus ID for Humans"
   content="A Globus ID may also be created by a human for themselves—instead of for an entity—if the human does not have any recognized instutitional login (and also does not have a Google account)."
%}

To continue, you will need to register a new Globus ID, and get it linked to
Stanford's subscription.

**Choose wisely!** Your Globus ID will form part of the public identifier for
your Globus Connect Server endpoint.  For example, if your extremely-important
cancer research data are being hosted on a Globus Connect Server endpoint named
`cancer_study`, but your Globus ID is `annoying`, people will forever refer to
your endpoint as the `annoying#cancer_study` endpoint.

{% capture globus-box-content %}
<p>Several well-known Globus IDs already exist at Stanford, and you may be able
to register your Globus Connect Server under one of them.</p>
<ul>
  <li>"stanford", maintained by the <a href="https://srcc.stanford.edu/">Stanford Research Computing Center</a>.</li>
  <li>"sulibraries", maintained by <a href="https://library.stanford.edu/department/digital-library-systems-and-services-dlss">Digital Library Systems and Services</a>.</li>
</ul>
<p>To use one of these well-known Globus IDs, skip this section and continue
installation, while also reaching out to the approrpiate group.</p>
{% endcapture %}
{% include info-box.html
   icon="university"
   raw=globus-box-content
%}

If you have decided to create a Globus ID, go to
[globusid.org](https://www.globusid.org) and select _create a Globus ID_.  A
form will be displayed for you to complete.

{% include hero-image.html
   src="assets/server/GlobusID Create.png"
   alt="The 'Create a Globus ID' page, with fields filled in."
   caption-overlay=true
   caption-header="Globus ID Creation"
   caption-text=""
%}

Here are some thing to keep in mind as you fill in the form:

* Use your department's name as your _Full Name_, and use "Stanford University"
  as your _Organization_.

* Use a mailing list as your email address.  **This is important**; password
  resets and other important Globus communications will be sent here.

 * Remember to **practice password complexity**!  Your Globus ID only uses a
   static password, so be sure to consult the [Password Requirements Quick
   Guide](https://uit.stanford.edu/service/accounts/passwords/quickguide) to
   find out how long your password should be.

After creating a Globus ID, email <srcc-support@stanford.edu>, asking for your
Globus ID to be assicated with Stanford's Globus subscription.  In your email,
provide the following information:

* Your Globus ID.

* Information about your group, your relationship to Stanford, and how you plan
  to use Globus.

* Contact information for the people who will be maintaining the Globus Connect
  server(s).

* Confirmation that you will only use Globus for Low or Moderate Risk data.

Once submitted, you should hear back within two business days.  In the mean
time, you should continue setup!

&nbsp;

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
   content="The <code>globus-connect-server</code> package has a large number of dependencies, because Globus Connect Server consists of multiple products (GridFTP, MyProxy, etc.).  It may be possible to only install a subset of packages, but this has not been documented.  Assistance is welcomed in this area!"
%}

{% include info-box.html
   header="Red Hat, Fedora, CentOS, and Scientific Linux users"
   content="On these distributions, Globus Connect Server requires the <code>udt</code> package from EPEL.  If you are not comfortable enabling the entire EPEL repository on your system, you should use the appropraite EPEL repository from <a href=\"http://yum.stanford.edu/mrepo\">yum.stanford.edu</a>; Stanford's EPEL mirror is a curated subset of the entire EPEL repository, and includes the <code>udt</code> package."
%}

Once packages are installed, you are ready for [initial configuration]({{
"server/configure.html" | relative_url }})!

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
