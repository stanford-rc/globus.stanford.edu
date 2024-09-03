---
layout:      page
toc:  true
title:       Installing Globus Connect Personal
id: client
description: Installation instructions for the Globus client.
permalink: /client/install.html
see-also: true
---

Before you start working with Globus Connect Personal, you will need to have
logged in to Globus.  [Read more about Globus accounts]({{ "accounts.html" |
relative_url }}); and, if you don't have one already, [create your Globus
account]({{ "accounts/create.html" | relative_url }}).

{% capture non-stanford-globus %}
If you already have access to Globus, using a non-Stanford account, you should
<a href="{{ "accounts/link.html" | relative_url }}" title="Link Identities">
link your Stanford identity</a>.  You should also consider <a href="{{
"accounts/unlink.html#demote" | relative_url }}" title="Unlink or Demote
Identities">demoting your non-Stanford identity</a>.
{% endcapture %}
{% include info-box.html
   icon="university"
   header="Already have a non-Stanford Globus account?"
   content=non-stanford-globus
%}

{% include info-box.html
   icon="desktop"
   header="Admin Access Required"
   content="You will need administrative access to your machine in order to install Globus Connect Personal.  If you do not normally have access to install software, talk to your IT contact before you proceed."
%}

{% include info-box.html
   icon="globe"
   header="Network Access Required"
   content="Globus Connect Personal needs to be able to make outbound Internet connections.  If Globus Connect Personal reports problems connecting, talk to your IT contact.  Connections must be allowed out to 54.237.254.192/29 port 2223 (for control traffic), and to any Internet host on TCP and UDP ports 50000-51000 (for data transfer).  Connections must also be allowed to AWS S3 on TCP port 443 (HTTPS), for the new version check to succeed."
%}

Once you have logged in to Globus, you may begin to install Globus Connect
Personal.

## Install Globus Connect Personal

Globus have written a set of detailed installation guides explaining how to
install Globus Connect Personal:

