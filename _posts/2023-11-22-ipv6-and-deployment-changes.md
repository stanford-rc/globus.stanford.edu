---
layout:  post
news: true
toc: false
   
title:       IPv6 Support and Deployment Changes
excerpt:     Globus now supports IPv6!  You should seriously start looking at IPv6 support.  And there's a change in the deployment process.
---

Recent releases of Globus Connect Server have introduced major changes around
IPv6 and Deployment Keys.  Read on to learn what has changed!

# IPv6 Support

With Globus Connect Server 5.4.70, Globus added support for IPv6!  

{% include info-box.html
   icon="clock"
   header="Globus Connect Personal coming soon"
   content="IPv6 support in Globus Connect Personal is not available yet.  Be on the lookout for a news release when it is available!"
%}

## How to Get IPv6 at Stanford

Stanford supports IPv6 for firewalled and un-firewalled networks in the Campus
and Research VLAN Areas.  The process for requesting a public IPv6 network is
slightly different for firewalled and non-firewalled VLANs:

For a non-firewalled network, open a [NetDB
HelpSU](https://stanford.service-now.com/it_services?id=sc_cat_item&sys_id=9ec7c49613bce2008a9175c36144b03e):
In your request, you should…

* Provide the NetDB Name of your network.

* Provide the VLAN number and area (Campus, Research, etc.) for your network,
  for verification.

* Ask for a public IPv6 subnet.

For a firewalled network, go to the [Netdocs request](https://netdocs.stanford.edu/fwrequest/) page, select your Netdocs project, and click the *Ok* button.  Then, click the button *Request something else for your project*.  In your request, you should…

* Provide the name of the firewall, vsys, and zone where the VLAN lives.

* Ask for a public IPv6 subnet.

You will be allocated a /64 IPv6 subnet.  You will be able to allocate IPv6
addresses in NetDB in the same way as with IPv4.

If you choose to use DHCP, you will get your IP address by DHCPv6, and default
gateway by IPv6 autoconfiguration (Route Advertisements).  If you choose to use
static addresses, the default gateway is the `::1` address on your network (so,
for subnet `2607:f6d0:30:826::/64`, the default gateway is
`2607:f6d0:30:826::1`).  [Campus
DNS](https://web.stanford.edu/group/networking/dist/sunet.reports/nameservers.txt)
is available at IPv6 IPs `2607:f6d0:0:53::64:53` and `2607:f6d0:0:53::67:53`.

{% include info-box.html
   icon="globe"
   header="No SLAAC-ing At This Time"
   content="The Campus and Research VLAN Areas do not support IPv6 Stateless Address Auto-configuration (SLAAC), nor do they support the associated IPv6 address privacy extensions.  You will need to allocate IPs in NetDB."
%}

After you have IPv6 configured, you will need to update your host and/or
network firewall rules to allow the same connections through IPv6 as with IPv4.
Once that is done, you can proceed to set up IPv6 on Globus!

## Configuring Globus for IPv6

Globus Connect Server now supports dual-stack IPv4/IPv6 for Globus web access,
which handles API connections from Globus HQ and HTTPS downloads from users.
Support for GridFTP transfers over IPv6 is available now through a hidden
option:  You can use it now; it will be un-hidden in a future release, once
documentation is ready.

The `globus-connect-server node …` series of commands—specifically `node setup`
and `node update`—have been updated to support IPv6 addresses.  There are
two changes:

* The `--ip-address` option can now be used twice, once with an IPv4
  address and once with an IPv6 address.

* The `--data-interface` option takes an IPv4 address only.  If you use the
  `--ip-address` option twice—once with an IPv4 address and once with an IPv6
  address—you need to include this option, with the IPv4 address you provided
  to `--ip-address`.

* The hidden `--data-interface6` option takes an IPv6 address.  If you use the
  `--ip-address` option twice—once with an IPv4 address and once with an IPv6
  address—you need to include this option, with the IPv6 address you provided
  to `--ip-address`.

You can use the above options with `globus-connect-server node update` to
update an existing Data-Transfer Node, or you can use the above options with
`globus-connect-server node setup` to set up a new Data-Transfer Node.

For example, if you have a DTN, UUID `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`,
with IPv4 IP `171.64.1.1`, you could add IPv6 IP `2607:f6d0:30:123::456` with
this command:

```
globus-connect-server node update aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee --ip-address 171.64.1.1 --data-interface 171.64.1.1 --ip-address 2607:f6d0:30:123::456 --data-interface6 2607:f6d0:30:123::456
```

After updating your Data-Transfer Node, you can verify the change took effect
by doing a DNS lookup of your Endpoint's domain name.  You can find this by
going to the [Globus File Manager Collections
tab](https://app.globus.org/file-manager/collections) and looking up your
endpoint.  Your domain will be a subdomain of `data.globus.org` or
`data.glob.us`.  It may take a few minutes to update, but a DNS lookup of your
endpoint's domain name should now return both IPv4 and IPv6 addresses!

# Deployment Key changes

The other major recent change was made to Deployment Keys.

If you have a Globus Connect Server endpoint created prior to GCS 5.4.67
(released on September 20), and you upgrade today, **be prepared for a
deployment-key conversion**.  You will need your Deployment Key, Globus Auth
Client ID, and Globus Auth Client Secret.  At the end, **you will need to save
an updated Deployment Key**.  Read on for details.

## The Secrets of a Globus Endpoint

Every Globus Connect Server v5.4 endpoint has two secrets: A Client Secret, and
a Deployment Key.

When you create a new Globus Connect Server endpoint, the
`globus-connect-server endpoint setup` command creates a "deployment key".
This is a JSON file containing an RSA private key.  Your endpoint
information—as an encrypted blob—is kept at Globus HQ, and synced between
Data-Transfer Nodes as their configurations change.  This is what allows you to
set up new Data-Transfer Nodes, without needing to copy configuration between
Nodes.

Prior to GCS 5.4.61, before doing the Endpoint setup, you would have to go to
the [Globus Developers site](https://app.globus.org/settings/developers), and
get a Globus Auth Client ID and Secret.  These OAuth 2.0 credentials are used
by the GCS Endpoint software to authenticate to Globus HQ.

## GCS Changes

On April 21, GCS 5.4.61 was released, and included a non-breaking change:
Running `globus-connect-server endpoint setup` would handle creating the
Globus Auth credentials for the endpoint.  Admins would not have to go to the
Globus Developers web site: They would be given the Client ID and Secret on the
command-line.  Admins would still have to provide
the Client ID and Secret, whenever running `globus-connect-server node …`
commands.

GCS 5.4.67—released September 20—introduced a **major change**, which
**requires administrator intervention**: Starting in GCS 5.4.67, the deployment
key has been updated to contain the Globus Auth Client ID and Secret used for
the endpoint.  Admins would no longer be given the Client Secret; it would be
included in the Deployment Key file.  And existing Endpoints would no longer
accept older Deployment Keys, without first doing a conversion.

## What To Do

Now that you know what has changed, what do you do?

### New GCSv5 Installations

If you are are setting up a new Globus Connect Server Endpoint, just follow the
installation instructions.  At the end of the endpoint setup process, you will
get a single secret to maintain: The Deployment Key file.  Keep this file
safe.

In the [Globus Developers](https://app.globus.org/settings/developers) site,
you will see a Project; and within that Project, you will see an entry for your
new GCSv5 endpoint.  The Globus Auth Client UUID will match your Endpoint's
UUID, and there will be one Client Secret—which the `globus-connect-server
endpoint setup` command automatically created—stored in the Deployment
Key.

Some third-party web sites might talk about needing to create a Globus Auth
Client, or about storing a Client ID or Secret.  Those sites are now
out-of-date; the Client ID and Secret are stored in your Deployment Key file.

{% include info-box.html
   icon="exclamation-triangle"
   header="Save your deployment key!"
   content="Seriously: As soon as you have your deployment key (either a new one, or an updated one) save it!  Save it in multiple places, and keep them safe.  If you lose your Deployment Key, you may be unable to recover your Endpoint."
%}

### Existing GCSv5 Installations

If you are upgrading a Globus Connect Server endpoint from a version prior to
GCS 5.4.64, here is what you will need to do:

* *Before upgrading any Data-Transfer Nodes*, make sure you have the Deployment
  Key file on the node.

  If you cannot find your Deployment Key file, **stop**.  Do not upgrade
  Globus Connect Server, and do not do *any* more maintenance on your
  Data-Transfer Nodes.  [Contact Globus](http://support.globus.org) immediately
  to see if it is possible to reconstruct your Deployment Key.

  Also, if you cannot find your Client Secret, stop.  Your Endpoint is not in
  danger, but you should still [Contact Globus](http://support.globus.org) to
  be guided through how to create a new Client Secret.

* Begin the [normal upgrade process](https://docs.globus.org/globus-connect-server/v5.4/#upgrading_globus_connect_server),
  but *if you have diskless nodes* that upgrade by re-deploying, then *for this
  upgrade only*, you should upgrade the existing packages via the package
  manager.

  For each Data-Transfer Node, after you finish installing the updated Globus
  packages, run the `globus-connect-server endpoint key convert` command.  You
  will need to provide the Deployment Key file, and the Client Secret.  You
  will need to run this command *on each Data-Transfer Node*.

* After all Data-Transfer Nodes are upgraded, run the `globus-connect-server
  endpoint upgrade` command as normal.

  Finally, **save your updated Deployment Key**!  The old Deployment Key JSON
  file won't work anymore.
