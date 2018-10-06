---
layout:      left-sidebar
title:       Globus Connect Personal
title_line:  false
description: Main page for Globus client information.
---

# Globus Connect Personal

**Globus Connect Personal** is the name of the software used to create Globus
Connect Personal endpoints, for sharing files with other users.  It is meant to
be installed on machines that Stanford classifies as _endpoints_,
machines that are used primarily by one person (such as desktops and laptops).

{% include info-box.html
   icon="arrow-up"
   header="Windows Welcome"
   content="Globus Connect Personal works on all current, vendor-supported versions of Windows, macOS, and Linux."
%}

{% include info-box.html
   icon="globe"
   header="No SUNetID Required"
   content="Globus Connect Personal does not require a SUNetID, so it can be used by anyone, even if their institution does not have a Globus subscription."
%}

{% include info-box.html
   icon="lock-open"
   header="No High-Risk Data"
   content="Globus may only be used at Stanford with Low or Medium Risk data.  Please do not install this software on systems which have access to any form of High Risk data (including PCI and PHI data)."
%}

Globus Connect Personal does not require a dedicated or public IP address.  It
will work even behind a firewall (or home router), as long as you can make
outbound connections to certain ports on the outside Internet.

{% include info-box.html
   icon="hand-paper"
   header="Blocked?  Try the VPN"
   content="If you are at a location that limits outside connectivity (such as a hotel), try using the <em>Full Traffic (non-split-tunnel)</em> <a href=\"https://uit.stanford.edu/service/vpn\">VPN</a> to bypass the block." %}

To begin, read the [Install and Activate](client/install.html) guide for
instructions on how to set up Globus Connect Personal on your desktop or
laptop.

{% include left-sidebar/transition.md %}

{% include toc.html id="client" %}
