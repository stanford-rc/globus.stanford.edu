---
layout:      left-sidebar
title:       Install Globus Connect Personal
title_line:  false
description: Installation instructions for the Globus client.
---

# Installing Globus Connect Personal

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

Once you have a Globus account for your Stanford identity, you may begin to
configure Globus Connect personal.  This involves creating a Globus Connect
Personal endpoint, downloading and installing the Globus Connect Personal
software, and configuring both the software and your new endpoint.

{% include info-box.html
   icon="desktop"
   header="Admin Access Required"
   content="You will need administrative access to your endpoint in order to install Globus Connect Personal.  If you do not normally have access to install software, talk to your IT contact before you proceed."
%}

{% include info-box.html
   icon="globe"
   header="Network Access Required"
   content="Globus Connect Personal needs to be able to make outbound Internet connections.  Connections must be allowed out to 54.237.254.192/29 port 2223 (for control traffic), and to any Internet host on TCP ports 50000-51000 (for data transfer)."
%}

{% include info-box.html
   icon="lock-open"
   header="Low-Risk Systems Only"
   content="Globus may be only be used at Stanford with Low Risk data.  Please do not install this software on endpoints which contain Medium or High Risk data."
%}
   
# Create an Endpoint

To begin, [log in to Globus](https://www.globus.org/app) and go to the
_Endpoints_ page.

{% include hero-image.html
   src="assets/server/Recent Endpoints.png"
   alt="The 'Endpoints' page, showing recently-used endpoints."
   caption-overlay=true
   caption-header="Globus Endpoints"
   caption-text=""
%}

On the _Endpoints_ page, click on _add Globus Connect Personal endpoint_ (in
the top-center of the page).  You will be taken to the endpoint creation page.

{% include hero-image.html
   src="assets/client/Create Personal Endpoint.png"
   alt="The 'Add Globus Connect Personal Endpoint' page, with a display name already filled in."
   caption-overlay=true
   caption-header="Create Globus Connect Personal Endpoint"
   caption-text=""
%}

On the endpoint-creation screen, enter a display name for your endpoint.  This
will be the name that you see when you look at your endpoint on the Globus web
site.

{% include info-box.html
   header="Detail is good!"
   content="It is preferable to provide detail here, especially when you are trying to find your endpoint in the future."
%}

Once you have decided on a display name, click the _Generate Setup Key_ button.

{% include hero-image.html
   src="assets/client/Endpoint Setup Key.png"
   alt="The 'Add Globus Connect Personal Endpoint' page, showing an endpoint setup key."
   caption-overlay=true
   caption-header="Create Globus Connect Personal Endpoint"
   caption-text="The display name has been entered, and you are now ready to continue to the next step!"
%}

The Globus web site has created a Globus Connect Personal endpoint for you, and
now displays a setup key.  This setup key is a one-time code that links the
Globus Connect Personal software on your laptop, to the Globus Connect Personal
endpoint on the Globus web site.

You should now download Globus Connect Personal, using one of the links
provided by Globus.

# Install Globus Connect Personal

The installation procedure for Globus Connect Personal is different for each
OS:

* On macOS, Globus Connect Personal is delivered as an application in a Disk
  Image (.dmg) file.  To install, open the Disk Image and drag the application
  to your Applications folder.  Mac OS X 10.4 or later (Intel CPUs only) is
  required.

* On Windows, Globus Connect Personal comes delivered as an executable (.exe)
  installer.  To install, download and run the executable.  A recent version of
  Windows is required.

* On Linux, Globus Connect Personal ships as an archive (a .tgz file).
  Expand and un-tar the directory, and then run `globusconnect`.  Python 2
  is required; and to use the GUI, Tcl/Tk 8.4 or later is needed.

Once Globus Connect Personal is installed and started, you will be asked to
enter your setup key.

{% include hero-image.html
   src="assets/client/Enter Setup Key.png"
   alt="Globus Connect Personal, asking for an endpoint setup key."
   caption-overlay=true
   caption-header="Globus Connect Personal Setup"
   caption-text=""
%}

Enter the setup key that was generated on the Globus web site.  If your key is
correct, the Setup window will close, and Globus will start waiting for
instructions.  The Globus icon <img src="{{ "assets/client/Toolbar Icon.png" |
relative_url }}" alt="" /> will appear in the toolbar.

