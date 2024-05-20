---
layout:      page
toc:  true
title:       Globus Connect Server version 4 ufw Configuration

description: Instructions on how to configure ufw to work with Globus Connect Server version 4.
---

If you are running a Linux distribution that includes ufw, you can use a few
simple commands to configure the firewall.

{% include info-box.html
   icon="ghost"
   header="Globus Connect Server version 4 ends in December 2023"
   content="Globus Connect Server version 4 has been deprecated, and will stop working at the end of 2023.  This page is no longer being updated.  For more information, see the news post on the home page."
%}

Each of the commands below assumes you are running them as root.  If you are
running these commands as a non-root user, prefix each command with `sudo`.

## Firewall Rules

1. Begin by allowing anyone to connect to open GridFTP data ports:

   `ufw allow proto tcp to any port 50000:51000`

   `ufw allow proto udp to any port 50000:51000`

2. Allow Globus IPs to connect to the MyProxy port:

   `ufw allow in from 54.237.254.192/29 to any port 7512 proto tcp`

3. Allow access for GridFTP control traffic, from Globus only:

   `ufw allow in from 54.237.254.192/29 to any port 2811 proto tcp`

{% include info-box.html
   icon="question-circle"
   header="What about a port for OAuth?"
   content="If you are using OAuth authentication, then you will need a web server (on port 443) open to the world.  But since that web server is being provided by the Linux distribution's Apache package, it should take responsibility for configuring your firewall."
%}

No other commands should be needed, and the changes should take effect
immediately.

Your inbound firewall configuration is now complete!  You should now go back
and continue to the installation procedure.




