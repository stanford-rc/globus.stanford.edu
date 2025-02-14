---
layout:      page
toc:  true
title:       Globus and Google Drive
see-also: true
id: cloud
description: Globus works with Google Drive, but with a number of restrictions.
---

{% capture drive-limits %}
<h4>Incoming Google Drive limits</h4>
<p>Starting September 1, 2025: Google Drive spaces
(including your 'My Drive' space and each Shared Drive) will have a 5 TB quota.
<b><a title="Transitioning to a Sustainable Google Workspace" href="https://uit.stanford.edu/news/university-sets-5-tb-google-workspace-limit">Read the transition announcement</a></b>.</p>
{% endcapture %}
{% include info-box.html
   icon="compress-arrows-alt"
   raw=drive-limits
%}

{% include info-box.html
   icon="id-card"
   header="Full SUNetID Required"
   content="To interact with Google Drive through Stanford, you must have a full or full-sponsored SUNetID.  Therefore, using the Globus Google connector also requires a full (or full-sponsored) SUNetID."
%}

# Google Drive

Google Drive may be accessed through the [Stanford Google Drive
](https://app.globus.org/file-manager/collections/e1c8858b-d5aa-4e36-b97e-95913047ec2b/overview?back=endpoints)
collection.

Before continuing, you will need to do some one-time setup work.  You will need
to…

* <a href="#service-limitations">Review the service limitations</a>, to see if
  they will affect your usage.  If you are still OK using Globus, your next
  step will be to…

* <a href="#authenticate-to-drive">Authenticate to Google Drive</a>.  This
  gives Globus access to Drive, as you.

Once the one-time setup work is complete, you should proceed to <a
href="#accessing-files-on-google-drive">access your files on Google Drive</a>.

Each step is described in detail below.

## Service Limitations

Globus has a number of limitations when working with Google Drive.  These
limits do not affect most common use cases, but they might affect you, so you
should review them before starting to use Globus with Drive.

### Drive Limitations

There are some [limits imposed by
Google](https://support.google.com/a/answer/172541?hl=en) on all users of
Drive:

The maximum file size on Google Drive is 5 TB.

Users are limited to uploading 750 GB of data to Google Drive across all spaces (personal Drive as well as Shared Drives) per calendar day.

Transfers that involve moving more than 750 GB of data into Drive will be
automatically paused when this limit is reached, and resumed when your limit is
reset.  Google does not explicitly define when the calendar day resets.

If you hit the daily upload limit, and there is a file transfer in progress,
that transfer will be allowed to complete.  This is how it is possible to
upload a multi-TB file, even when the daily upload limit is lower.

There are also limits [specific to Shared
Drives](https://support.google.com/a/answer/7338880?hl=en):

Google places a limit on the maximum number of items in a Shared Drive.  The
limit is 400,000 items per Shared Drive.  Each file, folder, and Shortcut
counts as one item.

All of the Google Drive general limitations mentioned above also apply to
Shared Drives.

### Globus Limitations

There are a number of limitations specific to Globus:

Globus does not support setting or copying custom permissions.  Uploaded items
will inherit the permissions of the parent folder.

Globus is also not able to copy Drive Shortcuts.  Drive Shortcuts are similar
to shortcuts on Windows or aliases on macOS.  At this time, Globus is not able
to copy or follow Shortcuts; attempting to copy a Shortcut will create an empty
file at the destination, and generate a checksum (integrity-checking) error.
Support for Shortcuts is currently on Globus' backlog for implementation.

#### Files created by Google Products

Special limits apply to 'files' created by Google products, such as Docs,
Sheets, Slides, etc..

When you 'save' one of these 'files' in Drive, Google does not actually store
the data in Drive.  Instead, Google Drive holds a pointer to the data within
the specific Google product.

If you copy one of these 'files' from Drive, a file will be written at the
destination, but the file will only contain the pointer data.  For example,
copying a Google Sheet will create a file with a `.gsheet` extension.  The file
is typically in JSON format, and if it has a `url` key, that will contain the
URL needed to access the content in the appropriate Google product.

Also, if the destination is an endpoint system (like a desktop or laptop
computer), and the Google Drive software is running at the destination,
double-clicking the file will launch your default web browser, opening the
appropriate Google product.  For example, double-clicking on a `.gsheet` file
will cause your preferred web browser to open the spreadsheet in Google Sheets.

If you try to upload one of these 'pointer files' back to Google Drive, the
behavior is undefined.  As of April, 2022, the following behavior was observed
when uploading a `.gsheet` file to Drive:

* The Google Sheet appeared in the new Drive location, and was still present in
  the original Drive location.

* Globus reported a checksum verification failure after the upload.

* Attempting to remove the Sheet from the new Drive location caused the sheet
  to move to the Trash.  Had it not been restored, the Sheet would have been
  deleted after 30 days.

Therefore, it is best to exercise caution when transferring 'files' created by
Google products.  As an alternative, the content can be exported into a
different format (for example, `.xlsx` for Google Sheets), and that exported
file may be transferred as normal.

If you are OK with the limitations above, you should move on to authenticating
to Google Drive.

## Authenticate to Drive

As someone with a full SUNetID, you have a Google account associated with your
SUNetID.  Google knows you by SUNetID; if your SUNetID is `nobody`, Google
will know you as `nobody@stanford.edu`.  Even if you have a
different preferred email address or alias, Google will still know you as your
`SUNetID@stanford.edu`.

To authenticate to Google Drive, you must first access the Globus Drive
collection, using the link at the top of the page.  You might be asked to log
in; if so, log in through *Stanford University*.

{% capture not-google-login %}
<h4>Avoid Sign in With Google</h4>
<p>Globus supports "Sign in with Google"; if you use Sign in with Google, even
if you selected your Stanford email address, you will get a different Globus
account compared to signing in via Stanford University.<br />
If you have previously used Sign in with Google, using your Stanford email
address, you can <a href="/accounts/link.html">link your Stanford and Google/Stanford identities</a>.
Doing so will let you keep access to everything you already have, while
logging in through Stanford University.</p>
{% endcapture %}

{% include info-box.html
   icon="id-card"
   raw=not-google-login
%}

{% include hero-image.html
   src="/assets/cloud/DriveCollectionwithCredentials.png"
   alt="The Google Drive collection, with the Credentials tab hilighted."
   caption-overlay=true
   caption-header="Google Drive collection"
   caption-text=""
%}

When you go to the link at the top of this page, you will be taken to the main
page for the collection.  Click on the 'Credentials' tab.

{% include hero-image.html
   src="/assets/cloud/DriveCollectioncredentialsconsent1.png"
   alt="A prompt to give Globus consent to manage your Google Drive credentials."
   caption-overlay=true
   caption-header="Google Drive credentials consent required"
   caption-text=""
%}

If this is the first time you are accessing this collection, you will be asked
to give consent for Globus to store your Google credentials.  Click 'Continue'.

{% include hero-image.html
   src="/assets/cloud/Consentidentityselection.png"
   alt="A prompt to select an identity for giving consent."
   caption-overlay=true
   caption-header="Select identity for giving consent"
   caption-text=""
%}

Some institutions allow you to have multiple accounts.  Stanford only allows
one SUNetID per person, so click on your SUNetID.

{% include hero-image.html
   src="/assets/cloud/DriveCollectioncredentialsconsent2.png"
   alt="A prompt to give consent to the Globus Web app to manage your Google credentials in the Google Drive collection."
   caption-overlay=true
   caption-header="Consent required to manage Google credentials"
   caption-text=""
%}

Next, click on 'Allow' to give Globus permission to store your Google
credentials.  This is what authorizes Globus to store your Google credentials.

{% include hero-image.html
   src="/assets/cloud/DriveCollectioncredentialconfirmation.png"
   alt="A Globus screen showing your SUNetID, asking you to confirm that this is your Google account."
   caption-overlay=true
   caption-header="Google Account selection confirmation"
   caption-text=""
%}

After giving Globus permission to store credentials, you will need to tell
Google that it is OK for it to give your credentials to Globus.

On this screen, Globus displays a screen confirming the Google account to use.
This should show your sunetid@stanford.edu.  Click 'Continue'.  If Globus says
your Google Account is *not* your sunetid@stanford.edu, **stop**.  Click on
'Cancel' and <a href="mailto:srcc-support@stanford.edu">email us a
screenshot</a>.

You will now be taken to Google, which will ask you to grant permission for
Globus to access Google Drive on your behalf.

{% include hero-image.html
   src="/assets/cloud/DriveGoogleconsent1.png"
   alt="A Google screen, asking you to select your Stanford Google account."
   caption-overlay=true
   caption-header="More Google Account selection"
   caption-text=""
%}

Google will first ask you to confirm which account you want to use.  Select
your Stanford Google account.  Once you do so, you might be redirected through
Stanford Login.

{% include hero-image.html
   src="/assets/cloud/DriveGoogleconsent2.png"
   alt="A Google screen asking for permission to allow access to Google Drive."
   caption-overlay=true
   caption-header="Google Drive consent"
   caption-text=""
%}

Next, Google will ask you to give permission for our installation of the Globus
software to access and manage your content on Google Drive.  This authorization
only applies to this specific Globus installation, not installations run by
others.  Click 'Allow'.

{% include hero-image.html
   src="/assets/cloud/DriveCollectioncredentials.png"
   alt="A Globus screen showing Google Drive credentials."
   caption-overlay=true
   caption-header="Drive collection with credentials loaded"
   caption-text=""
%}

Congratulations, setup is complete!  You may now proceed to access files
through this collection.

## Accessing Files on Google Drive

With Google Drive credentials loaded and permissions granted, you may now
proceed to access your data on Google Drive through Globus!

Using the link at the top of the page, access the Google Drive collection.  You might be
asked to log in; if so, log in through *Stanford University*.

{% include hero-image.html
   src="/assets/cloud/DriveCollectionwithOverviewandFileManager.png"
   alt="The Google Drive collection, with the Overview tab and File Manager buttons hilighted."
   caption-overlay=true
   caption-header="Drive collection"
   caption-text=""
%}

Click on the "Open in File Manager" button.  That will take you to the File
Manager and connect to Google Drive.

### First-Time Access

The first time you access the Google Drive collection, you will be asked for consent.

{% include hero-image.html
   src="/assets/cloud/DriveFileManagerwithconsentscreen.png"
   alt="The Google Drive collection, saying that consent is required."
   caption-overlay=true
   caption-header="Drive collection requesting consent"
   caption-text=""
%}

When you first loaded your credentials, you gave Globus consent to store those
credentials for you.  Now, you are giving Globus consent to actually use those
credentials to talk to Google Drive.  Click the "Continue" button.

{% include hero-image.html
   src="/assets/cloud/Consentidentityselection.png"
   alt="A prompt to select an identity for giving consent."
   caption-overlay=true
   caption-header="Select identity for giving consent"
   caption-text=""
%}

Some institutions allow you to have multiple accounts.  Stanford only allows
one SUNetID per person, so click on your SUNetID.

{% include hero-image.html
   src="/assets/cloud/DriveCollectionaccessconsent.png"
   alt="A prompt to give consent to the Globus Web app to access Google Drive on your behalf."
   caption-overlay=true
   caption-header="Drive collection consent screen"
   caption-text=""
%}

Finally, click on 'Allow' to give Globus permission to use your Google
credentials to access Google Drive.

### Subsequent Accesses

When you access the Google Drive collection—assuming you have previously provided
consent—you should be greeted with a list of different parts of Google Drive.

{% include hero-image.html
   src="/assets/cloud/DriveFileManagerroot.png"
   alt="The File Manager showing the root of the S3 collection, listing buckets."
   caption-overlay=true
   caption-header="The list of buckets in the local AWS Account"
   caption-text=""
%}

The *My Drive* and *Team Drives* folders will take you to your Google Drive and
to your list of Shared Drives, respectively.

The *Starred* and *Shared With Me* 'folders' are not real folders.  *Starred*
shows you a list of every file and folder in Drive that you have starred.
*Shared With Me* shows you every file and folder where someone has given you
explicit access (as opposed to access via a Shared Drive).

{% include info-box.html
   icon="folder-open"
   header="Read-Only"
   content="The Starred and Shared With Me 'folders' are read-only."
%}

Finally, *Trash* shows you items which have been marked for deletion, but which
have not yet been deleted.

{% include info-box.html
   icon="stopwatch"
   header="Expect Delays"
   content="You should expect listings of the Starred, Shared With Me, and Trash folders to take longer than normal, because these 'folders' do not have any form of hierarchical organization."
%}




