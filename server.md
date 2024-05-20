---
layout:      page
toc:  true
title:       Globus Connect Server version 4

description: Main page for Globus server information, for the deprecated version 4.
---

# Globus Connect Server version 4

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server v4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

<b>Globus Connect Server</b> is the name of the software used to create Globus
Connect Server endpoints, for allowing multiple users to access their files on
a server (or the server's connected storage).  It is meant to be installed on
multi-user machines, and on machines where multiple users have data (even if
they can not log in directly).

{% include info-box.html
   icon="arrow-right"
   header="Linux Only"
   content="Globus Connect Server is only available for Linux systems.  Software is available for the Debian/Ubuntu, Red Hat/CentOS/Fedora/Scientific, and SuSE Linux distributions."
%}

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Moderate Risk data.
   Please do not install this software on systems which have access to any form
   of High Risk data (including PCI and PHI data)."
%}

Globus Connect Server requires:

* A Public IP address.

  Even if you are only doing data transfer within Stanford, your system must be
  able to accept unsolicited connections from Globus.

  It is actually possible to use Globus Connect Server with a private IP
  address (for example, Globus Connect Server running on an EC2 instance).
  In this case, you must still have access to a public IP address, which is
  able to NAT the ports Globus needs.

* Preferably, a server that you can dedicate to doing data transfer.

  Even with a single transfer, if configured appropriately, Globus will happily
  saturate a Gigabit or 10 Gigabit link.

Once you have the above items, you should read the [Pre-Installation Planning]({{ "server/pre-install.html" | relative_url }}) guide for information
on how to prepare your system, and how to install Globus Connect Server.




