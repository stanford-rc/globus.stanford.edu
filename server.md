---
layout:      left-sidebar
title:       Globus Connect Server
title_line:  false
description: Main page for Globus server information.
---

# Globus Connect Server

<b>Globus Connect Server</b> is the name of the software.  It is
meant to be installed on multi-user machines, and on machines where multiple
users have data (even if they can not log in directly).

{% include info-box.html
   icon="arrow-right"
   header="Linux Only"
   content="Globus Connect Server is only available for Linux systems.  Software is available for the Debian/Ubuntu, Red Hat/CentOS/Fedora/Scientific, and SuSE Linux distributions."
%}

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
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
Installation]({{ "server/install.html" | relative_url }}) guide for information
on how to prepare your system, and how to install Globus Connect Server.

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
