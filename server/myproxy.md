---
layout:      left-sidebar
title:       Legacy MyProxy Authentication
title_line:  false
description: How to configure legacy MyProxy authentication in Globus Connect Server version 4.
---

# Legacy MyProxy Authentication

The legacy MyProxy authentication method exchanges end-user credentials for
special, time-limited credentials that Globus uses to perform transfer-related
activities on the user's behalf.

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

{% include info-box.html
   icon="exclamation-triangle"
   header="Please try to use anything else"
   content="Legacy MyProxy authentication is only suitable when you are unable to use CILogon or MyProxy OAuth.  Please try to at least use MyProxy OAuth."
%}

{% include info-box.html
   icon="lock"
   header="Moderate Risk?  Use CILogon"
   content="If you have Moderate Risk data, then two-step is required.  That means you must use the CILogon authentication method (it is the only one which supports two-step at this time)."
%}

Here is how legacy MyProxy authentication works:

1. The end user chooses to use your Globus Connect Server endpoint.

2. Globus asks the end user for their username and password.

3. Globus establishes a secure connection with the MyProxy service running on
   your endpoint, and sends you the username and password provided.

4. MyProxy validates the credentials.  If valid, a short-lived client
   certificate & private key are generated, and sent back to Globus.

Legacy MyProxy is the least-preferred authentication method because, for it to
work, the user must give Globus their local username and password.

When Globus communicates with your endpoint, it uses the client cert issued by
MyProxy, which contains the end user's local username.  That is how your
endpoint knows who is using Globus.

## Globus Configuration

To use legacy MyProxy authentication, you will be making additions to the
`globus-connect-server.conf` file that you first filled in during [initial
configuration]({{ "server/configure.html" }}).

{% include info-box.html
   icon="hand-paper"
   header="Perform initial configuration first"
   content="If you have not already completed the initial configuration, do that first, and then come back here."
%}

Here is the content which needs to be added to the `globus-connect-server.conf`
file:

{% gist 6e11ded3d6e4bca0bf4a0344367f31f2 %}

Each of the sections will now be discussed in detail.  If you do not need this
explanation, you can [skip ahead](#setup).

### Security

The `Security` section is very simple:

```
[Security]
FetchCredentialFromRelay = True
IdentityMethod = MyProxy
```

_IdentityMethod_ tells `globus-connect-server-setup` to configure MyProxy.  The
explanation for _FetchCredentialFromRelay_ is a little more complicated.

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

Here is an example of the output from a successful run of
`globus-connect-server-setup`:

```
Password:
Configured MyProxy server on sci-nfs-1.stanford.edu:7512
CA DN: /O=Globus Connect Server/CN=sci-nfs-1.stanford.edu
Configured GridFTP server to run on sci-nfs-1.stanford.edu
Server DN: /C=US/O=Globus Consortium/OU=Globus Connect Service/CN=3af50398-3961-11e8-b98d-0ac6873fc732
Using Authentication Method MyProxy
Configured Endpoint quake-sci-nfs-1
```

`globus-connect-server-setup` is performing these steps:

1. Checking for newer versions of Globus Connect Server.

2. Enabling the `myproxy-server` and `globus-gridftp-server` services, and
   performing basic configuration for both services.

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

Now that Globus Connect Server (or, more specifically, MyProxy and GridFTP) is
(are) up and running, you should [finish configuration]({{ "server/finish.html"
| relative_url }}).

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
