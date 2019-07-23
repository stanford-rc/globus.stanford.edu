---
layout:      left-sidebar
title:       Authentication, Sharing, and Permissions
title_line:  false
description: Describes how Globus handles authentication, sharing, and permissions
---

After installing Globus Connect Server, and performing the initial
configuration, you need to select an authentication method to use.  You should
also decide if you wish to allow your users to share their space with
outsiders.  Finally, there is a note about how Globus Connect Server handles
local permissions, and what you can do to make sure Globus Connect Server is
able to enumerate everybody it needs to.

# File Permissions

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

{% include info-box.html
   icon="home"
   header="No home directory?  Change the endpoint default"
   content="If users do not have a home directory in your environment, be sure to change the <em>DefaultDirectory</em> setting in your endpoint configuration."
%}

{% include info-box.html
   icon="globe"
   header="No home directory?  Be careful about sharing"
   content="If users do not have a home directory in your environment, special configuration will be needed if you want to enable sharing.  Read the section on sharing for more details."
%}

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
