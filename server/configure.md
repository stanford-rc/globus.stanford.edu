---
layout:      page
toc:  true
title:       Globus Connect Server Initial Configuration

description: Instructions on how to start configuring Globus Connect Server.
---

# Globus Connect Server Configuration

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

This page explains how to install and perform initial configuration for Globus
Connect Server.  It assumes that you have already followed the instructions on
the [Pre-Installation Planning]({{ "server/pre-install.html" | relative_url }})
and [Installation]({{ "server/install.html" | relative_url }})
pages.

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
proceed to the end of this page, where you will proceed based on your chosen
authentication method.

## Section Explanations

The rest of this page talks about individual sections of the configuration
presented above.

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

{% include info-box.html
   icon="home"
   header="No home directory?  Change the endpoint default"
   content="If users do not have a home directory in your environment, be sure to change the <em>DefaultDirectory</em> setting in your endpoint configuration."
%}

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

### GridFTP: Path Restrictions

This part configures the paths that authenticated users are allowed to access
via Globus.

```
RestrictPaths =
```

This is where you enter the Globus path-restriction string you devised during
[pre-installation planning]({{ "/server/pre-install.html" | relative_url }}).
If you do not want to specify any Globus path restrictions, this field should
be commented out.

Remember that in all cases, the OS permissions still apply.

### GridFTP: Sharing

```
;; Sharing = True
;; SharingRestrictPaths =
;; SharingUsersAllow =
;; SharingGroupsAllow =
;; SharingUsersDeny =
;; SharingGroupsDeny =
```

This is where you enter the Globus sharing settings you worked out during
[pre-installation planning]({{ "/server/pre-install.html" | relative_url }}).
If you do not want to restrict paths, users, or groups from sharing, those
fields should be commented out.

### GridFTP: Sharing State

```
;;SharingStateDir = $HOME/.globus/sharing
```

When an authenticated user creates a shared endpoint, Globus Connect Server
needs a place to store information about the shared endpoint.

{% include info-box.html
   icon="globe"
   header="No home directory?  Be careful about sharing"
   content="If users do not have a home directory in your environment, special configuration will be needed if you want to enable sharing.  Continue reading this section for more details."
%}

This setting supports the use of `$HOME` (referring to the user's home
directory) and `$USER` (the username of the authenticated user who is creating
the share).  The path must point to a valid directory, and although the user
does _not_ have to own the directory, the user must be able to write to the
directory.  The default is to store shared endpoint state files in the user's
home directory, as shown above.

This requirement can be a problem when users do not have home directories.  In
that case, you will have to perform the following steps to set up a secure
space for shared endpoint state:

{% include info-box.html
   icon="exclamation-triangle"
   header="Keep this directory safe"
   content="This directory is critical to shared endpoint operation.  It must be backed up, with ownership and permissions preserved.  If you have multiple servers behind a Globus Connect Server endpoint, then this directory must be on shared storage accessible to all the servers behind the endpoint."
%}

1. Identify a group that all authenticated users are in.  In this example, we
   will use `operator`.

2. Create a directory somewhere on the system, in a path that authenticated
   users can normally access.  For example, `/var/lib/globus-sharing`
   (`/var/lib` is normally world-readable).  This will be the "sharing
   directory".  Set the owner to `root`, and the group to be the common group.

   ```
   mkdir /var/lib/globus-sharing
   chown root:operator /var/lib/globus-sharing
   ```

3. In your sharing directory, make another directory.  For example,
   `/var/lib/globus-sharing/state`.  This will be the state directory.
   Set the owner to `root`, and the group to be the common group.

   ```
   mkdir /var/lib/globus-sharing/state
   chown root:operator /var/lib/globus-sharing/state
   ```

4. Change the sharing directory so that `root` has full permissions, and the
   group only has execute permissions.  This will allow authenticated users to
   enter the directory, without seeing its contents or making any changes.

   ```
   chmod 0710 /var/lib/globus-sharing
   ```

5. Change the state directory so that `root` has full permissions, the group
   has write and execute permissions, and the sticky bit is set.  This will
   allow authenticated users to enter the directory, create files in the
   directory, and delete the files they create, without seeing the directory's
   contents.

   ```
   chmod 01730 /var/lib/globus-sharing/state
   ```

6. Set `SharingStateDir` to the state directory.

   ```
   ;; Custom state directory, because we don't have homedirs.
   SharingStateDir = /var/lib/globus-sharing/state
   ```

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

## Next Steps

Your next step is to perform configuration that is specific to the
authentication method you decided to use.

* [Click here to configure CILogon Authentication]({{ "server/cilogon.html" | relative_url }})

* [Click here to configure MyProxy OAuth]({{ "server/oauth.html" | relative_url }})

* [Click here to configure legacy MyProxy]({{ "server/myproxy.html" | relative_url }})




