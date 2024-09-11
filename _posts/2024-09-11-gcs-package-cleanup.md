---
layout:  post
news: true
toc: false
title:       Server admins, upgrade GCS to improve reliability.
excerpt:     With Globus Connect Server 5.4.78, a bug has been fixed that can lead to server crashes.  Sysadmins should upgrade, and then remove a no-longer-needed package.
---

On August 1, Globus released [Globus Connect
Server](https://docs.globus.org/globus-connect-server) version 5.4.78.  Amongst
the items in the [change
log](https://docs.globus.org/globus-connect-server/v5.4/changes/#v5_4_78_aug_1_2024)
is this:

> Added an OpenIDC authentication handler to the `mod-globus` Apache module,
> which replaces the `mod_auth_openidc` Apache module. The `mod_auth_openidc`
> package can now be removed. This change is expected to resolve some Apache
> crashing issues.

A number of Globus Connect Server admins were seeing Apache crashes.  When the
crashes happened, they happened during an Apache reload.  Eventually, these
crashes were traced to `mod_auth_openidc`, an Apache module that Globus was
using for client authentication.

Besides manual reloads by sysadmins, Apache reloads would happen regularly when
logs would rotate, and when collections would be created or deleted.
Reconfiguring logrotate to restart Apache (instead of reloading) would
reduce—but not eliminate—these crashes.

Globus Connect Server system administrators should upgrade Globus Connect
Server to version 5.4.78 at their convenience, or sooner if they are seeing
these crashes.  See the [Upgrading Globus Connect
Server](https://docs.globus.org/globus-connect-server/v5.4/#upgrading_globus_connect_server)
section of the [Globus Connect Server v5 Installation
Guide](https://docs.globus.org/globus-connect-server/v5.4/).

After you finish the upgrade, you can uninstall the `mod_auth_openidc` package
from your server.  On Enterprise Linux 9, for example, this can be done with
the command `dnf remove mod_auth_openidc`.  On some Linux distributions, this
might also remove now-unused dependencies: For example, on Enterprise Linux 9,
the `hiredis` package will also be removed.