You should now go back to the Globus web site, where you will finish
configuring your endpoint.

# Configure your Endpoint

While you have been installing the Globus Connect Personal software, the web
site has been continuing to show your setup key:

{% include hero-image.html
   src="assets/client/Endpoint Setup Key.png"
   alt="The 'Add Globus Connect Personal Endpoint' page, showing an endpoint setup key."
   caption-overlay=true
   caption-header="Create Globus Connect Personal Endpoint"
   caption-text="Notice how the endpoint's name is a clickable link…"
%}

At the time the setup key was generated, Globus created an endpoint for you.
To view the endpoint's information, click on your endpoint's name, which
appears to the right of the <i class="fas fa-check" title="green check mark"
style="color: green"></i>.

{% include hero-image.html
   src="assets/client/New Endpoint Overview.png"
   alt="The 'Add Globus Connect Personal Endpoint' page, showing an endpoint setup key."
   caption-overlay=true
   caption-header="Create Globus Connect Personal Endpoint"
   caption-text="The display name has been entered, and you are now ready to continue to the next step!"
%}

Most of the fields are empty, and a few should be filled in.  Click on the
_Edit Attributes_ button, and make the following changes:

* Change the _Contact E-mail_ to be your email address.

* Change the _Organization_ to `Stanford University`, and change the
  _Department_ to be the name of your Group (such as your Lab), your
  Department, or your School.

* If your endpoint has access to Medium Risk data, _Force encryption_ must be
  set to `Yes`.  Otherwise, the setting is is optional.

Once you save changes, then configuration is complete!  **Congratulations!**

At this time, your Globus Connect Personal endpoint is configured to provide
access only to you, and only to files that live in your home directory.

If you would like Globus Connect Personal to access other parts of your system,
read on.  If you would like to give other people access to files on your
endpoint, first give Globus Connect Personal access to those directories, and
then [enable Globus Plus]({{ "client/plus.html" | relative_url }}).

# Add Allowed Paths

When Globus wants to perform an operation on your system (such as a write, or
listing the contents of a directory), two security checks are performed:

* The user running Globus Connect Personal must be allowed to perform the
  operation.  This check is enforced by the OS, and cannot be changed by
  Globus.

* Globus Connect Personal must allow access to the directory.

To change the list of allowed paths, click on the Globus toolbar (or menu bar)
icon <img src="{{ "assets/client/Toolbar Icon.png" |
relative_url }}" alt="" /> to bring up the Globus Connect Personal menu:

{% include hero-image.html
   src="assets/client/Globus Connect Personal Menu.png"
   alt="The Globus Connect Personal application menu, which appears when you click on the Globus Connect Personal icon."
   caption-overlay=true
   caption-header="The Globus Connect Personal menu"
   caption-text="The exact look and feel will vary from computer to computer."
%}

In the Globus Connect Personal menu, choose _Preferences_; when the Preferences
window appears, go to the _Access_ tab.

{% include hero-image.html
   src="assets/client/Globus Connect Personal Access.png"
   alt="The Globus Connect Personal access configuration screen."
   caption-overlay=true
   caption-header="Globus Connect Personal Access Configuration"
   caption-text=""
%}

To allow access to additional directories, use the <i class="fa fa-plus"
title="plus"></i> button to add an entry.  Once added, use the _Writeable_ box
to give write access; if that box is not checked, the access will be read-only.

The <em>Shareable</em> checkbox is used to allow sharing for a directory.  This
feature is only available as part of <a href="{{ "client/plus.html" |
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
make transfers from—and, if your allowed write access, _to_—your endpoint!

If you would like to share files from your endpoint with other people, you
should now proceed to [enable Globus Plus]({{ "client/plus.html" | relative_url
}}).

{% include left-sidebar/transition.md %}

{% include toc.html id="client" %}
