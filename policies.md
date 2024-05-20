---
layout:  post
title: Policies, Terms, and Privacy
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

  * HTTPS access (uploading and downloading files through a web browser) is
    unavailable.

  * Only access to local storage ("POSIX storage") is available.

Stanford's Globus subscription covers the following services:

* [Globus Plus](https://www.globus.org/researchers/plus-plans)

* [Globus Connect Server](https://www.globus.org/globus-connect-server),
  including all the features listed above.

* The premium connectors for Amazon S3 (including S3-compatible storage
  systems), Box, Ceph, Dropbox, Google Cloud Storage, Google Drive, HDFS, iRODS,
  Micosoft Azure Blob Storage, Microsoft OneDrive, Quantum ActiveScale, and
  Spectra BlackPearl.  Since Wasabi speaks the S3 protocol, Wasabi is also
  supported.

There are no limits on the above services.  You can have an unlimited number of
endpoints, make as many transfers as you want, and transfer as much data as you
want.

There are also some services provided by Globus, which are not currently
available:

* [Globus Premium Storage Connectors](https://www.globus.org/connectors),
  beyond the ones listed above.

  At this time, we do not have a license for the HPSS premium connector If you
  have one of these platforms and are interested in using Globus, please [reach
  out]({{ "support.html" | absolute_url }})!

Our subscription expires on May 25, 2024.  Continued funding by the University
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
For example, activating an endpoint (or attempting to activate an endpoint) may
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
data) involved in the transfer; the list of files and directories transferred;
and the ultimate result of the transfer.  Each endpoint may also log which
files were transferred.

If a cloud service is involved in a transfer, logs of API calls and transfer
operations may be recorded, either by the cloud service accountholder or by the
cloud service itself.

Logs generated on endpoints are kept by the endpoint administrators, who should
be contacted for details.  Logs generated by Globus are accessed by
[SRCC](https://srcc.stanford.edu/), who uses them to gather metrics on how
Globus is used at Stanford.  This is mainly used for capacity planning (making
sure endpoints have enough resources to keep up with data-transfer needs), and
also to justify continuing to pay for the subscription.

All information logged is handled in accordance with [Admin Guide Chapter
6](https://adminguide.stanford.edu/chapter-6).

# Other Policies & Agreements

**Only Low and Moderate Risk data may be accessed using Globus.**  Globus has
not been evaluated for handling data rated as High Risk.  As always, it is up
to the data owners to determine the [Risk
Classification](http://dataclass.stanford.edu/) for their data. 

Globus Connect Server and Globus Connect Personal services are made available
to us under the [Globus Terms of Service](https://www.globus.org/legal/terms),
and the Globus Customer Agreement negotiated between the University of Chicago
and Stanford on March 1, 2022.

The Globus Connect Server and Globus Connect Personal software—and included
components—are licensed under the terms listed on the [Globus Software
Agreement](https://www.globus.org/legal/software-license) page.

When you log in to Globus, your login is processed through
[CILogon](https://www.cilogon.org), whose [Privacy
Policy](https://www.cilogon.org/privacy) applies.

If you use Globus to interact with Amazon S3, that access is governed by the
[AWS Service Terms](https://aws.amazon.com/service-terms/), as modified by any
agreements made between Amazon Web Services and Stanford.

If you use Globus to interact with Box, that access is governed by the [Box
Terms of Service](https://www.box.com/legal/termsofservice), as modified by any
agreements made between Box and Stanford.

If you use Globus to interact with Dropbox, that access is governed by the
[Dropbox Terms of Service](https://www.dropbox.com/terms),
as modified by any agreements made between Dropbox and Stanford.

If you use Globus to interact with Google Cloud Storage or Google Drive, that
access is governed by the [Google Cloud Platform Terms of
Service](https://cloud.google.com/terms) or the [Google Drive Additional Terms
of Service](https://www.google.com/drive/terms-of-service/), respectively,
as modified by any agreements made between Google and Stanford.

If you use Globus to interact with Microsoft Azure Blob Storage or Microsoft
OneDrive, that access is governed by the agreements made between Microsoft and
Stanford.

If you use Globus to interact with Wasabi, that access is governed by the terms
on the [Wasabi Legal page](https://wasabi.com/legal/), as modified by any
agreements made between Wasabi Technologies and Stanford.

This web site is hosted on GitHub Pages, which has its own [terms of
service](https://help.github.com/articles/github-terms-of-service/) and
[privacy policy](https://help.github.com/articles/github-privacy-statement/).
