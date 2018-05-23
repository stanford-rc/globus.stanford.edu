---
layout:      left-sidebar
title:       Globus Connect Server 5
title_line:  false
description: Main page for Globus server information for versions 5.1 and later.
---

# Globus Connect Server 5

{% capture construction %}
<h2>Under Construction</h2>
<p>Globus Connect Server 5 is still new, and issues are still being worked out.
Unless someone in Stanford Research Computing has said that you should use
Globus Connect Server 5, then please 
<a href="{{ "server.html" | relative_url }}" title="Globus Connect Server">
use GCS 4 instead</a>.
</p>
{% endcapture %}
{% include info-box.html
   icon="wrench"
   raw=construction
%}

**Globus Connect Server** is software that is meant to be installed on
multi-user machines, and on machines where multiple users have data (even if
they can not log in directly).

New in Globus Connect Server 5 and later, Globus Connect Server takes on the
role of a *collection provider*.  One instance of Globus Connect Server is able
to serve 

{% include info-box.html
   icon="arrow-right"
   header="Up-To-Date Linux Only"
   content="Globus Connect Server 5 is only available for the latest version of certain distributions.  The only supported distributions/versions are Debian 9 (Stretch), RHEL/CentOS 7, and Ubuntu 16.04 LTS."
%}

{% include info-box.html
   icon="lock-open"
   header="No High Risk Data"
   content="Globus may only be used at Stanford with Low or Medium Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

Globus Connect Server requires:

* A Public IP address.

  Even if you are only doing data transfer within Stanford, your system must be
  able to accept unsolicited connections from Globus.

* Preferably, a server that you can dedicate to doing data transfer.

  Even with a single transfer, if configured appropriately, Globus will happily
  saturate a Gigabit or 10 Gigabit link.

Once you have the above items, you should read the [Site Prep and
Installation]({{ "server5/install.html" | relative_url }}) guide for information
on how to prepare your system, and how to install Globus Connect Server.

{% include left-sidebar/transition.md %}

{% include toc.html id="server5" %}