* [Install Globus Connect Personal for **macOS**](https://docs.globus.org/how-to/globus-connect-personal-mac/)

  Globus Connect Personal runs on Mac OS X Mavericks (10.9) and later.

* [Install Globus Connect Personal for **Windows**](https://docs.globus.org/how-to/globus-connect-personal-windows/)

  A recent version of Windows is required.  If your version of Windows no
  longer receives patches from Microsoft, Globus Connect Personal may not work.
  Check UIT's [Service and Software Sunset Schedule](http://sunset.stanford.edu)
  to see when various versions of Windows will stop receiving support.

* [Install Globus Connect Personal for **Linux**](https://docs.globus.org/how-to/globus-connect-personal-linux/)

  A recent Linux distribution is required.  Supported distributions include
  CentOS, Debian, Fedora, Linux Mint, openSUSE, Red Hat, and Ubuntu.  If the
  distributor has End-Of-Lifed your distribution, Globus Connect Personal may
  not work.  To use the GUI frontend to Globus Connect Personal, Tcl/Tk must be
  installed.

The instructions linked above will walk you through downloading Globus Connect
Personal, installing it, and creating a Mapped Collection representing your
local machine.

{% include info-box.html
   icon="id-card"
   header="Unexpected Login Prompt?"
   content="As part of the setup process, a web browser will be launched and you will be asked to log in to Globus.  If you did not expect this, go back to the top of this page and look at the links in the first paragraph."
%}

{% include info-box.html
   icon="lock-open"
   header="High Assurance Endpoints"
   content="At this time, Stanford does not have the Globus subscription needed to support High Risk data.  So, please leave the <em>high assurance</em> option off for now, and do not install Globus Connect Personal on a system containing High Risk data."
%}

## Configure your Endpoint

At the end of the setup, you were shown a _Setup Successful_ screen, with a
link to "show collection details".  Click on that link.

{% include figure.html
   src="/assets/client/SetupComplete.png"
   alt="The Globus Connect Personal setup screen, showing a successful setup."
   caption-overlay=true
   caption-header="Successful Globus Connect Personal installation"
   caption-text="Clicking 'show collection details' will allow you to view the collection you just created."
%}

When you click on the link, you will be taken to your collection's information
page.  The only things filled in will be the name and (optionally) the
description you entered during initial setup, as well as your Globus identity
(as the owner of the collection).

{% include figure.html
   src="/assets/client/NewEndpointOverview.png"
   alt="The collection overview screen, showing a newly-created personal collection."
   caption-overlay=true
   caption-header="A New Personal Collection"
   caption-text="The display name has been entered, and you are now ready to continue to the next step!"
%}

Most of the fields are empty, and a few should be filled in.  Click on the
**<i class="fas fa-pencil-alt"></i> Edit Attributes** button, and make the following changes:

* Change the _Contact E-mail_ to be your email address.

* Change the _Organization_ to `Stanford University`, and change the
  _Department_ to be the name of your Group (such as your Lab), your
  Department, or your School.

* Change _Force encryption_ to `Yes`.

Once you save changes, then configuration is complete!  **Congratulations!**

At this time, your Globus Connect Personal collection is configured to provide
access only to you, and only to files that live in your home directory.

If you would like Globus Connect Personal to access other parts of your system,
read on.  If you would like to give other people access to files on your
machine, first give Globus Connect Personal access to those directories, and
then [enable Globus Plus]({{ "client/plus.html" | relative_url }}).

## Add Allowed Paths

When Globus wants to perform an operation on your system (such as a write, or
listing the contents of a directory), two security checks are performed:

* The user running Globus Connect Personal must be allowed to perform the
  operation.  This check is enforced by the OS, and cannot be changed by
  Globus.

* Globus Connect Personal must allow access to the directory.

To change the list of allowed paths, click on the Globus toolbar (or menu bar)
icon <img src="{{ "/assets/client/ToolbarIcon.png" |
relative_url }}" alt="" /> to bring up the Globus Connect Personal menu:

{% include hero-image.html
   src="/assets/client/GlobusConnectPersonalMenu.png"
   alt="The Globus Connect Personal application menu, which appears when you click on the Globus Connect Personal icon."
   caption-overlay=true
   caption-header="The Globus Connect Personal menu"
   caption-text="The exact look and feel will vary from computer to computer."
%}

In the Globus Connect Personal menu, choose _Preferences_; when the Preferences
window appears, go to the _Access_ tab.

{% include hero-image.html
   src="/assets/client/GlobusConnectPersonalAccess.png"
   alt="The Globus Connect Personal access configuration screen."
   caption-overlay=true
   caption-header="Globus Connect Personal Access Configuration"
   caption-text=""
%}

To allow access to additional directories, use the <i class="fa fa-plus"
title="plus"></i> button to add an entry.  Once added, use the _Writeable_ box
to give write access; if that box is not checked, the access will be read-only.

The <em>Shareable</em> checkbox is used to allow sharing for a directory.  This
feature is only available as part of <a href="{{ "/client/plus.html" |
relative_url }}" title="Globus Plus">Globus Plus</a>.

To remove an entry, click on it to select the entry, and then click on the <i
class="fa fa-minus" title="minus"></i> button to delete the entry.

{% include info-box.html
   header="Changes are immediate"
   content="Changes to access configuration take effect immediately.  If you delete access to a directory that has a transfer in progress (or you disable write access to a directory being written to), the affected transfers will begin to fail."
%}

Globus Connect Personal's access configuration is _Default-Deny_: If a
directory is not covered by at least one access rule, then it will not be
accessible through Globus Connect Personal.

Conversely, if a directory is covered by multiple access rules, only the
most-specific rule will apply.  For example, let's say you have three access
rules:

* Access to `/Users/me`, read-only.

* Access to `/Users/me/Dropbox`, read-write.

* Access to `/Users/me/Dropbox/X`, read-only.

In the above configuration, Globus will allow write access to all of the `Dropbox`
directory, _except_ for the `X` directory, which will be kept read-only.

That's it!  You now have Globus Connect Personal fully configured.  You can now
make transfers from—and, if your allowed write access, _to_—your collection!

If you would like to share files from your collection with other people, you
should now proceed to [enable Globus Plus]({{ "/client/plus.html" | relative_url
}}).




