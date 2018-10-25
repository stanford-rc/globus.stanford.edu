---
layout:      left-sidebar
title:       MyProxy OAuth Authentication
title_line:  false
description: How to configure MyProxy OAuth authentication.
---

# MyProxy OAuth Authentication

The legacy MyProxy authentication method exchanges end-user credentials for
special, time-limited credentials that Globus uses to perform transfer-related
activities on the user's behalf.

The MyProxy OAuth authentication method is used in environments that do not
meet the requirements for CILogon authentication.  That typically means…

* Not all users have SUNetIDs; or

* Users on the system do not use SUNetIDs as their local username.

If either of the above is true, then CILogon will not work, and MyProxy OAuth
should be used.

{% include info-box.html
   icon="lock"
   header="Moderate Risk?  Use CILogon"
   content="If you have Moderate Risk data, then two-step is required.  That means you must use the CILogon authentication method (it is the only one which supports two-step at this time)."
%}

Here is how MyProxy OAuth authentication works:

1. The end user chooses to use your Globus Connect Server endpoint.

2. Globus redirects the user to an OAuth service running on your endpoint,
   where they enter their local username and password.

3. Globus establishes a secure connection with the MyProxy service running on
   your endpoint, and sends you the username and password provided.

4. The OAuth service relays the credentials to MyProxy, which validates them.
   If valid, a short-lived client certificate & private key are generated, and
   sent back to Globus.

Although this authentication method does send credentials over the Internet,
the credentials are not being shared with any third party (including Globus).

When Globus communicates with your endpoint, it uses the client cert issued by
MyProxy, which contains the end user's local username.  That is how your
endpoint knows who is using Globus.

## Apache Configuration

MyProxy OAuth is a Python WSGI application, which uses Apache as the gateway
between the user and the application.  Although Apache has already been
installed (as part of installing the MyProxy OAuth packages); you still need to
configure Apache's SSL settings, and obtain a certificate.

