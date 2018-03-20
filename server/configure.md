---
layout:      left-sidebar
title:       Globus Connect Server Initial Configuration
title_line:  false
description: Instructions on how to start configuring Globus Connect Server.
---

# Initial Configuration

This page explains how to perform initial configuration for Globus Connect
Server.  It assumes that you have already followed the instructions on the
[Site Prep and Installation]({{ "server/install.html" | relative_url }}) page.
That means…

* Firewall ports—on the network level _and_ on the host—have been opened.

* A Globus ID has been chosen (and, if necessary, created and enabled).

* Globus Connect Server packages have been installed.

Globus configuration has been split into two parts: _Initial configuration_ is
covered by this page, and explains the parts of Globus Connect Server
configuration that are not dependant on authentication method.
Authentication-specific configuration is covered on separate pages, one page
per authentication method.

Globus Connect Server consists of multiple components, including…

* GridFTP, for file transfer.

* Certificate Authority (CA) files, so that GridFTP knows who to trust.

* MyProxy, for issuing short-term certificates identifying end users.

* MyProxy OAuth, for directly handling local authentication.

* CA files, so that MyProxy can trust third-party services, like CILogon or
  another OAuth server.

Not all of these components are activated, and not all configurations are the
same.  Much depends on how you configure Globus Connect Server.

To make setup easier, the `globus-connect-server-setup` program reads from a
single file, `/etc/globus-connect-server.conf`.  Depending on the contents of
that file, other configuration files will be modified, services started or
stopped, et cetera.

## The Complete Initial Configuration

A template `globus-connect-server.conf` file was created when you installed the
`globus-connect-server` package.  Replace the contents of that file with the
template below:

{% gist b609c892271fa11fcf0504e07d6ed3f3 %}

If you need additional explanation, continue reading.  Otherwise, you should
proceed to [choose an authentication method]({{ "server/auth.html" |
relative_url }}).

## Section Explanations

The rest of this page talks about individual sections of the configuration
presented above.  If the comments in the configuration already make sence, then
you should feel free to skip this section and [choose an authentication
method]({{ "server/auth.html" | relative_url }}).

### Globus

The `Globus` section of the configuration file is where you specify your Globus
ID and password.

```
[Globus]
User = stanford
Password = %(GLOBUS_PASSWORD)s

```

In the above example, the Globus ID is `stanford@globusid.org`, to the _User_
is set to `stanford`.

Your Globus ID is public, and should not change for the life of the endpoint,
so it is safe to hard-code the Globus ID in your configuration file.  Your
password is another matter…

In the above, the special string `%(GLOBUS_PASSWORD)s` tells the
`globus-connect-server-setup` program to look in the `GLOBUS_PASSWORD`
environment variable for the Globus ID password.  If the environment variable
is empty or does not exist, then `globus-connect-server-setup` will ask you for
the password whn you run it.

{% include info-box.html
   icon="exclamation-triangle"
   header="Keep your password safe!"
   content="Your Globus ID password is a secret!  If you hard-code it in this
   file, then the entire file must be treated as a secret."
%}

### Endpoint

The `Endpoint` section controls what people will see when they look
up your endpoint.

```
[Endpoint]
Name = blah
Public = False
DefaultDirectory = /~/
```

The three fields in this section will appear in your endpoint's page on the
Globus web site.

{% include info-box.html
   icon="exclamation-triangle"
   header="Beware conflicts"
   content="Any time you run `globus-connect-server-setup`, if there is a difference between this file's contents and your endpoint's configuration on the Globus web site, this configuration will take precedence."
%}

The _Name_ is a short name for your endpoint.  Once chosen, it forms part of
your _endpoint ID_, which is a combination of your Globus Connect ID and your
endpoint's short name.  For example, if your Globus ID is
`stanford@globusid.org` and your endpoint's short name is `blargh`, then your
endpoint ID will be `stanford#blargh`.

When you refer people to your endpoint, the endpoint ID is the best thing to
use, because it is short, memorable, and easy to search on th Globus web site.

The _Public_ setting tells the Globus web site if your endpoint will appear in
search results.  If you leave this set to `False` (which is the default), it
will be harder for users to find your endpoint.

{% include info-box.html
   header="Public does not mean world-readable"
   content="Just because your endpoint is public, does not make it world-readable.  Users will still need to authenticate."
%}

When a user successfully finds and authenticates to your endpoint, they will
need to be placed in an initial directory.  This is controlled by the
_DefaultDirectory_ setting.  The default, `/~/`, means "The user's home
directory".

### GridFTP

```
[GridFTP]
```

The `GridFTP` section is the largest of the configuration file, and so has been
broken up into parts below.

### GridFTP: Encryption

This part enables encryption for data transfers.

```
RequireEncryption = True
```

Globus Connect Server enforces encryption in several areas:

* End users use TLS to connect to Globus web and API services, as well as to
  OAuth services.

