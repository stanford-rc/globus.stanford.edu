---
layout:      no-sidebars
title:       Support
title_line:  false
description: How to get help using Globus at Stanford.
---

# How Can We Help You?

The support available depends on the kind of problem you are having:

* [Problems with your account](#accounts).  This includes problems logging in
  to the Globus web site.

* [Problems on your personal machine](#client).  This includes downloading and
  installing Globus Connect Personal onto your desktop or laptop, as well as
  using Globus Plus.

* [Problems with someone else's endpoint](#external).  This is for when you are
  trying to do something with someone else's endpoint (like transfer a file, or
  view the contents of a directory).

* [Problems with your server endpoint](#server).  This includes anything to do
  with Globus Connect Server setup and operation.

* Problems with your shared endpoint.  If you are having a problem with a
  shared endpoint you own, you should contact the owner of the host endpoint.
  See [_Problems with someone else's endpoint_](#external).

* [Software development problems](#dev).  This includes problems you are having
  with the Globus REST API, or the Java or Python SDKs.

## Office Hours

If you would like to talk to someone in person, there are a few places on
campus where this is available.

* **FarmShare and Sherlock office hours**.  The Stanford Research Computing
  Center hosts office hours for FarmShare and Sherlock computing environments,
  and there is normally at least one staffer available who is able to help with
  Globus issues.

  FarmShare office hours are once a week for two hours, Autumn,
  Winter, and Spring.  The specific day and time changes every quarter.
  
  Sherlock office hours are on Tuesday and Thursday throughout the calendar
  year, except for Winter Close.
  
  Refer to the
  [SRCC web site](https://srcc.stanford.edu/office-hours-and-support/support)
  for specific information on hours and locaions.

<a name="local"></a>
## Local Support Contacts

In order to increase responsiveness to tickets, and ease the load on any one
group, support for Globus has been spread out across several groups on campus.

If you need to reach out to someone at Stanford for support, first see if your
group, Department, or School is on this list:

* If you are affiliated with SUL, you should contact
  [DLSS](https://library.stanford.edu/department/digital-library-systems-and-services-dlss)
  for support.

If none of the above local support contacts apply to you, then you should
[contact SRCC](mailto:srcc-support@stanford.edu).

{% include info-box.html
   icon="clock"
   header="Support is Business-Hours Only"
   content="Globus support is provided during business hours during the calendar year, excluding Stanford holidays and Winter Close.  Some groups may also operate on a reduced schedule during breaks, and during Summer quarter."
%}

[\[back to top\]](#content)

<a name="external"></a>
## Problems with Someone Else's Endpoint

Sometimes, you might be having problems with someone else's endpoint.  For
example, you might be unable to transfer a file, even though you think you
should be able to.

The best way to get help is to reach out to the endpoint owner
directly.  To do that, look at the endpoint's information page.

{% include hero-image.html
   src="assets/server/Endpoint Overview.png"
   alt="A Globus endpoint's 'Overview' page, showing endpoint details"
   caption-overlay=true
   caption-header="Endpoint overview"
   caption-text=""
%}

In the endpoint's information page, there should be a _Contact E-mail_.  That
is who you should email for assistance.

If no contact email is listed, or the email address did not work, then what you
should do depends on if the endpoint is a Stanford endpoint.

{% capture endpoints-list %}
<p>If an endpoint's <em>Owner</em> is on the following list, it is a
Stanford University endpoint:</p>
<ul>
  <li>scgpm@globusid.org</li>
  <li>srcc@globusid.org</li>
  <li>stanfordlibraries@globusid.org</li>
  <li>stanford@globusid.org</li>
</ul>
{% endcapture %}
{% include info-box.html
   raw=endpoints-list
%}

If the endpoint is a Stanford endpoint, and there is no contact information,
please [let us know](mailto:srcc-support@stanford.edu).  Your email should
include as much information about the endpoint as possible.  The UUID—which
you can find on the endpoint's information page—is especially helpful, because
that is an endpoint's unique identifier.  You should also
tell us what information is missing.  We will figure out who owns the endpoint,
ask them to update their contact information, and let them know about your
problem.

If the endpoint is _not_ a Stanford endpoint, then unfortunately there is not
much we can do to help.  Instead, you should go back to the person, group, or
web site who referred you to the endpoint.  Let them know about the problems
your were experiencing, and where you got the instructions you were following.

[\[back to top\]](#content)

<a name="accounts"></a>
## Account Problems

If you have questions or problems regarding Globus accounts, the first thing
you should do is read the page [About Globus Accounts]({{ "accounts.html" |
relative_url }}).  That page has an overview of Globus identities, and how one
person can have multiple identities, all linked together.

If you need information on how to create an account, [we have a page for
that]({{ "accounts/create.html" | relative_url }}).

If you are able to log in to Globus, but you constantly have to log out and log
in with different email addresses and passwords, then you probably need to
[link your identities]({{ "accounts/link.html" | relative_url }}).

If you aren't sure about what to do when you are getting ready to leave
Stanford, [we have a page for that, too]({{ "accounts/leaving.html" |
relative_url }})!

If you are still having issues, reach out to your [local support
contact](#local).  When you reach out, please tell us what you are trying to
do, the problems you are having (error messages and screen shots are helpful!),
and what goal you are trying to achieve.

[\[back to top\]](#content)

<a name="client"></a>
## Problems With Your Computer

TBD!

The next place to go for help is the Globus [User Discuss
list](https://groups.google.com/a/globus.org/forum/#!forum/user-discuss/home).
This is a Google group, which you can join using your Stanford University
Google account, or (if you have one) your personal Google account.  Other
users, as well as Globus staff, monitor this list.

If all else fails, reach out to your [local support contact](#local).  When you
reach out, please tell us what you are trying to do, the problems you are
having (error messages and screen shots are helpful!), and what goal you are
trying to achieve.

[\[back to top\]](#content)

<a name="server"></a>
## Server Problems

This is probably the most complicated area, because Globus Connect Server can
be set up in so many ways.

First of all, if you made _any_ changes to server-side configuration in
`/etc/globus-connect-server.conf`, you will need to re-run
`globus-connect-server-setup` for those changes to take effect.

If you do make a change that involves running `globus-connect-server-setup`,
existing transfers and shares might be disrupted.  You should pause and unpause
all transfers, and ask shared endpoint owners to make sure their shared
endpoints are still working.

{% include info-box.html
   icon="exclamation-triangle"
   header="Changing encryption silently kills transfers."
   content="If you endable encryption on an endpoint that did not have encryption before, all active transfers will silently start failing, and will time out after a day or so.  In that case, you should cancel all in-progress transfers after enabling encryption."
%}

If clients are having problems connecting, or Globus itself is having problems
connecting to your sever, first make sure your server's [initial
configuration]({{ "server/configure.html" | relative_url }}) is OK
(particularly the parts about the firewall).  You should also make sure that
your host's information is correct in public DNS.

If users are having problems authenticating, you should check that your
[authentication configuraion]({{ "server/auth.html" | relative_url }}) is
correct.  If it is, then consult `/var/log/messages` (or `/var/log/syslog`),
`/var/log/gridftp.log`; and possibly also `/var/log/myproxy.log` (for legacy
MyProxy auth) or your web server's error log (for MyProxy OAuth) for clues.

The next resource to check is Globus' [Globus Connect Server Installation
Guide](https://docs.globus.org/globus-connect-server-installation-guide/).
This guide is the generic guide that applies to all users.

The next place to go for help is the Globus [Admin Discuss
list](https://groups.google.com/a/globus.org/forum/#!forum/admin-discuss/home).
This is a Google group, which you can join using your Stanford University
Google account, or (if you have one) your personal Google account.  Other
sysadmins, as well as Globus staff, monitor this list.

If all else fails, reach out to your [local support contact](#local).  When you
reach out, please tell us what you are trying to do, the problems you are
having (error messages and screen shots are helpful!), and what goal you are
trying to achieve.

[\[back to top\]](#content)

<a name="dev"></a>
## Software Development Support

If you are developing software that interacts with Globus, you should always
have the [Globus API documentation](https://docs.globus.org/api/) close at
hand.  That is the first place to go, when you are unsure about the details of
the API.  In particular, if you are working with the Java or Python SDKs, you
should always consult the REST API documentation to get full details on API
operations (most of the time, SDK documentations will refer you to the REST API
docs).

Your next destination should be the [Developer
Discuss](https://groups.google.com/a/globus.org/forum/#!forum/developer-discuss/home)
list.  This is a Google group, which you can join using your Stanford
University Google account, or (if you have one) your personal Google account.
Other developers, as well as Globus staff, monitor this list.

If you find a problem with the API, where it does something that should not
happen, you should [email us](mailto:srcc-support@stanford.edu), so that we can
get a ticket opened directly to Globus.  When you report your issue, there is
some information that you _must_ include:

* A pointer to the API operation that is having a problem.  That includes the
  name of the operation, and a URL to the API's [documentation
  page](https://docs.globus.org/api).

* A _reduced test case_.  This is a script or program, which takes a
  Globus client ID (and if appropriate, a client secret) and is able to
  reproduce the problem in as few steps as possible.

  When you submit your reduced test case, you should have some **temporary**
  Globus credentials hard-coded in the test case.  You should create a fresh
  client ID and client secret, which you can delete once your problem has been
  resolved.

With that information, we will let you know if any information is missing, and
then open a case with Globus!
