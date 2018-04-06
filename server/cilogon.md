---
layout:      left-sidebar
title:       CILogon Authentication
title_line:  false
description: How to configure CILogon authentication.
---

# CILogon Authentication

CILogon is the preferred authentication method for Globus Connect Server.  For
this method to work, your environment must meet two requirements:

1. All users have some form of active SUNetID.  Full-service, sponsored, and
   base-level SUNetIDs are all allowed.

2. Users must use their SUNetID as their local username.

Here is how CILogon authentication works:

1. The end user chooses to use your Globus Connect Server endpoint.

2. Globus redirects the user to [CILogon](http://www.cilogon.org/Home), which
   redirects the user to the normal [Stanford login
   page](https://login.stanford.edu).

3. Once the user authenticates, Stanford reports successful authentication to
   CILogon, who issues a time-limited certificate and private key to Globus.

CILogon is preferred because it uses the normal Stanford web login process,
which means the user's SUNetID and password do not go to any non-Stanford
sites.

When Globus communicates with your endpoint, it uses the client cert issued by
CILogon, which contains the end user's SUNetID.  That is how your endpoint
knows who is using Globus.

## Globus Configuration

To use CILogon authentication, you will be making additions to the
`globus-connect-server.conf` file that you first filled in during [initial
configuration]({{ "server/configure.html" }}).

{% include info-box.html
   icon="hand-paper"
   header="Perform initial configuration first"
   content="If you have not already completed the initial configuration, do that first, and then come back here."
%}

Here is the content which needs to be added to the `globus-connect-server.conf`
file:

{% gist 6b4c62204916e0c11ad84e093adfa9aa %}

The one section will now be discussed in detail.  If you do not need this
explanation, you can [skip ahead](#setup).

### Security

The `Security` section is very simple:

```
[Security]
FetchCredentialFromRelay = True
IdentityMethod = CILogon
CILogonIdentityProvider = Stanford University
```

_IdentityMethod_ tells `globus-connect-server-setup` that we will be using
CILogon, and _CILogonIdentityProvider_ confirms that our users will be using
Stanford University credentials.  The explanation for
_FetchCredentialFromRelay_ is a little more complicated.

TLS is used to secure the communications between Globus and your endpoint.
With TLS, the server side must have a private key and certificate (if you run a
web site, you are probably aware of this already).  Since Globus is initiating
connections to your endpoint, your endpoint needs a private key and
certificate.  The _FetchCredentialsFromRelay_ setting tells
`globus-connect-server-setup` to fetch a key and certificate from Globus, which
will be used for all future connections from Globus.

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
Using MyProxy server on None
Configured GridFTP server to run on sci-nfs-1.stanford.edu
Server DN: /C=US/O=Globus Consortium/OU=Globus Connect Service/CN=cff864ae-3965-11e8-b98d-0ac6873fc732
Using Authentication Method CILogon
Configured Endpoint quake-sci-nfs-1
```

`globus-connect-server-setup` is performing these steps:

1. Checking for newer versions of Globus Connect Server.

2. Enabling the `globus-gridftp-server` service, and performing basic
   configuration.

3. Installing CILogon's Certificate Authority, which GridFTP will use to verify
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
