---
layout:  post
news: true
toc: false
title:       Globus Connect Server version 4 Ends in December 2023
excerpt:     Globus Connect Server version 4 has been deprecated, and will stop working at the end of calendar year 2023.  You should upgrade to GCSv5.
---

After more than ten years, Globus has [announced the deprecation of Globus
Connect Server v4](https://www.globus.org/blog/globus-connect-server-v4-will-be-deprecated-july-31-2023).  **If you run Globus Connect Server v4, plan on upgrading to v5 prior to Winter Closure 2023**.

Globus has put forward the following timeline for the end of GCSv4:

* Starting August 1, Globus will only release security updates to Globus
  Connect Server v4.

* On December 18, [the Globus service will stop supporting GCSv4 endpoints](https://www.globus.org/blog/support-for-globus-connect-server-version-4-ends-on-december-18-2023).

From a MinSec perspective, you are OK to continue running GCSv4 up until
end-of-life, as Globus will continue providing security updates until the
service is shut off on December 18.  Once December 18 arrives, Globus Connect
Server v4 will stop working entirely.

## Globus Connect Personal

Globus Connect Personal is not affected by this announcement, and continues to
work.  However, **you must be running Globus Connect Personal 3.2.0 or later**.

To check for updates to Globus Connect Personal, run it, click on its icon in
the menubar (or system tray), and select "Check For Updates".

## Changes to this site

Compared to version 4, Globus Connect Server version 5 has a very different
installation procedure.  That means this site's existing [Server
documentation]({{ "/server.html" | relative_url }})
is no longer valid.

All of the existing server pages will be updated with a note saying
that Globus Connect Server v4 has been deprecated.  Eventually,
the pages will be replaced with a redirect, but users will be given an
opportunity to see the old content via the [Internet
Archive](https://archive.org/)'s [Wayback Machine](https://web.archive.org).

Once Globus Connect Server 5 content is available, a new news post will appear!

## Upgrading to version 5

{% include warning.html
   content="These Globus resources are no longer available"
%}

Globus have created a very detailed migration
guide,
explaining how you can perform an **in-place upgrade** to Globus Connect Server
5.4.

Globus have also created a migration tool, `gcs-migration`, which will…

* Sanity-check your existing GCSv4 installation;

* Create a migration plan;

* Identify potential upgrade problems (and later, check if the problems have
  been resolved); and

* Perform part of the migration.

The migration is finalized using the `globus-connect-server` command, which is
installed as part of Globus Connect Server v5.

### Migration Downtime

All of the preparation work can be completed without downtime.  Installing the
`gcs-migration` tool does not disrupt an existing Globus Connect Server v4
installation.  If upgrade problems are found, you might need to take a downtime
to resolve them, before doing the upgrade.

If you have a Globus Connect Server v4 endpoint with multiple servers, your
migration downtime will be less than 30 minutes.  You will take one server
offline for the first part of the migration, then take all servers offline for
the final cutover.

If you have a Globus Connect Server v4 endpoint with only a single server, your
migration downtime will be longer (an hour or more).  The entire migration will
need to be performed during a downtime.  Howeve, sanity-checking and upgrade
preparation can be performed without needing a downtime.

### Firewall changes

If you have a host or network firewall in place, you will need to make some
changes, compared to GCSv4:

* Before your upgrade, you need to open inbound TCP port 443 to the world.
  GCSv5 uses port 443 for administrative control of endpoints, for GridFTP
  control traffic, and for HTTPS downloads.

  With GCSv5, many administrative tasks are accomplished by making API calls
  directly to the endpoint (instead of to Globus HQ).  Those API calls come in
  over TLS on TCP port 443, from wherever you are running the
  `globus-connect-server` command.

  GridFTP control traffic continues to come from Globus's public IP range,
  `54.237.254.192/29`.  GridFTP control traffic previously came in on port 2811.

  GCSv5 gives the ability for users to upload and download files via HTTPS.
  In those cases, users will be connecting to your endpoint over TLS on TCP
  port 443.

  If your firewall rule has an application profile configured, be sure to
  configure both the `tls` and the `gridftp` application types.

* After the upgrade to GCSv5, you can remove the rule allowing connections to
  inbound TCP ports 2811 amd 7512.  Port 2811 was used for GridFTP control
  traffic, which now uses TCP port 443.  Port 7512 was used for MyProxy
  traffic, which has been replaced with OIDC over TCP port 443.

The firewall rules opening TCP and UDP ports `50000` through `51000`—inbound
and outbound—need to remain.  These continue to be used for GridFTP data
traffic.

If you use outbound firewall rules, those do not need to change.

### Upgrade Support

If you have questions regarding an upgrade, or experience issues, you should
contact [Globus Support](mailto:support@globus.org) for assistance.  Globus
Support is most available during US/Central business hours, during weekdays
(not holidays).
