---
layout:      page
toc:  true
title:       Globus and Box

description: Globus works with Stanford Box, but with a number of restrictions.
---

{% capture globus-ending %}
<h2>Stanford Box has been retired…</h2>
<p>The <b>Stanford Box service was retired</b> on February 28, 2023.
<a href="{{ "2023/02/23/box-deprecation.html" | relative_url }}">Read the announcement</a>.
</p>
<p>The instructions on this page no longer apply, but the page is being kept
around, for those who find it via search engine.</p>
{% endcapture %}

{% include info-box.html
   icon="info"
   raw=globus-ending
%}

{% include info-box.html
   icon="biohazard"
   header="Medicine Box Unavailable"
   content="Although Stanford has a site license for using the Globus add-on for Box, access to Medicine Box is blocked for security reasons."
%}

# Stanford Box

Stanford Box may be accessed through the [Stanford Box
(DEV)](https://app.globus.org/file-manager/collections/9988335d-9800-47e6-9645-0d2813c4707e/overview)
collection.

Before continuing, you will need to do some one-time setup work.  You will need
to…

* <a href="#service-limitations">Review the service limitations</a>, to see if
  they will affect your usage.

Once the one-time setup work is complete, you should proceed to <a
href="#accessing-files-on-box">access your files on Box</a>.

## Service Limitations

Globus has a few limitations when working with Box.  These
limits do not affect most common use cases, but they might affect you, so you
should review them before starting to use Globus with Box.

Box applies a file-size limit, which varies depending on the specific Box plan
that is used.  See the [Box File Size support
article](https://support.box.com/hc/en-us/articles/360043697314-Understand-the-Maximum-File-Size-You-Can-Upload-to-Box)
for details on how to determine your maximum file size.

Globus does not copy any custom metadata or permissions from files it
downloads.  Uploaded items will inherit the permissions of the parent folder.

Box Notes are stored within your Box.  Unlike Google products, downloading a
Box Note from Box will download the entire contents of the Box Note.  You will
need to use a third-party conversion tool, or a text editor which natively
supports Box Notes, in order to view and edit the contents of your Note.

If you are OK with the limitations above, you should move on to accessing your
files on Box!

## Accessing Files on Box

With the service limitations reviewed, you may now proceed to access your data
on Box through Globus!

Using the link at the top of the page, access the Box collection.  You might be
asked to log in; if so, log in through *Stanford University*.

{% include hero-image.html
   src="assets/cloud/Box Collection with Overview and File Manager.png"
   alt="The Stanford Box collection, with the Overview tab and File Manager buttons hilighted."
   caption-overlay=true
   caption-header="Box collection"
   caption-text=""
%}

Click on the "Open in File Manager" button.  That will take you to the File
Manager and connect to Box.

### First-Time Access

The first time you access the Box collection, you will be asked for consent.

{% include hero-image.html
   src="assets/cloud/Box File Manager with consent screen.png"
   alt="The Box collection, saying that consent is required."
   caption-overlay=true
   caption-header="Box collection requesting consent"
   caption-text=""
%}

As part of configuring Globus to work with Box, the Stanford Box administrators
provided a set of credentials that allow Globus to communicate with Box.  Now,
you are giving Globus consent to actually use those credentials to talk to Box
on your behalf.  Click the "Continue" button.

{% include hero-image.html
   src="assets/Consent identity selection.png"
   alt="A prompt to select an identity for giving consent."
   caption-overlay=true
   caption-header="Select identity for giving consent"
   caption-text=""
%}

Some institutions allow you to have multiple accounts.  Stanford only allows
one SUNetID per person, so click on your SUNetID.

{% include hero-image.html
   src="assets/cloud/Box access consent.png"
   alt="A prompt to give consent to the Globus Web app to access Google Drive on your behalf."
   caption-overlay=true
   caption-header="Drive collection consent screen"
   caption-text=""
%}

Finally, click on 'Allow' to give Globus permission to use your Google
credentials to access Google Drive.

### Subsequent Accesses

When you access the Box collection—assuming you have previously provided
consent—you should be greeted with a list of your files on Box.

{% include hero-image.html
   src="assets/cloud/Box File Manager root.png"
   alt="The File Manager showing the root of the Box collection, listing files and directories."
   caption-overlay=true
   caption-header="Files and Directories in Box"
   caption-text=""
%}

All files on Box—both your own items and those shared with you—appear in the
same listing.  You are now able to transfer data to and from Box!




