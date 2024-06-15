---
layout:  post
news: true
toc: false
title:       Download Globus Connect Personal 3 for Improved TLS Support
excerpt:     Globus Connect Personal version 3 includes a security improvement, and should be downloaded by anyone working with Moderate Risk data.  It's an easy upgrade!
---

Globus Connect Personal comes in two flavors, version 2 and version 3.  You
probably already have version 2 installed right now!  Before today, it was the
default version that is downloaded when you set up a new Globus Connect
Personal endpoint.

But Globus also has version 3, which brings an important feature: Globus
Connect Personal version 3 requires TLS 1.2 or later.  This mirrors the changes
that are being made for [web browsers and
servers](https://blog.qualys.com/ssllabs/2018/11/19/grade-change-for-tls-1-0-and-tls-1-1-protocols).
Even more specialized users, like for [credit-card
processing](https://blog.pcisecuritystandards.org/are-you-ready-for-30-june-2018-sayin-goodbye-to-ssl-early-tls)
and Stanford's own [MaIS
services](https://uit.stanford.edu/service/registry/tls-upgrade), now require
at least TLS 1.1 or later.

## What do you need to do?

If you are installing Globus Connect Personal for the first time, you don't
need to do anything special!  Simply follow [our
instructions](/client/install.html), and you will get version 3.

If you already have Globus Connect Personal installed, the upgrade is easy.
There are three steps:

1. Quit Globus Connect Personal.

2. Download version 3.

3. Install version 3.

That's it!  The installation process will upgrade your existing Globus Connect
Personal endpoint, so no information is lost.

Here are links to download Globus Connect Personal version 3:

* For [macOS](https://downloads.globus.org/globus-connect-personal/v3/mac/stable/globusconnectpersonal-3-latest.dmg)

* For [Windows](https://downloads.globus.org/globus-connect-personal/v3/windows/stable/globusconnectpersonal-3-latest.exe)

* For [Linux](https://downloads.globus.org/globus-connect-personal/v3/linux/stable/globusconnectpersonal-3-latest.tgz)
