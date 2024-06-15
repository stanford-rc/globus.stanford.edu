---
layout:      page
see-also: true
id: server
toc:  true
title:       Configuration Backup & Restore

description: Describes how to backup and restore a Globus Connect Server version 4 configuration.
---

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

If you are backing up a system running Globus Connect Server, no special
configuration is required.  The most esoteric thing that Globus Connect Server
uses is symlinks, so as long as symlinks are backed up as symlinks, the backup
will be OK.  If you have a multi-DTN endpoint (where one endpoint has multiple
servers), you only need to back up one DTN.

If you are not doing full-system backups (for example, you are only backup up
user spaces like `/home`), then you will need to take measures to protect the
file `/etc/globus-connect-server.conf`.  For example, you might store that file
in a separate configuration management system (like Puppet).  As long as that
file is protected (and kept up-to-date with endpoint changes), the endpoint
will be able to be restored.

# Restoring from Backup

If you are restoring a Globus Connect Server from backup, there are two
different procedures: One procedure is for single-DTN endpoints, and one
procedure is for multi-DTN endpoints.

{% include info-box.html
   header="Did all DTNs fail?"
   content="The multi-DTN restore procedure is only used when at least one DTN
   (at least one of the servers in the endpoint) is still working.  If all of
   your DTNs failed, then you should follow the single-DTN procedure."
%}

From a planning perspective, the Globus Connect Server endpoint should not be
restored until all storage is restored.  In other words, if your
environment has any storage servers (or clustered storage environments), they
should all be up and stable before you restore the endpoint.

{% include info-box.html
   header="Use Pause Rules for Notifications"
   content="If you are going through an outage, you can use a Pause Rule to
   block all Globus operations to your endpoint.  That will prevent users from
   seeing confusing timeout messages on the Globus web site."
%}

## Restoring a single-DTN endpoint

This procedure is used to restore a Globus Connect Server instance where all of
the DTNs have failed.  In other words…

* If your Globus Connect Server endpoint only has one DTN (one server), use
  this procedure.

* If your Globus Connect Server endpoint has multiple DTNs (multiple servers),
  and all of them have failed, then you should also follow this procedure.

  You will use this procedure to restore _one_ DTN to service.  Then you will
  restore the remaining endpoints, using the other procedure.

Here is the procedure:

