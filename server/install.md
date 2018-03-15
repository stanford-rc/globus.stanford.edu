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
   header="Low-Risk Data Only"
   content="Globus may only be used at Stanford with Low Risk data.  Please
   do not install this software on systems which have access to Medium or High
   Risk data."
%}

"Site Prep and Installation" includes four steps:

* Configuring the firewall.

* Getting (and activating) a Globus ID.

* Installing Globus Connect Server.

* Starting to create the configuration.

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

Once firewall rules have been submitted, you should proceed to get your Globus
ID activated.

&nbsp;

## Globus ID Activation

As described [on the Globus IDs page]({{ "accounts/globus_id.html" |
relative_url }}), a Globus ID is normally only needed for entities.  Although
Globus Connect Server endpoints are administered by people, they are "owned" by
an entity, and so they must be associated with (and initially registered by) a
Globus ID.

**Choose wisely!** Your Globus ID will form part of the public identifier for
your Globus Connect Server endpoint.  For example, if your extremely-important
cancer research data are being hosted on a Globus Connect Server endpoint named
`cancer_study`, but your Globus ID is `blargh`, people will forever refer to
your endpoint as the `blargh#cancer_study` endpoint.

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

After creating a Globus ID, email <srcc-support@stanford.edu>, asking for your
Globus ID to be assicated with Stanford's Globus subscription.  In your email,
provide the following information:

* Your Globus ID.

* Information about your group, your relationship to Stanford, and how you plan
  to use Globus.

* Contact information for the people who will be maintaining the Globus Connect
  server(s).

* Confirmation that you will only use Globus for Low Risk data.

Once submitted, you should hear back within two business days.  In the mean
time, you should continue setup!

&nbsp;

## Software Installation

To install the Globus Connect Server software, you will be installing the
`globus-connect-server` package for your Linux distribution.  Follow the
instructions from [Globus Connect Server installation guide Section
3.1](https://docs.globus.org/globus-connect-server-installation-guide/#install_globus_connect_server).  Once you are done, come back here.

_A note for Red Hat, Fedora, CentOS, and Scientific Linux users_: On these
distributions, Globus Connect Server requires the `udt` package from EPEL.  If
you are not comfortable enabling the entire EPEL repository on your system, you
should use the appropraite EPEL repository from
[http://yum.stanford.edu/mrepo](yum.stanford.edu).  The EPEL repository there
is a curated subset of the entire EPEL repository, and includes the `udt`
package.

&nbsp;

## Partial Configuration

TBD

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
