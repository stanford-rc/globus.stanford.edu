---
layout:  post
news: true
toc: false
title:       Windows users, update Globus Connect Personal for long-path support.
excerpt:     Windows has issues with long file paths, and that causes issues with Globus, until now!  Read on for information on how to enable long-path support.
---

On Windows, most operations on files have a limitation known as "MAX\_PATH":
Windows paths have a long-standing maximum length of 260 characters, measured
from the start of the path (`C:\`, `D:\`, etc.), up to and including the file
extension.

Most users do not encounter problems with MAX\_PATH limits.  But for folks
working with large data sets—particularly in areas like genomics—you may have
experenced MAX\_PATH issues.

In Globus, MAX\_PATH issues do not show up directly in error messages.
Instead, Globus will report file-not-found, not-a-directory, or checksum-failed
errors.  In all cases, the file path will be very long, indicating the problem
is likely due to the MAX\_PATH limit.

As of Globus Connect Personal 3.2.7, **this limit can now be increased**,
supporting paths up to 4,096 characters in length.  To enable long-path
support, do two things:

First, **Upgrade Globus Connect Personal**.  Right-click on the Globus toolbar
icon, and select "Check for Updates".  If 3.2.7 is not installed, you will be
prompted to upgrade.

{% include hero-image.html
   src="/assets/client/GlobusConnectPersonalToolbarPop-Up.png"
   alt="The pop-up menu that appears when right-clicking on the Globus icon in the toolbar"
   caption-overlay=true
   caption-header="Globus Connect Personal toolbar pop-up"
   caption-text=""
%}

Next, [follow the instructions]({{ "/client/install.html" | relative_url }}) to
configure your machine for long-path support.

{% include info-box.html
   icon="sticky-note"
   header="This update is Windows only!"
   content="On macOS and Linux, Globus Connect Personal already has the longer path limit.  So if you are on macOS or Windows, congraulations: You don't need to do anything!"
%}