Basic configuration guides are available, [for
RHEL/CentOS](https://wiki.centos.org/HowTos/Https) and [for
Debian/Ubuntu](https://www.linode.com/docs/security/ssl/ssl-apache2-debian-ubuntu/).

For the server certificate, you can get one from [University
IT](https://uit.stanford.edu/service/ssl), or you can get one from [Let's
Encrypt](https://letsencrypt.org).  Both are free, and both have tradeoffs: A
certificate from University IT lasts for up to two years, but can take a
business day to be issued, and you have to remember to renew it.  A certificate
from Let's Encrypt will last indefinitely as long as you have auto-renewal in
place, but there are limits on how many new certs are issued per day, so you
might have to wait.

Either way, until you have a certificate, MyProxy OAuth authentication may not
work.

Besides getting a certificate, you will also need to configure your server's
SSL settings.  The best tool to use is the [Mozilla SSL Configuration
Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/).
You will need to provide your version of the "server" (that is, Apache) and of
OpenSSL; you can get these from the list below:

* **RHEL/CentOS 6**: Server 2.2.15 and OpenSSL 1.0.1e
* **RHEL/CentOS 7**: Server 2.4.6 and OpenSSL 1.0.1e
* **Debian 8**: Server 2.4.10 and OpenSSL 1.0.1t
* **Debian 9**: Server 2.4.25 and OpenSSL 1.1.0f
* **Ubuntu 16.04**: Server 2.4.18 and OpenSSL 1.0.2g
* **Ubuntu 18.04**: Server 2.4.29 and OpenSSL 1.1.0g

Once your set your server and OpenSSL versions, if the _Modern_ option is
available, then select it.  Otherwise, select _Intermediate_.  Also, make sure
_HSTS Enabled_ is selected.  At this point, the appropriate configuraion will be
displayed, which you can copy to the appropriate Apache configuration file.  The
guides linked at the start of this section will help you locate the right
configuration file.

{% include info-box.html
   icon="lock"
   header="Is TLS 1.0 disabled?"
   content="Before you move on, check the `SSLProtocol` line in your new SSL configuration, and make sure '-TLSv1' appears on that line.  If it is missing, add it to the end of the line."
%}

Now that the web server has been configured, you can move on to configuring
Globus!

## Download Files

The MyProxy OAuth service allows a little customization, in the form of custom
CSS and a logo.  Before you continue configuration, you should download those
files:

* Download [this CSS file]({{ "server/oauth.css" | relative_url }}) to
  `/etc/globus-myproxy-oauth-stylesheet.css` on the server.

* Download [the all-red Block S with
  Tree](https://identity.stanford.edu/downloads/SU_New_BlockStree_Red.png) logo
  to `/etc/globus-myproxy-oauth-logo.png` on the server.

The logo lives on the Stanford Identity site, which requires that you log in to
download logos.  So, you will have to download it manually, and copy it to the
server.  The CSS file may be download directly using `wget`, `curl`, etc..


## Globus Configuration

To use MyProxy OAuth authentication, you will be making additions to the
`globus-connect-server.conf` file that you first filled in during [initial
configuration]({{ "server/configure.html" | relative_url }}).

{% include info-box.html
   icon="hand-paper"
   header="Perform initial configuration first"
   content="If you have not already completed the initial configuration, do that first, and then come back here."
%}

Here is the content which needs to be added to the `globus-connect-server.conf`
file:

{% gist 355a2b6d2b74fbc7934147e7c15e87fa %}

Each of the sections will now be discussed in detail.  If you do not need this
explanation, you can [skip ahead](#setup).

### Security

The `Security` section is very simple:

```
[Security]
FetchCredentialFromRelay = True
IdentityMethod = OAuth
```

_IdentityMethod_ tells `globus-connect-server-setup` to configure MyProxy
OAuth.  The explanation for _FetchCredentialFromRelay_ is a little more
complicated.

TLS is used to secure the communications between Globus and your endpoint.
With TLS, the server side must have a private key and certificate (if you run a
web site, you are probably aware of this already).  Since Globus is initiating
connections to your endpoint, your endpoint needs a private key and
certificate.  The _FetchCredentialsFromRelay_ setting tells
`globus-connect-server-setup` to fetch a key and certificate from Globus, which
will be used for all future connections from Globus.

### MyProxy

The `MyProxy` section is also simple, with two options that can be changed
(although that is not normally required):

```
[MyProxy]
Server = %(HOSTNAME)s
;;ServerBehindNAT = True
```

_Server_ and _ServerBehindNAT_ influence how `globus-connect-server-setup`
configures your endpoint.

Normally, your system's hostname should match what is in Public DNS.  But, in
some cases (such as when you are behind a NAT), that is not the case.  When
your hostname does not match what is in Public DNS, you need to set _Server_ to
your name in public DNS, and set _ServerBehindNAT_ to `True`.  That will force
`globus-connect-server-setup` to configure MyProxy with the settings you
specify.

### OAuth

The `OAuth` section has configuration specific to the OAuth server.  Some of it
is a duplicate of the MyProxy section, and some of it is unique.

```
[OAuth]
Server = %(HOSTNAME)s
;;ServerBehindNAT = True
Stylesheet = /etc/globus-myproxy-oauth-stylesheet.css
Logo = /etc/globus-myproxy-oauth-logo.png
```

The _Server_ and _ServerBehindNAT_ entries should be set to exactly the same
values as what appears in the MyProxy section (you should just copy/paste them
from one section to the other).

The logo is the "Block S (1 Color, Red, Dark Background)" logo, meant to be
placed on a Stanford-red background.  The stylesheet is what configures this
background.  It also enables the use of the Source Sans Pro font family, one of
the two preferred font families for header and body text.

Once `globus-connect-server.conf` has been completed, it is now time to run
`globus-connect-server-setup`!

<a name="setup"></a>
## Run Setup

You should now run the `globus-connect-server-setup` command.  When you run
this command, you will be asked for your Globus ID's password.  Once that is
provided, setup will commence.

{% include info-box.html
   icon="lock"
   header="'sslv3 alert handshake failure' is OK"
   content="If you are running globus-connect-server-setup on a system running Python 3.1 or older, you may get the message 'sslv3 alert handshake failure'.  This may be safely ignored.  It is happening because your older Python is missing support for TLS SNI, which is required by downloads.globus.org (the Globus package repository).  This issue has been reported to Globus."
%}

{% include info-box.html
   header="Repeatedly prompted for ID and password?"
   content="If you are being repeatedly prompted for your Globus ID and password, that normally means that one of the two are incorrect.  Remember, when prompted for your Globus ID, only enter the part before the at-sign."
%}

{% include info-box.html
   header="'can't apply partial context' error?"
   content="If you get the message `can't apply partial context to unlabeled file `/var/lib/myproxy-oauth/myproxy-oauth.db'`, and SELinux is disabled, then the warning may be safely ignored."
%}

Here is an example of the output from a successful run of
`globus-connect-server-setup`:

```
Password:
Configured MyProxy server on sci-nfs-1.stanford.edu:7512
CA DN: /O=Globus Connect Server/CN=sci-nfs-1.stanford.edu
Configured OAuth server sci-nfs-1.stanford.edu
Configured GridFTP server to run on sci-nfs-1.stanford.edu
Server DN: /C=US/O=Globus Consortium/OU=Globus Connect Service/CN=8af58dce-3969-11e8-b98d-0ac6873fc732
Using Authentication Method OAuth
Configured Endpoint quake-sci-nfs-1
```

`globus-connect-server-setup` is performing these steps:

1. Checking for newer versions of Globus Connect Server.

2. Enabling the `myproxy-server`, `globus-gridftp-server`, and `httpd` (or
   `apache2`) services, and performing basic configuration for all services.

3. Configuring Python WSGI for Apache.

3. Creating a local certificate authority, which MyProxy will use to issue
   client certs.

4. Requesting a server certificate and private key from Globus, which MyProxy
   and GridFTP will use when accepting connections from Globus.

If configuration was successful, the "Configured endpoint" message will be
printed.  At this point, services have been started and are ready for use!

{% include info-box.html
   icon="arrow-circle-right"
   header="Write down your Server DN"
   content="The Server DN is needed later in the configuration process, so make a note of it, until configuration is complete."
%}

## Apache Configuration

The OAuth service runs as a Python WSGI application, under Apache.  This is
probably the first time Apache will have been used on this server, and so some
configuraion will be required:

### Disable Welcome Page

In a default Apache configuration, when someone browses to your site, they will
be presented with a "Welcome" page.  That page should be disabled.  The exact
way to do this depends on which Linux distribution you are using:

* In Debian 

* In RHEL, CentOS, and Scientific Linux, edit the file at
  `/etc/httpd/conf.d/welcome.conf`: Remove the line `ErrorDocument 403
  /error/noindex.html`.

Restart Apache for the change to take effect.

### Configure SSL

The OAuth service requires SSL, which means you will need to get a valid
certificate.  For the Stanford community, two options are available:

* You can get a certificate from [University
  IT](https://uit.stanford.edu/service/ssl).  This does not involve any
  additional software, and certificates are valid for up to two years, but
  involves some time and effort to configure.

* You can get a certificate from [Let's Encrypt](https://letsencrypt.org/),
  using [Certbot](https://certbot.eff.org/).  This requires minimal effort
  (because Certbot does the work), but it means that you have to install
  additional third-party software, which will need to run on a regular basis
  (Let's Encrypt certificates must be renewed approximately once a quarter).

At the same time, you should configure Apache to use modern TLS standards.
This is most easily done by going to the [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/), choosing the _Modern_ or _Intermediate_ configuration, and entering your system's versions of Apache and OpenSSL.

Apache will need to be restarted whenever SSL configuration is changed.

Now that Globus Connect Server (or, more specifically, MyProxy and GridFTP) is
(are) up and running, you should [finish configuration]({{ "server/finish.html"
| relative_url }}).

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
