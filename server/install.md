---
layout:      page
toc:  true
title:       Globus Connect Server version 4 Installation

description: Instructions on how to actually install Globus Connect Server version 4.
---

# Installation

This page explains how to install Globus Connect Server.  It assumes that you
have already followed the instructions on the [Pre-Installation Planning]({{
"server/pre-install.html" | relative_url }}) page.

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

## Firewall Configuration

Before installing Globus, your host firewall should be configured.  Using a
host firewall reduces transfer performance by a negligible amount, in exchange
for increased security (particularly for the GridFTP control connection).

The list of ports needed were detailed on the [Pre-Installation Planning]({{
"server/pre-install.html" | relative_url }}) page.  As a reminder, here are the
required ports:

1. Inbound from `54.237.254.192/29` on TCP ports `2811` (in all cases) and
   `7512` (for MyProxy and MyProxy OAuth authentication.

2. If using MyProxy OAuth authentication, inbound from all IPs to TCP port
   `443`.

3. Inbound and outbound to/from all IPs on TCP and UDP ports `50000` to `51000`
   (inclusive).

4. Outbound to `52.84.0.0/15` and `54.237.254.192/29` on TCP port `443`.

Ready-made configurations are available for the following firewall managers:

* [firewalld]({{ "server/firewalld.html" | relative_url }})

* [ufw]({{ "server/ufw.html" | relative_url }})

## File Permissions and Directory Configuration

Before installing software, it is worth noting how Globus works with
local accounts and file permissions.

Local file permissions apply when Globus tries to read or write files from an
endpoint.  Globus performs all actions as a user.  Which user, however, depends
on the type of endpoint:

* With a Globus Connect Server endpoint, when acting on behalf of an
  authenticated user, Globus performs all actions with that user's local
  username.

* Within a shared endpoint, Globus performs all actions with the identity of
  the user who created the shared endpoint.

As for the owning group, once Globus identifies the username to use, that
user's primary group will be the group used for all files and directories
created by the "user".

This behavior means that all of your users must be enumerable from your Globus
Connect Server endpoint.  Also, if your endpoint has access to networked
POSIX storage (CephFS, GPFS, Lustre, NFS, etc.), the storage environment should
use the same users/groups view as the endpoint.

{% include info-box.html
   icon="chart-area"
   header="Beware of quotas"
   content="The special treatment of shared endpoints means, on a system with per-user or per-group quotas, it is very easy for one user or group to exceed quota, if that user has a shared endpoint which others may write to."
%}

Although the endpoint must be able to enumerate users, that does not mean users
have to be able to log in.  For example, let's assume that, on the endpoint,
each user's home directory is at path `/mnt/filer/home/USERNAME`, and that the
group with ID number `101` should be used as a common group (instead of the
user's normal primary group).  Also, we want to prevent users from logging in
directly.

{% include info-box.html
   header="Dedicated servers only"
   content="This example only applies to servers that are being used exclusively as a DTN (a data-transfer node).  If you are installing Globus Connect Server on a system that others normally use, these modifications are not required."
%}

If you are using flat files (for example, `/etc/passwd`), ensure that each
user's home directory is set appropriately, and that their shell points to
`/sbin/nologin`.

If you are using [nslcd](https://linux.die.net/man/8/nslcd) to authenticate
with LDAP, add these lines:

```
map passwd homeDirectory "/mnt/filer/home/$uid"
map passwd gidNumber  "101"
map passwd loginShell "/sbin/nologin"
```

If you are using [sssd](https://linux.die.net/man/8/sssd), place these lines in
the `[domain]` section you have defined for LDAP:

```
override_shell   = /sbin/nologin
override_gid     = 101
override_homedir = /mnt/filer/home/%u
```

The above configurations can be tailored to your needs.  For example, if users
do not have a home directory in this environment, you can use `/var/empty`.
Or, if the user's default group is OK, you can remove the `override_gid` or
`map passwd gidNumber` line.

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
   content="All Yum-based distributions will need to install the <code>yum-plugin-priorities</code> package.  Failure to install this package will cause you to install incorrect versions of some Globus packages, resulting in undefined functionality."
%}

{% include info-box.html
   header="EPEL Required"
   content="On RHEL-derived distributions, Globus Connect Server requires the <code>udt</code> package from EPEL.  If you are not comfortable enabling the entire EPEL repository on your system, you should use the appropraite EPEL repository from <a href=\"http://yum.stanford.edu/mrepo\">yum.stanford.edu</a>; Stanford's EPEL mirror is a curated subset of the entire EPEL repository, and includes the <code>udt</code> package."
%}

Now that packages are installed, you are ready for [initial configuration]({{
"server/configure.html" | relative_url }})!




