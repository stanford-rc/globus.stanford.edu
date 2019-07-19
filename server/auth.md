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


# Sharing

Sharing is one of the most powerful features provided by Globus Connect Server
endpoints, and is one of the features enabled by our campus-wide subscription.

Sharing allows an authenticated user to create a new endpoint (a _shared
endpoint_), serving a directory of their own; which can be accessed by
non-local users, with read-only or read/write access.

For example, if you have an endpoint connected to your lab's storage, and you
want a directory to be accessible by collaborators at other institutions, one
of your users can create a shared endpoint based on that directory.  You can
give some collaborators read access, and others write access.  You lab members
will continue to use the lab's Globus Connect Server endpoint, while your
collaborators use the new shared endpoint.

Shared endpoints can also be public, allowing anyone access to a directory you
specify.

{% include info-box.html
   icon="exclamation-triangle"
   header="Check your privilege(s)"
   content="The Globus web site makes permissions read-only, unless the user explicitly allows write access.  Before you allow <em>any</em> access, carefully consider who is being allowed access, and to what."
%}

{% include info-box.html
   icon="lock"
   header="Know your risk (level)"
   content="Make sure that everyone with write access to the shared directory—either through the shared endpoint or through the Globus Connect Server endpoint—is aware of the Risk Level of the data."
%}

Sharing is controlled in the `[GridFTP]` section of
`/etc/globus-connect-server.conf`, and has several options:

```
[GridFTP]
;; Other GridFTP options also go in this section

Sharing = True

;; SharingRestrictPaths =

;; SharingUsersAllow =
;; SharingGroupsAllow =
;; SharingUsersDeny =
;; SharingGroupsDeny =

;; SharingStateDir =
```

First, to enable sharing, set the `Sharing` option to `True`.  The default
setting is `False`.

Next, decide if you wish to place any restrictions on which paths may be
shared.  By default, any paths which an authenticated user may access may be
shared.  The format of this option is the same as the `RestrictPaths` option
[described previously]({{ "server/configure.html" | relative_url }}).

{% include info-box.html
   header="Other restrictions still apply"
   content="The <em>SharingRestrictPaths</em> option does not override <em>RestrictPaths</em>, nor does it override the OS.  For example, if you allow write access in <em>SharingRestrictPaths</em>, but that path is restricted to read-only elsewhere, then only read-only sharing will be possible."
%}

Next, decide who is allowed to share.

## Allowing Sharing

You can control who is allowed to share using four options (by default, they
are not set):

```
;; SharingUsersAllow =
;; SharingGroupsAllow =
;; SharingUsersDeny =
;; SharingGroupsDeny =
```

To determine if a user is allowed to create a shared endpoint, Globus Connect
Server executes the following steps (read down the list until you get a
"blocked" or "allowed" result):

1. If a user is listed in `SharingUsersDeny`, then the user is blocked from
   sharing.  If not, then continue evaluation.

2. If a user in a member of a group listed in `SharingGroupsDeny`, then the
   user is blocked from sharing.  If not, then continue evaluation.

3. If `SharingUsersAllow` _and_ `SharingGroupsAllow` are both empty, then the
   user is allowed to share.  If either `SharingUsersAllow` _or_
   `SharingGroupsAllow` are set, then continue evaluation.

4. If the user is listed in `SharingUsersAllow`, then the user is allowed to
   share.  If not, then continue evalation.

5. If the user is a member of one of the groups listed in `SharingGroupsAllow`,
   then the user is allowed to share.  If not, then continue evalation.

6. The user is blocked from sharing.

You can also think about it in terms of "deny-by-default" and
"allow-by-default":

* Anyone who is matched by a `Sharing…Deny` option is always denied.

* Sharing is normally allow-by-default.

* If _either_ of the `Sharing…Allow` options are set, then sharing becomes
  deny-by-default.

## Sharing State

When an authenticated user creates a shared endpoint, Globus Connect Server
needs a place to store information about the shared endpoint.

```
;; SharingStateDir = $HOME/.globus/sharing
```

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