1. [Log in to Globus](https://app.globus.org), go to the Console, go to the
   _Pause Rules_ section, and add a pause rule for your endpoint.  The rule
   should apply to all users, to all activities, and to current and new tasks.

   At this point, all transfers (which would have been failing anyway) are now
   paused, and users (anyone who had an active transfer) are notified.

2. Either restore the DTN from backup, or rebuild it.

   If you are restoring from backup, it is OK to restart.  The endpoint has
   been paused, so it will not receive any Globus traffic.

   If you are rebuilding the endpoint, perform all of the steps from the
   [Pre-Installation Planning]({{ "pre-install.html" | relative_url}}) and
   [Software Installation]({{ "install.html" | relative_url }}) sections.  This
   will reinstall the latest Globus Connect Server packages.

3. Stop the `globus-gridftp-server` and `myproxy-server` services, if they are
   running.  If you are running Red Hat Enterprise Linux (or a derivative
   distribution), also stop the `httpd` service (if it is running).  If you are
   running Debian (or a derivative distribution), also stop the `apache2`
   service (if it is running).

4. Go back to the Globus web site, go to your endpoint, and go to the
   _Overview_ tab.

5. Check, and (if necessary) fix, the `/etc/globus-connect-server.conf` file,
   using the endpoint information on the Globus web site:

   * In the Globus section, the User setting comes from the endpoint's
     Advertised Owner.

   * In the Endpoint section, all of the settings here can be found from the
     _Overview_ tab of the endpoint.

   * In the Security section, if you are not sure about the IdentityMethod, you
     should check the _Server_ tab of the endpoint:

     * If the Identity Provider type is simply "MyProxy", then you are using
       the "MyProxy" IdentityMethod.

     * If the Identity Provider type if "MyProxy OAuth", and the Host is
       "cilogon.org", then you are using the "CILogon" IdentityMethod.

     * Otherwise, you are using the "OAuth" IdentityMethod.

     The rest of the settings will have to be figured out on your own.  You may
     also want to consult the other pages in this section of this web site.

   * In the GridFTP section, the RequireEncryption setting comes from the
     endpoint's Force Encryption setting.  The Server, IncomingPortRange, and
     OutgoingPortRange settings come from the _Server_ tab of the endpoint.
     The RestrictPaths and Sharing settings will depend on your policy, and the
     remaining settings in this section will depend on your network.

   * In the MyProxy section, the Server and ServerBehindNAT settings will
     depend on your network.  The other settings should almost always be left
     alone, but may need to be modified.

   * The OAuth section is only configured if using MyProxy OAuth
     authentication.  If used, the Server and ServerBehindNAT settings will
     depend on your network.  The Stylesheet and Logo can be obtained from the
     [OAuth Configuration page]({{ "server/oauth.html" | relative_url }}).

6. Run `globus-connect-server-setup`.  This will generate new certificates and
   update the endpoint.

7. Go back to the Globus web site, go to the page for your endpoint, and
   refresh the page (to be sure it is up-to-date).  Perform a few spot checks:

   * On the _Overview_ tab, check that the Visible To and Force Encryption
     settings are correct.

   * On the _Server_ tab, look at the list of servers.

     If your endpoint only has one DTN, there should only be one server; if your
     endpoint has more than one DTN, the number of server entries should match
     the number of DTNs.

     If you see too many entries, then your restored DTN has been added as a
     new server (instead of a replacement).  Compare the new entry and the old
     entry, focusing on the URIs.  You may find that your DTN's configuration
     is wrong, or the restored DTN has a different hostname.

     If your `/etc/globus-connect-server.conf` is correct, then delete the
     server entry for the old DTN (the one you just restored/rebuilt).  If your
     `/etc/globus-connect-server.conf` is wrong, correct it, delete the wrong
     server entry, and run `globus-connect-server-setup` again.

8. On the Globus web site, go back to the console, and remove the pause rule.

   Go to the File Manager, and do a directory listing on your endpoint.
   Perform a transfer in and a transfer out.

Congratulations!  You have successfully restored your DTN!  If your endpoint
only has one DTN, you are done.

If your endpoint has more than one DTN, you should read on for the steps to
restore those other DTNs.

## Restoring a DTN from a multi-DTN endpoint

This procedure is used in situations where your Globus Connect Server endpoint
has multiple DTNs (multiple servers), and at least one of those DTNs is still
working.  This process should be repeated for each failed DTN.

1. [Log in to Globus](https://app.globus.org), go to the Endpoints section,
   locate your endpoint, and go to the _Server_ tab.  In the _Servers_ section,
   identify the entry for the server that has failed, and click that entry's
   _Remove Server_ button.

2. Log in to the DTN that is still working.  Check the file
   `/etc/globus-connect-server.conf`, making sure that it still matches
   reality.  In particular…

   * The Globus User and Endpoint Name should match the endpoint record on the
     Globus web site.

   * The Endpoint Public and DefaultDirectory settings should match the
     endpoint record on the Globus web site.

   * The GridFTP RequireEncryption setting should match the endpoint record on
     the web site.

   For the above settings, the web site is the source of truth, so make sure
   the `globus-connect-server.conf` file is updated.  Then make sure it is
   being backed up.

At this point, all transfers will be using the remaining DTNs on the
endpoint, so transfers will not be interrupted (although users of busy
endpoints may notice that transfers are slower than normal).

The rest of the process depends on if you can restore your failed server from a
backup, or if it will need to be rebuilt.

## Restoring the DTN from backup

If you can restore from backup, then once you followed steps 1 and 2 above,
follow these steps:

3. Restore the failed DTN from backup.  If you need to restart, that is OK.
   This server is no longer part of the endpoint, so it will not receive any
   Globus traffic.

4. Stop the `globus-gridftp-server` and `myproxy-server` services, if they are
   running.  If you are running Red Hat Enterprise Linux (or a derivative
   distribution), also stop the `httpd` service (if it is running).  If you are
   running Debian (or a derivative distribution), also stop the `apache2`
   service (if it is running).

5. Check the restored `/etc/globus-connect-server.conf` file, comparing it to
   the copy on the working DTN.  If need be, delete the restored copy, and
   replace it with the copy from the working DTN.

   Note that if you do replace the restored copy, you should check some of the
   settings, which are DTN-specific:

   * In the GridFTP, MyProxy, and OAuth sections; the Server and
     ServerBehindNAT items may be unique to the DTN.

   * In the GridFTP section; the IncomingPortRange, OutgoingPortRange, and
     DataInterface may be unique to the DTN.

6. Run `globus-connect-server-setup`.  This will generate new certificates and
   re-add the DTN to the endpoint.

7. Go back to the Globus web site, and reload the endpoint page.  In the
   _Overview_ section, confirm that endpoint settings (like _Force Encryption_)
   have not changed.  In the _Server_ section, confirm that the restored DTN
   has been added back to the list.

Congratulations!  Your DTN has been restored, and should now be operational.

## Rebuilding the DTN

If you can not restore from backup, then once you followed steps 1 and 2 above,
follow these steps:

3. Perform all of the steps from the [Site Prep and Installation]({{
   "install.html" | relative_url }}) section.  This will reinstall the latest
   Globus Connect Server packages.

4. Stop the `globus-gridftp-server` and `myproxy-server` services, if they are
   running.  If you are running Red Hat Enterprise Linux (or a derivative
   distribution), also stop the `httpd` service (if it is running).  If you are
   running Debian (or a derivative distribution), also stop the `apache2`
   service (if it is running).

5. Copy the `/etc/globus-connect-server.conf` file from the working DTN to the
   restored DTN.  After copying, check (and, if necessary, set) DTN-specific
   settings:

   * In the GridFTP, MyProxy, and OAuth sections; the Server and
     ServerBehindNAT items may be unique to the DTN.

   * In the GridFTP section; the IncomingPortRange, OutgoingPortRange, and
     DataInterface may be unique to the DTN.

6. Run `globus-connect-server-setup`.  This will generate new certificates and
   re-add the DTN to the endpoint.

7. Go back to the Globus web site, and reload the endpoint page.  In the
   _Overview_ section, confirm that endpoint settings (like _Force Encryption_)
   have not changed.  In the _Server_ section, confirm that the restored DTN
   has been added back to the list.

8. Schedule an upgrade of the other DTNs as soon as possible, so that all DTNs
   are on the same (4.x) version of Globus Connect Server.

Congratulations!  Your DTN has been restored, and should now be operational.




