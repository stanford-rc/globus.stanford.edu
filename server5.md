---
layout:      page
toc:  false
title:       Globus Connect Server
see-also: true
id: server5
description: Main page for Globus server information for versions 5.4 and later.
permalink: server5.html
---


**Globus Connect Server** is software that is meant to be installed on
multi-user machines, and on machines where multiple users have data (even if
they can not log in directly).  Users can access their files through *Mapped
Collections*, and can create *Guest Collections* to share with others who do
not have access.

Globus Connect Server natively supports transferring data to other Globus
Connect Server collections, as well as to [Globus Connect Personal]({{
"client.html" | relative_url }}) (like the one which might be running on your
laptop right now).  Globus Connect Server also supports transferring data
through a user's web browser, though it is not fast.

{% include info-box.html
   icon="wrench"
   header="Under Construction"
   content="This section is currently under construction.  Not all GCSv5-related pages are published yet.  Once the section's content is finalized, this notice will be removed.  Apologies for the dust!"
%}

{% include info-box.html
   icon="lock-open"
   header="No High Risk Data"
   content="Globus may only be used at Stanford with Low or Medium Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

{% capture gcsv4 %}
<h4>Looking for Globus Connect Server version 4?</h4>

<p>Globus Connect Server version 4 was deprecated in 2023: It stops receiving
non-security updates on August 1, and GCSv4 endpoints will stop working
entirely on December 18.  Refer to the <a href="{{
"2023/07/07/gcsv4-deprecation.html" | relative_url }}" title="Globus Connect
Server version 4 Ends in December 2023">news post</a> for more information.</p>

<p>The old Globus @ Stanford documentation <a href="{{ "server.html" |
relative_url }}" title="Globus Connect Server version 4">is still
available</a>, though it is not being maintained.</p>

{% endcapture %}
{% include info-box.html
   icon="ghost"
   raw=gcsv4
%}

Globus Connect Server requires:

* A supported Linux distribution *that still receives vendor support*.

  Globus Connect Server 5 supports running on Debian, Fedora, OpenSUSE Leap,
  Red Hat Enterprise Linux 7 through 9, SuSE Enterprise, and Ubuntu.

  For Enterprise Linux derivatives, Globus Connect Server 5 supports CentOS 7,
  8 Stream, and 9 Stream.  Also supported are versions 8 & 9 of Alma, Oracle,
  Rocky, and Springdale Linux.

  If you use Red Hat Enterprise Linux (including derivatives), you should
  expect to pull some packages from EPEL.

* A Public IP address.

  Even if you are only doing data transfer within Stanford, your system must be
  able to accept unsolicited connections from Globus HQ, running in the Cloud.

* Preferably, a server that you can dedicate to doing data transfer.

  Even with a single transfer, if configured appropriately, Globus will happily
  saturate a Gigabit or 10 Gigabit link.

Once you have the above items, you should read the **Terminology Guide**, as
GCSv5 brings some new terms compared to GCSv4 (unfortunately, this page does
not exist yet).  After that, you should read the
**Pre-Installation Planning** guide to prepare your environment for GCSv5.
