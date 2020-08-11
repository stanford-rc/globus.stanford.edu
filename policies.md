---
layout: wide
title: Policies & Agreements
---

<div class="well">
As is the case with many cloud services, one name (in this case, Globus) can
refer to many products.  This page spells out exactly what is available, who
can use it, and under what conditions.
</div>

# What is provided?

The following Globus services are available for free from Globus, without a
subscription:

* [Globus Connect Personal](https://www.globus.org/globus-connect-personal)

* [Globus Connect Server](https://www.globus.org/globus-connect-server),
  with the following limitations:

  * Transfer management and reports are unavailable.

  * Only local users may perform transfers — creating shares is disabled.

Stanford's Globus subscription covers the following services:

* [Globus Plus](https://www.globus.org/researchers/plus-plans)

* [Globus Connect Server](https://www.globus.org/globus-connect-server),
  managed (includes the unavailable features listed above)

There are no limits on the above services.  You can have an unlimited number of
endpoints, make as many transfers as you want, and transfer as much data as you
want.

There are also some services provided by Globus, which are not currently
available:

* [Globus Premium Storage Connectors](https://www.globus.org/connectors)

  These are add-ons that allow Globus to interact directly with non-POSIX
  data stores.  Connectors currently exist (or are planned) for Amazon S3, Box,
  Ceph RADOS, Google Drive, Hadoop HDFS HGST ActiveScale, HPSS, and Spectra
  Logic BlackPearl.

  Our subscription does not currently include support for any of these
  connectors.  We are looking for groups interested in helping cover the cost
  of licensing connectors for campus use.  If your group is interested, please
  [reach out]({{ "support.html" | absolute_url }})!

Our subscription expires on May 16, 2020.  Continued funding by the University
will depend on us demonstrating use of, and continued need for, the service.
So, please [keep in touch]({{ "support.html" | absolute_url }}).

# Who can use it?

The free Globus services can be used by anyone.  If you have a SUNetID, you
should feel free to use it to access Globus services.

Our Globus subscription covers everyone who reports up to the President.  The
complete list is best represented by the charts contained in [Admin Guide
Chapter 9](https://adminguide.stanford.edu/chapter-9).

The groups excluded from Stanford's Globus Subscription are:

* Carnegie Institution.

* Stanford Health Care.

* Stanford Children's Health.

* The SLAC National Accelerator Laboratory.

SLAC's exclusion is because, even though the SLAC Director and Vice President
do report to the President and/or Provost, Stanford operates SLAC on behalf
of the Department of Energy.

If you are a member of one of the above groups, we suggest leveraging any
relationships you have with one of the Seven Schools.  Should that fail, a
separate subscription would need to be negotiated.

Finally, Globus Plus is only available to people who have a full-service (or
full sponsored) SUNetID.  In other words, if you have Stanford email, then you
can use Globus plus!   If you do not have Stanford email, ask your Stanford
contact about getting a [full sponsored
account](https://uit.stanford.edu/service/sponsorship/sponsoredservices).

# Data Collection & Privacy

By using Globus, certain data are collected by Globus and by Stanford.  This
section talks about data collected by Stanford; the next section talks about
data collected by Globus.

Note that in this section, the word "endpoint" refers to Globus Connect Server
endpoints, as well as shared endpoints hosted by Globus Connect Server
endpoints, that are managed under Stanford's Globus subscription.

When you perform any operation involving an endpoint, something may be logged.
For example, activating an endpoint (or attempting to activat an endpoint) may
log details of the attempt.  For MyProxy and MyProxy OAuth authentications,
those logs will exist on the MyProxy (or MyProxy OAuth) server.  For CILogon
authentications, those logs will exist with CILogon.  Also, for all
authentication methods, Globus will have a record of the endpoint activation,
because Globus holds the credentials related to the endpoint activation.

When you perform metadata-related activities involving an endpoint (such as
doing a directory listing), logs of the activity may be generated on the
endpoint where the activity is taking place.

When you perform a transfer between endpoints, it is logged in three places.
First, Globus keeps a log of the transfer.  The log includes the identity of
the person initiating the transfer; the identity of each endpoint; the date &
time that the transfer started and ended; the number of files (and amount of
data) involved in the transfer; and the ultimate result of the transfer.  Each
endpoint may also log exactly which files were transferred.

Logs generated on endpoints are kept by the endpoint administrators, who should
be contacted for details.  Logs generated by Globus are accessed by SRCC, who
uses them to gather metrics on how Globus is used at Stanford.  This is mainly
used for capacity planning (making sure endpoints have enough resources to keep
up with data-transfer needs), and also to justify continuing to pay for the
subscription.

All information logged is handled in accordance with [Admin Guide Chapter
6](https://adminguide.stanford.edu/chapter-6).

# Other Policies & Agreements

**Only Low and Moderate Risk data may be accessed using Globus.**  Globus has not
been evaluated for handling data rated as High Risk.  As always, it is up to
the data owners to determine the [Risk
Classification](http://dataclass.stanford.edu/) for their data. 

Globus Connect Server and Globus Connect Personal are licensed under the terms
described on the [Globus Software Agreement
page](https://www.globus.org/legal/software-license).

There may be other legal terms from Globus; you can see the complete list in
the [Globus Legal page](https://www.globus.org/legal).

This web site is hosted on GitHub Pages, which has its own [terms of
service](https://help.github.com/articles/github-terms-of-service/) and
[privacy policy](https://help.github.com/articles/github-privacy-statement/).
