---
layout:      left-sidebar
title:       Globus Connect Server Site Prep and Installation
title_line:  false
description: Instructions on how to prepare your environment for Globus Connect Server.
---

# Pre-Installation Planning

Before installing Globus Connect Server, you need to make a few decisions about
how users will access your server, and what they should be allowed to access.

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Moderate Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

Before continuing on with this page, we suggest that you allocate some space in
your favorite note-taking medium.  You will need to answer the following
questions:


* **Which Globus ID do I use?**

* **What auth method will users use?**

* **What is my IP address and firewall configuration?**

* **What should users be allowed to access?**

* **Will sharing be allowed?**

This page will help you to answer each of those questions.

{% include info-box.html
   header="IPv6 Support"
   icon="globe"
   content="At this time, Globus does not use IPv6.  All IP addresses should be entered using IPv4."
%}

## Choosing a Globus ID

People may not own Globus Connect Server endpoints directly.  Globus Connect
Server endpoints are owned by entities, with people acting as the
administrators and users.  The [Globus ID]({{ "accounts/globusid.html" |
relative_url }}) exists as a way for Globus Connect Server endpoints to have a
Globus identity.

Several well-known Globus IDs already exist at Stanford, and you may be able
to register your Globus Connect Server under one of them:

* `stanford`, maintained by the [Stanford Research Computing Center](https://srcc.stanford.edu/).

* `sulibraries`, maintained by [Digital Library Systems and Services](https://library.stanford.edu/department/digital-library-systems-and-services-dlss).

To use one of these well-known Globus IDs, reach out to the group using the
links above.  They will work with you during Globus Connect Server setup, in
the same way that an Active Directory admin would work with you to join a
Windows machine to an AD Domain.

If you have decided to create your own Globus ID, refer to the
[Globus ID]({{
"accounts/globusid.html" | relative_url }}) page for instructions.  After
creating a Globus ID, email <srcc-support@stanford.edu>, asking for your Globus
ID to be assicated with Stanford's Globus subscription.  In your email, provide
the following information:

* Your Globus ID.

* Information about your group, your relationship to Stanford, and how you plan
  to use Globus.

* Contact information for the people who will be maintaining the Globus Connect
  server(s).

* Confirmation that you will only use Globus for Low or Moderate Risk data.

Once submitted, you should hear back within two business days.

{% include info-box.html
   header="Choose wisely!"
   icon="exclamation-triangle"
   content="Your Globus ID will form part of the public identifier for
your Globus Connect Server endpoint.  For example, if your extremely-important
cancer research data are being hosted on a Globus Connect Server endpoint named
`cancer_study`, but your Globus ID is `annoying`, people will forever refer to
your endpoint as the `annoying#cancer_study` endpoint."
%}

*Congratulations!*  You now have your Globus ID selected!  This is the first
prerequisite.

&nbsp;

## Firewall Configuration

{% include info-box.html
   header="Do you use firewalld or ufw?"
   content="If you use firewalld or ufw, go to our <a href=\"firewalld.html\">firewalld page</a> or our <a href=\"ufw.html\">ufw page</a> for an easier way to configure your host firewall."
%}

Globus Connect Server requires a public IPv4 address, which means your system is
at least going to be behind a host firewall.  For Globus Connect Server to
work, certain inbound and outbound ports will need to be opened.

If you filter _inbound_ traffic, here is what you will need to open (the zone
names are for systems behind a network firewall):

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


Once packages are installed, you are ready for [initial configuration]({{
"server/configure.html" | relative_url }})!

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
