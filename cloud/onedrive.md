---
layout:      page
toc:  true
title:       Globus and Microsoft OneDrive
see-also: true
id: cloud
description: Globus works with Microsoft OneDrive, but with a number of restrictions.
---

{% include info-box.html
   icon="id-card"
   header="Full SUNetID Required"
   content="To interact with Microsoft services through Stanford, you must have a full or full-sponsored SUNetID.  Therefore, using the Globus OneDrive connector also requires a full (or full-sponsored) SUNetID."
%}

# Microsoft OneDrive

Microsoft OneDrive may be accessed through the [Stanford OneDrive](https://app.globus.org/file-manager/collections/9beecf19-601f-47b9-a15b-a0f34845abb1/overview)
collection.


Before continuing, you will need to do some one-time setup work.  You will need
to…

* <a href="#service-limitations">Review the service limitations</a>, to see if
  they will affect your usage.  If you are still OK using Globus, your next
  step will be to…

* <a href="#authenticate-to-onedrive">Authenticate to Microsoft OneDrive</a>.
  This gives Globus access to OneDrive, as you.

Once the one-time setup work is complete, you should proceed to <a
href="#accessing-files-on-microsoft-onedrive">access your files on Microsoft OneDrive</a>.

Each step is described in detail below.

## Service Limitations

Globus has a number of limitations when working with Microsoft OneDrive.  These
limits might affect your use case—especially when dealing with research data or
shared content—so you should review them before starting to use Globus with
OneDrive.

### OneDrive Drive Limitations

Microsoft provides a large list of [limits on OneDrive and
SharePoint](https://support.microsoft.com/en-us/office/restrictions-and-limitations-in-onedrive-and-sharepoint-64883a5d-228e-48f5-b3d2-eb39e07630fa),
which affects all users of OneDrive.  You should review the full list; the
important limits are below:

Certain characters are not allowed in file or folder names: `" * : < > ? \ / |`

Microsoft Windows has certain file names that are reserved for its own use.
Examples include `CON`, `PRN`, and `desktop.ini`.  Those file names are also
not allowed in OneDrive.  Certain files—like temporary files—are also not
supported.  See the full list by clicking on the link at the start of this
section.

The maximum file size on Microsoft OneDrive is 250 GB.  If you are uploading
.zip files, each file *within the .zip file* has a maximum file size of 20 GB.

File and directory names must not be longer than 255 characters.  Also, the
complete path of a file—the file name plus the names of preceding
directories—must not be longer than 400 characters.

Microsoft OneDrive—and the Globus OneDrive connector—will start to experience
performance issues when your OneDrive contains more than 300,000 items (files
and folders).

All of the OneDrive limitations also apply to files within SharePoint sites.

### Globus Limitations

There are a number of limitations specific to Globus:

Globus does not support setting or copying custom permissions.  Uploaded items
will inherit the permissions of the parent folder.

Globus is not able to access OneDrive or SharePoint files that are outside
Stanford University's "tenant".  What that means is…

* You can access your own files stored in Stanford OneDrive.

* You can access files in Stanford SharePoint sites (where you have access).

* You can access OneDrive files and directories that are shared with you, but
  **only from other Stanford University OneDrive users**.

Globus does not support accessing OneDrive files that have been shared to you
by others outside of Stanford University.  Since Stanford Health Care and
Stanford Children's Health are separate Microsoft tenants, with their own
OneDrive instances, you can not access those files from Globus.

#### Files created by Microsoft Office 365 Products

When you create or edit files using Microsoft products on the web—like Word,
Excel, PowerPoint, and Visio—those files are saved in Microsoft OneDrive.

Unlike Google, the files accessed through Microsoft OneDrive are actual
files.  If you create a Word doc through the Microsoft Office 365 web site, the
actual .docx file will be saved in OneDrive, and can be downloaded using
Globus.

Similarly, you can take a file from your computer (like an Excel .xlsx file),
upload it to OneDrive, and open it using the Microsoft Office 365 web site.

If you are OK with the limitations above, you should move on to authenticating
to Microsoft OneDrive.

## Authenticate to OneDrive

As someone with a full SUNetID, you have a Microsoft account associated with
your SUNetID.  Microsoft knows you by SUNetID; if your SUNetID is `nobody`,
Microsoft will know you as `nobody@stanford.edu`.  Even if you have a different
preferred email address or alias, Microsoft will still know you as your
`SUNetID@stanford.edu`.

To authenticate to Microsoft OneDrive, you must first access the Stanford
OneDrive collection, using the link at the top of the page.  You might be asked
to log in; if so, log in through *Stanford University*.

You should arrive at a page which looks like this:

{% include hero-image.html
   src="/assets/cloud/OneDriveCollectionwithCredentials.png"
   alt="The Microsoft OneDrive collection, with the Credentials tab hilighted."
   caption-overlay=true
   caption-header="Microsoft OneDrive collection"
   caption-text=""
%}

When you go to the link at the top of this page, you will be taken to the main
page for the collection.  Click on the 'Credentials' tab.

{% include hero-image.html
   src="/assets/cloud/OneDriveCollectioncredentialsconsent1.png"
   alt="A prompt to give Globus consent to manage your Microsoft OneDrive credentials."
   caption-overlay=true
   caption-header="Microsoft OneDrive credentials consent required"
   caption-text=""
%}

If this is the first time you are accessing this collection, you may be asked
to give consent for Globus to store your OneDrive credentials.  Click
'Continue'.

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
   src="/assets/cloud/OneDriveCollectioncredentialsconsent2.png"
   alt="A prompt to give consent to the Globus Web app to manage your Google credentials in the Google Drive collection."
   caption-overlay=true
   caption-header="Consent required to manage Google credentials"
   caption-text=""
%}

To use Globus with Microsoft OneDrive, you need to provide consent.
First, Globus will need consent to get & store credentials for
Microsoft OneDrive.  Click "Allow" to give Globus permission to do this.

{% include hero-image.html
   src="/assets/cloud/OneDriveCollectioncredentialconfirmation.png"
   alt="A Globus screen showing your SUNetID, asking you to confirm that this is your Microsoft account."
   caption-overlay=true
   caption-header="Microsoft Account selection confirmation"
   caption-text=""
%}

After giving Globus permission to store OneDrive credentials, you will need to
tell Microsoft that it is OK for it to give your credentials to Globus.  Click
"Continue" to be sent to Microsoft's web site.

{% include hero-image.html
   src="/assets/cloud/OneDriveMicrosoftconsent1.png"
   alt="A Microsoft screen, redirecting you to Stanford Login."
   caption-overlay=true
   caption-header="Microsoft Stanford Login"
   caption-text=""
%}

If you have not used any Microsoft web sites today, the Microsoft web site may
send you through Stanford Login.  If this happens, you should log in as normal.

{% include hero-image.html
   src="/assets/cloud/OneDriveMicrosoftconsent2.png"
   alt="A Microsoft screen asking for permission to allow access to your data."
   caption-overlay=true
   caption-header="Microsoft OneDrive consent"
   caption-text=""
%}

Next, Microsoft will ask for consent to give Globus access to your files.  This
authorization only applies to this specific Globus installation, not
installations run by others.  Click "Accept".

{% include hero-image.html
   src="/assets/cloud/OneDriveCollectioncredentials.png"
   alt="A Globus screen showing Microsoft OneDrive credentials."
   caption-overlay=true
   caption-header="OneDrive collection with credentials loaded"
   caption-text=""
%}

Congratulations, setup is complete!  Globus now has a set of credentials to
access Microsoft OneDrive as you.  Continue to the next section to actually
access your data.

## Accessing Files on Microsoft OneDrive

Now that you have given consent for Globus to get Microsoft credentials, and
you have given Microsoft consent to issue those credentials, it's time to
actually use them to access Microsoft OneDrive through Globus!

Using the link at the top of the page, access the Microsoft OneDrive
collection.  You might be asked to log in; if so, log in through *Stanford
University*.

{% include hero-image.html
   src="/assets/cloud/OneDriveCollectionwithOverviewandFileManager.png"
   alt="The Microsoft OneDrive collection, with the Overview tab and File Manager buttons hilighted."
   caption-overlay=true
   caption-header="OneDrive collection"
   caption-text=""
%}

Click on the "Open in File Manager" button.  That will take you to the File
Manager and connect to Microsoft OneDrive.

### First-Time Access

The first time you access the Microsoft OneDrive collection, you will be asked
for consent.

{% include hero-image.html
   src="/assets/cloud/OneDriveFileManagerwithconsentscreen.png"
   alt="The Microsoft OneDrive collection, saying that consent is required."
   caption-overlay=true
   caption-header="OneDrive collection requesting consent"
   caption-text=""
%}

Before, you gave Globus consent to ask Microsoft for credentials to access
Microsoft OneDrive.  Now, you need to give the Globus web site consent to
actually use those credentials.  Click the "Continue" button.

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
   src="/assets/cloud/OneDriveCollectionaccessconsent.png"
   alt="A prompt to give consent to the Globus Web app to access Microsoft OneDrive on your behalf."
   caption-overlay=true
   caption-header="OneDrive collection consent screen"
   caption-text=""
%}

Finally, click on 'Allow' to give the Globus web site permission to use your
Microsoft credentials to access Microsoft OneDrive.

### Subsequent Accesses

When you access the Microsoft OneDrive collection—assuming you have previously
provided consent—you should be greeted with the contents of the *My Files* part
of OneDrive.

{% include hero-image.html
   src="/assets/cloud/OneDrive File Manager default directory with up one folder.png"
   alt="The File Manager showing the list of 'My Files'."
   caption-overlay=true
   caption-header="The list of 'My Files' in OneDrive, with names obscured"
   caption-text=""
%}

The *My Files* area is a listing all of your OneDrive files and directories.
To get to other parts of OneDrive, click the *up one folder* button.

{% include hero-image.html
   src="/assets/cloud/OneDriveFileManagerroot.png"
   alt="The File Manager showing the root of the OneDrive collection."
   caption-overlay=true
%}

The root of the Microsoft OneDrive collection shows the different areas you can
access:

* *My Files* contains your files in Microsoft OneDrive

* *Shared* contains the files shared with you from other Stanford Unversity OneDrive
  users.

* *Shared libraries* contains one directory for each Microsoft SharePoint site
  that you can access.  You can use this path to access files stored within
  accessible SharePoint sites.




