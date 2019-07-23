---
layout:      left-sidebar
title:       Globus Connect Server Site Prep and Installation
title_line:  false
description: Instructions on how to prepare your environment for Globus Connect Server.
---

# Pre-Installation Planning

Before installing Globus Connect Server, you need to make a few decisions about
how users will access your server, and what they should be allowed to access.

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Moderate Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

Before continuing on with this page, we suggest that you allocate some space in
your favorite note-taking medium.  You will need to answer the following
questions:


* **Which Globus ID do I use?**

* **What auth method will users use?**

* **What is my IP address and firewall configuration?**

* **What should users be allowed to access?**

* **Will sharing be allowed?**

This page will help you to answer each of those questions.

# Choosing a Globus ID

People may not own Globus Connect Server endpoints directly.  Globus Connect
Server endpoints are owned by entities, with people acting as the
administrators and users.  The [Globus ID]({{ "accounts/globusid.html" |
relative_url }}) exists as a way for Globus Connect Server endpoints to have a
Globus identity.

Several well-known Globus IDs already exist at Stanford, and you may be able
to register your Globus Connect Server under one of them:

* `stanford`, maintained by the [Stanford Research Computing Center](https://srcc.stanford.edu/).

* `sulibraries`, maintained by [Digital Library Systems and Services](https://library.stanford.edu/department/digital-library-systems-and-services-dlss).

To use one of these well-known Globus IDs, reach out to the group using the
links above.  They will work with you during Globus Connect Server setup, in
the same way that an Active Directory admin would work with you to join a
Windows machine to an AD Domain.

If you have decided to create your own Globus ID, refer to the
[Globus ID]({{
"accounts/globusid.html" | relative_url }}) page for instructions.  After
creating a Globus ID, email <srcc-support@stanford.edu>, asking for your Globus
ID to be assicated with Stanford's Globus subscription.  In your email, provide
the following information:

* Your Globus ID.

* Information about your group, your relationship to Stanford, and how you plan
  to use Globus.

* Contact information for the people who will be maintaining the Globus Connect
  server(s).

* Confirmation that you will only use Globus for Low or Moderate Risk data.

Once submitted, you should hear back within two business days.

<i class="fas fa-clipboard-list"></i> For this planning item, you need answers
to the following questions:

1. Will I be using one of the well-known Globus IDs, or will I choose my own?

2. If I choose my own Globus ID, what will it be?

{% include info-box.html
   header="Choose wisely!"
   icon="exclamation-triangle"
   content="Your Globus ID will form part of the public identifier for
your Globus Connect Server endpoint.  For example, if your extremely-important
cancer research data are being hosted on a Globus Connect Server endpoint named
`cancer_study`, but your Globus ID is `annoying`, people will forever refer to
your endpoint as the `annoying#cancer_study` endpoint."
%}

<i class="fas fa-clipboard-check"></i> *Congratulations!*  You now have your
Globus ID selected!  This is the first prerequisite.

&nbsp;

# Choosing an Authentication Method

The [introduction to Globus accounts]({{ "accounts.html" | relative_url }})
explained how Globus understands that individuals often have multiple
identities at different institutions.  Globus Connect Server needs to map
Globus identities to local users on the endpoint.  The specific method used
depends on how easily the translation can be made.

**In the ideal case, all local accounts use SUNetIDs**.  When all local
accounts use SUNetIDs, the **CILogon authenticaion method** should be used.
This method relies on University IT's [SAML
(Authentication)](http://uit.stanford.edu/service/saml) service to handle the
work of authentication, and uses the [CILogon platform](http://www.cilogon.org)
to convert a successful authentication into a set of temporary access
credentials.  This is the same method that Globus uses when you log in to
[www.globus.org](https://globus.org).

{% include info-box.html
   icon="globe"
   header="Local accounts for outside users?"
   content="If you only create local accounts for non-Stanford users to share data, you should strongly using CILogon authentication for Stanford users, and replacing non-Stanford local accounts with shared endpoints.  If that is not possible, then you can get free base-level sponsored SUNetIDs for your outside collaborators."
%}

If your users are all Stanford users, but you do not use SUNetIDs, you should
consider taking the time to change usernames to match SUNetIDs.

{% include info-box.html
   header="SUNetID Authentication is not required"
   content="The only requirement for CILogon is that you use SUNetIDs as usernames.  Although CILogon will use SUNetID passwords (and two-step) for authentication, you do not have to use SUNetID passwords (or Kerberos) in the rest of your environment."
%}

If you absolutely cannot rely on SUNetIDs as usernames in your environment, the
next-best option is to use the **MyProxy OAuth** method.  This method runs a
world-accessible OAuth service on your Globus Connect Server endpoint.  When
needed, Globus will send your users to this service, and they will
authenticate with their local username and password.  On a successful
authentication, a set of temporary credentials is given to Globus.

{% include info-box.html
   icon="exclamation-triangle"
   header="Patching is important!"
   content="Since this method exposes a web server to the world, you must ensure that the server is patched on a regular basis."
%}

The downside of the MyProxy OAuth method is that you need to run a web server
that is open to the world.  If you (or your security group) are unwilling to
accept this, then the last option is to use the **legacy MyProxy** method.
With this method, when Globus needs your credentials, it will ask you directly.
You give Globus your username and password, which Globus exchanges for
temporary credentials.  You will still be running a MyProxy (non-OAuth) service
on your endpoint, but it only needs to be accessible by Globus.  This means you
are trusting Globus with your username and password, although only for a short
time.

To summarize the three options:

1. **CILogon**: Most secure, and easiest to use, but requires that all local
   users use their SUNetID as their username.

2. *MyProxy OAuth*: More secure when SUNetIDs can not be used, but requires
   running a web server.

3. legacy MyProxy:  Works when SUNetIDs can not be used, and does not require a
   web server, but exposes your credentials to Globus.

{% include info-box.html
   icon="lock"
   header="Moderate Risk?  Use CILogon"
   content="If you have Moderate Risk data, then two-step is required.  That means you must use the CILogon authentication method (it is the only one which supports two-step at this time)."
%}

<i class="fas fa-clipboard-list"></i> For this planning item, you need answers
to the following questions:

1. Can I use CILogon authentication?

2. If I cannot use CILogon authentication, then can I use MyProxy OAuth, or do
   I have to fall back to legacy OAuth authentication?

{% include info-box.html
   icon="question-circle"
   header="Still not sure?"
   content="If you are not sure about which method to choose, get in touch with us."
%}

<i class="fas fa-clipboard-check"></i> *Congratulations!*  You now have your
authentication method selected.  This is the second prerequisite.  The decision
you have made here effects what you do next, as you get a public IP address and
perform firewall configuration.

&nbsp;

# IP and Firewall Configuration

Globus Connect Server requires a public IP address.  This is because Globus—and
any non-Stanford endpoints—will need to connect to your server.  If your chosen
server does not have a public IP address, you will need to allocate one first.

{% include info-box.html
   header="IPv6 Support"
   icon="globe"
   content="At this time, Globus does not use IPv6.  You are free to request and configure an IPv6 address on the server, but all IP addresses should be entered in Globus configuration using IPv4."
%}

Globus Connect Server requires a public IPv4 address, which means your IT
organization may require the server be placed behind a network firewall.  For
Globus Connect Server to work, certain inbound and outbound ports will need to
be opened.

If your network firewall filters inbound traffic, here is what you will need to
allow (the zone names are [netdocs](https://netdocs.stanford.edu/)/Palo Alto
firewall zone names):

* From `54.237.254.192/29` (in the `untrust` zone), to TCP ports `2811` and
  (in some cases) `7512`.

  Port 2811 is used for Globus to issue transfer-related control commands to
  your endpoint.  For example, directory listing, and initiating transfer to
  another endpoint.

  Port 7512 is used for the MyProxy authentication service.  Globus sends
  credentials to MyProxy over this connection, receiving certificates in
  return.  It is required for both the MyProxy and MyProxy OAuth authentication
  methods.

* From _any IP address, in any zone_, to all TCP and UDP ports from `50000` up
  to and including `51000`.

  These ports are used for data-transfer traffic.  The large range is to
  facilitate a large number of connections.  Almost all transfers are using
  TCP, but some legacy transfers may use UDP, so it is helpful to keep that
  open.

  The "any" zone is used here; in case you have multiple firewall zones in the
  same vsys, if there are Globus endpoints in those other zones, they may need
  to be able to connect to you.

  _If you are in the School of Medicine_, or your network firewall is
  controlled by MedIRT, when you submit your firewall request, tell them to use
  the "ssl application", not the "gridftp application".  If MedIRT have any
  questions, ask them to refer to "SNOW incident INC00282086".

If you use MyProxy OAuth authentication method, one more inbound port will be
needed:

* From _any IP address_ (in the `untrust` zone), to TCP port `443`.

  If only Stanford people will be authenticating, then you _might_ be able to
  get away with limiting this to only campus and VPN IPs (that is, to the "SU
  All Nets" listed in [Stanford Network
  Numbers](https://uit.stanford.edu/guide/lna/network-numbers)).

If you also filter outbound traffic, you need to open the following ports:

* To _any IP address, in any zone_, on all TCP and UDP ports from `50000` up to
  and incuding `51000`.

  Again, it is important that the _entire range_ be opened up.

* To `52.84.0.0/15` (in the `untrust` zone), on port 443.

  This is the AWS CloudFront IP range which hosts
  [downloads.globus.org](https://downloads.globus.org).  It needs to be open
  long enough for software packages to be downloaded.

* To `54.237.254.192/29` (in the `untrust` zone), on port 443.

  This is where Globus' API servers live in AWS.  Globus Connect Server
  communicates back to Globus during endpoint setup and maintenance.

<i class="fas fa-clipboard-list"></i> For this planning item, you need answers
to the following questions:

1. Do I need a public IP address for my server?

2. Do I need to put the server behind a network firewall, or can I rely on just
   the host-based firewall?

3. Which firewall rules will I need to request/implement?

<i class="fas fa-clipboard-check"></i> *Congratulations!*  You now have your
firewall configuration ready.

&nbsp;

# Access Control

Using the authentication method (which you should have already chosen), Globus
translates a person's Globus identity into a local account.  Once the local
account has been identified, two methods are used to check for access:

* *The OS*: Globus respects the Operating System's fine-grained access-control
  infrastructure.

* *Globus Path Restrictions*: You may specify a simple list of paths that are
  read-only, read-write, or blocked for all users.

In order for a user to read or write at a path, **both OS and Globus
restrictions must allow it**.

Globus path restrictions are defined as a string of comma-separated
permissions, which may be empty.  If no Globus path restrictions are set (if
the string is empty), then everything is allowed, and access will depend solely
on the Operating System's access-control.

On the other hand, if you define _any_ path restrictions, then Globus' path
restrictions become _deny-by-default_.

You either need to decide to not implement any path restrictions, or you need
to decide what paths a Globus user will be allowed to read or write to.

Here is an example path restriction string:

`N/etc,N/usr,R/,N/tmp,N/var,RW/home`

Each restriction item has three components:

* An `R` (for "read-only"), `RW` (read-write), or `N` (explicit deny).

* A tilde (`~`), or a forward-slash (`/`); indicating that the restriction is
  relative to the authenticated user's home directory, or the root directory,
  respectively.

* Optionally, a more-specific path, which can contain `*` (for simple wildcard
  matching).

Permissions on directories automatically inherit the permissions of the parent
directory.  The order in which entries appear does not matter.

In the above example, Globus will allow read-write access to home directories;
and read-only access to all other directories *except for* `/etc`, `/usr`,
`/tmp`, and `/var`; access to those is completely blocked.

Here is another example path restriction string:

`RW/scratch,RW/oak/stanford,N~/.*,RW~`

In this example, read-write access is allowed to `/scratch` and
`/oak/stanford`.  Read-write access is also allowed to home directories,
_except for_ files in a home directory that begin with a dot.  All other
directories (such as `/tmp`) are blocked, due to the deny-by-default nature of
the path restrictions.

<i class="fas fa-clipboard-list"></i> For this planning item, you need answers
to the following questions:

1. Am I OK relying on just the OS for access-control decisions, or do I need to
   implement more on top of them?

2. If I want to set path restrictions, what will they be?

<i class="fas fa-clipboard-check"></i> *Congratulations!*  Your access control
regime has been defined.

&nbsp;

# Sharing

Sharing is one of the most powerful features provided by Globus Connect Server
endpoints, and is one of the features enabled by our campus-wide subscription.

Sharing allows an authenticated user to create a new endpoint (a "shared
endpoint").  In this new endpoint, the root directory is a directory that the
authenticated user can access through the Globus Connect Server endpoint.  The
owner of the shared endpoint (the authenticated user) sees this as a
directory on your Globus Connect Server endpoint; to the shared endpoint's
users, they see the directory as the root of the endpoint.

For example, if you have an endpoint connected to your lab's storage, and you
want a directory to be accessible by collaborators at other institutions, one
of your users can create a shared endpoint rooted in that directory.  You can
give some collaborators read access, and others write access.  Your lab members
will continue to use the lab's Globus Connect Server endpoint, while your
collaborators use the new shared endpoint.

Shared endpoints (or parts thereof) can also be public, allowing anyone access
to a directory you specify, so long as they can log in to Globus.

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

When deciding to enable sharing, you must decide if you want to restrict which
paths may be shared.

Sharing path restrictions are expressed as a Globus path restriction string.
By default, any paths which an authenticated user may access may be shared.
However, you may set limits on which directories may be shared.  In addition,
you may decide if the shared endpoint's users may only have read access (even
if the shared endpoint owner wanted to grant write access).

{% include info-box.html
   header="Other restrictions still apply"
   content="The sharing restrictions does not override the Globus path restrictions string, nor does it override OS permissions.  For example, if you allow write access to a path for sharing, but that path is restricted to read-only elsewhere, then only read-only sharing will be possible."
%}

In addition to restricting the sharing of paths, you may also control which
local users and groups are allowed to share.

To determine if a user is allowed to create a shared endpoint, Globus Connect
Server executes the following steps ('user' and 'group' refer to local users
and groups on the system; read down the list until you get a "blocked" or
"allowed" result):

1. If a user is explicitly denied, then the user is blocked from sharing.  If
   not, then continue evaluation.

2. If a user a member of a group that is explicitly denied, then the user is
   blocked from sharing.  If not, then continue evaluation.

3. If there are no explicitly-allowed users or groups, then the user is allowed
   to share.  Otherwise, continue evaluation.

4. If the user is explicitly allowed, then the user is allowed to share.  If
   not, then continue evalation.

5. If the user is a member of a group that is explicitly allowed,
   then the user is allowed to share.  If not, then continue evalation.

6. The user is blocked from sharing.

You can also think about it in terms of "deny-by-default" and
"allow-by-default":

* Anyone who is explcitly denied is always blocked.

* Sharing is normally allow-by-default.

* If _anyone_ (user or group) is explicitly allowed, then sharing becomes
  deny-by-default.

<i class="fas fa-clipboard-list"></i> For this planning item, you need answers
to the following questions:

1. Should sharing be enabled?  If no, skip the remaining questions.

2. What path restrictions should be in place for sharing (if any)?

3. Should I allow only specific local users or groups to share?  If yes, then
   whom?

4. Should I explicitly block specific local users or groups from sharing?  If
   yes, then whom?

<i class="fas fa-clipboard-check"></i> *Congratulations!*  You have finished
defining your sharing regime.

Once packages are installed, you are ready for [initial configuration]({{
"server/configure.html" | relative_url }})!

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