* Globus infrastructure uses TLS to connect to the GridFTP and MyProxy services
  running on an endpoint.

There is only one area where encryption is optional: The actual file data sent
from endpoint to endpoint may be sent in the clear.  This is because encryption
does add a processing overhead, which can slow down transfers.  However, with
modern CPUs, the overhead is generally minimal.  So, although Globus has data
stream encryption off by default, our default configuration enables it.
You should only consider disabling encryption when your endpoint only has
access to Low Risk data.

{% include info-box.html
   icon="exclamation-triangle"
   header="Keep settings in sync"
   content="If this setting is True, then you must also go to your endpoint's configuration page on the Globus web site, and change the corresponding setting there, as well.  If this setting is True, but your endpoint on Globus has this set to False, then all transfers will fail."
%}

{% include info-box.html
   icon="exclamation-triangle"
   header="Cancel transfers before enabling"
   content="If encryption is disabled, and you decide to enable it, then make sure no transfers are running.  If any transfers to/from this endpoint exist (even if they are paused), enabling encryption will cause those transfers to fail."
%}

### Path Restrictions

This part configures the paths that authenticated users are allowed to access
via Globus.

```
RestrictPaths =
```

By default, Globus does not enforce any restrictions, which means OS filesystem
permissions govern what an authenticated Globus user can access.  For example,
if an authenticated Globus user will not be able to access `/root`, because
local system permissions will prevent it.

`RestrictPaths`, when not empty, takes a comma-separated list of restrictions.
Each restriction item has three components:

* An `R` (for "read-only"), `RW` (read-write), or `N` (explicit deny).

* A tilde (`~`), or a forward-slash (`/`); indicating that the restriction is
  relative to the authenticated user's home directory, or the root directory,
  respectively.

* Optionally, a more-specific path, which can contain `*` (for simple wildcard
  matching).

Permissions on directories automatically inherit the permissions of the parent
directory.  The order in which entries appear does not matter; 

{% include info-box.html
   header="Disabled, or deny-by-default"
   content="If this setting has <em>any</em> entries, and the root directory is not explicitly made read-only or read-write, then a `N/` entry will automatically be added to the list.  That makes RestrictPaths, when active, deny-by-default."
%}

Here are some example entries:

* `N/etc,N/usr,R/,N/tmp,N/var,RW/home`

  Block access to the `/etc`, `/usr`, `/tmp`, and `/var` directories, but allow
  read-write access to files in `/home`, and read-only access to everything
  else.

  (Remember, entries can appear in any order.)

* `RW/scratch,RW/oak/stanford,N~/.*,RW~`

  The above example sets the following permissions:

  * Read-write to everything in `/scratch` and `/oak/stanford`.

  * Files and directories that are in the user's home directory, but which
    start with a dot, are not accessible.

  * Read-write for everything else in the user's home directory.

  (Remember, only the `*` is used as a wildcard.  The dot is a plain old dot.)

Note that in all of these examples, the OS permissions still apply.

### GridFTP: Sharing

```
;; Sharing = True
;; SharingRestrictPaths =
;; SharingUsersAllow =
;; SharingGroupsAllow =
;; SharingUsersDeny =
;; SharingGroupsDeny =
;;SharingStateDir =
```

Sharing is covered on the same page as [authentication]({{ "server/auth.html" |
relative_url }}).

### GridFTP: Server Connectivity

This part tells others how to connect to the GridFTP service running on your
endpoint.

```
Server = %(HOSTNAME)s
;;ServerBehindNAT = True
;; DataInterface =
```

These three items are all related.  What you set them to depends on how your
machine's name an IP address, as you can see it, matches what the rest of the
world can see.

In the most simple case, your machine has a network interface with a public IP
address, and the machine is able to perform forward and reverse DNS lookups to
confirm that the machine's fully-qualified domain name resolves to one of the
interface's IP addresses.  In that case, nothing needs to be changed.

However, in some cases, Globus can not properly identify the public hostname of
your machine.  This happens most often when the machine is behind a NAT, or if
the machine is part of an environment where it is getting DHCP from something
other than the Stanford network.  In those cases, you should set
`ServerBehindNAT` to `True`.  And if the system's hostname does not match the
name that the rest of the world uses to connect to it, then set `Server` to be
the public hostname of the system.

{% include info-box.html
   icon="exclamation-triangle"
   header="Avoid network load-balancers"
   content="Do not put your Globus endpoints behind a network load-balancer.  Globus natively supports multiple GridFTP servers behind one endpoint, so external load-balancing is not required.  If you are trying to enable failover for MyProxy, that is out of the scope of this documentation."
%}

{% include info-box.html
   icon="exclamation-triangle"
   header="Do not use proxies or packet filters"
   content="It is extremely important that you <em>do not</em> route your GridFTP traffic through a proxy or packet filter.  GridFTP uses extensions to the FTP protocol, and if a proxy or filter is unable to handle the GridFTP extensions, transfers may not work at all."
%}

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}