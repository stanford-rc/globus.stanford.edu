---
layout: post
news: true
toc: false

title: "macOS 27 & Globus Connect Personal"
excerpt: Globus Connect Personal works in macOS 27, with full Apple Silicon support coming soon.
---

This week, in their annual Worldwide Developers Conference, Apple announced
macOS 27 Golden Gate.  They also announced future plans that will affect Globus
Connect Personal.  If you install the macOS 27 Beta, you will see a warning
about support ending for Intel-based apps, and that Globus Connect Personal
will not open in a future release of macOS.

This is a valid warning.  Parts of Globus Connect Personal use code that is
written for Intel-based Macs.  Today, macOS on Apple Silicon uses Rosetta to
run that code.  Rosetta has been deprecated in macOS 27, with full removal
planned for macOS 28, hence the warning.

Globus are aware of the issue.  Globus began the transition with Globus Connect
Personal 3.2.5.  A future release of Globus Connect Personal will bring
full Apple Silicon compatibility.

## What is Rosetta?

[Rosetta 2](https://en.wikipedia.org/wiki/Rosetta_%28software%29) is a software
created by Apple in 2020, which allows software written for Intel Macs to run
on Apple Silicon hardware.  Rosetta 1, created in 2006, did the same thing when
Mac OS X on Power PC hardware transitioned to macOS on Intel hardware.

Rosetta 1 support ended in 2011, when Mac OS X 10.7 Lion was released.  Rosetta
2 support will end when macOS 28 is released.

## Globus supports Apple Silicon already?

In the [Globus Connect Personal release
notes](https://docs.globus.org/globus-connect-personal/changes/), there is a
note about native Apple Silicon support.  This update introduced support for
Apple Silicon, but that is not the complete story.

Although Globus Connect Personal looks like one app, it is made up of several
components:

* The program which handles initial registration of your Globus Connect
  Personal Endpoint;

* The program which displays the Globus Connect Personal menu icon,
  preferences, etc.;

* GridFTP, the software that handles data transfer; and

* The relaytool, which makes an SSH-based connection from your computer back to
  Globus HQ, so that directory listings, transfer instructions, etc. can be
  received for processing by GridFTP.

At this time, only GridFTP has Apple Silicon code.

## When will full Apple Silicon support be available?

Globus Support has confirmed that a full Apple Silicon version will be released
soon.

When a full Apple Silicon version is released, the [Globus Connect Personal
release notes](https://docs.globus.org/globus-connect-personal/changes/) will
be updated.  Once a release is available, the next time Globus Connect Personal
is started, it should prompt you to upgrade.

In Globus Connect Personal today, GridFTP is a [universal
binary](https://en.wikipedia.org/wiki/Universal_binary), containing code for
both Intel and Apple Silicon processors.  Even if you are running macOS on
an Intel machine, you should still plan on upgrading to the latest Globus
Connect Personal version when it is released.

## What do you need to do now?

If you plan on installing the macOS 27 Golden Gate Beta, be prepared to see the
warning about Globus Connect Personal.  You should also watch the [macOS at
Stanford](https://uit.stanford.edu/service/helpdesk/macos) page, where
University IT will report any issues that are found when testing [Essential
Stanford Software](http://ess.stanford.edu/) for compatibility with macOS 27
Golden Gate.

If you are running macOS 14 Sonoma, macOS 15 Sequoia, or macOS 26 Tahoe, you
don't need to do anything special: The latest version of Globus Connect
Personal is 3.2.8, which you should already be running.  If you are running an
older version, restart Globus Connect Personal and it should prompt to upgrade.
If you do not get a prompt to upgrade, you can find the latest version of
Globus Connect Personal at
[https://app.globus.org/collections/gcp](https://app.globus.org/collections/gcp).

If you are running an older version of macOS, you should also continue
upgrading Globus Connect Personal when prompted, but be prepared for a future
where the latest Globus Connect Personal stops working.  [macOS 13 became
non-compliant on February 12](https://uit.stanford.edu/guide/sunset-schedule),
so you should already be planning on a macOS upgrade.

If you are running macOS on Intel hardware, macOS 27 will be the last version
of macOS which supports your hardware.  You should start planning a hardware
upgrade.
