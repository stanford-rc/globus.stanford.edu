---
layout:      page
toc:        true
title:       Globus and Google Cloud Storage
see-also: true
id: cloud
description: Globus works with Google Cloud Storage!
---

{% capture google-account-required %}
<h4>Stanford Google Account Required</h4>
<p>To access Google Cloud Storage, you need a Stanford Google account.  If you
have Stanford email, you have a Stanford Google account.  If you do not have
Stanford email, you & your sponsor should read about <em><a title="Stanford Google Workspace ID for Base SUNet IDs" href="https://uit.stanford.edu/service/accounts/googleworkspace-id">Stanford Google Workspace ID for Base SUNet IDs</a></em>.</p>
{% endcapture %}
{% include info-box.html
   icon="id-card"
   raw=google-account-required
%}

# Google Cloud Storage

Google Cloud Storage may be accessed through the [Stanford Google Cloud
](https://app.globus.org/file-manager/collections/1a7d4931-986a-42f5-80fc-1fafe28f9826/overview)
collection.

Before continuing, you will need to do some one-time setup work.  You will need
to…

* <a href="#service-limitations">Review the service limitations</a>, to see if
  they will affect your usage.  If you are still OK using Globus, your next
  step will be to…

* <a href="#authenticate-to-google-cloud-storage">Authenticate to Google Cloud
  Storage</a>.  This gives Globus access to Google Cloud, as you.

Once the one-time setup work is complete, you should proceed to <a
href="#accessing-files-on-google-cloud-storage">access your files on Google Cloud Storage</a>.

Each step is described in detail below.

## Service Limitations

Globus has a number of limitations when working with Google Cloud Storage.
These limits do not affect most common use cases, but they might affect you, so
you should review them before starting to use Globus with Google Cloud Storage.

### Google Cloud Storage Limitations

Google Cloud Storage has its own definition for modification dates, which are
exposed via the "Last-Modified" header in Google Cloud Storage APIs.  Since
objects may not have their contents modified (only replaced), Google Cloud
Storage uses the "Last-Modified" header to record when the object's metadata
was last changed.  The header's value is set to the current date/time when the
object is first uploaded, and is reset to the current date/time whenever the
metadata changes.

For users who want to preserve modification dates, if you upload files to
Google Cloud Storage with the option "preserve source file modification times"
enabled, Globus will store the file's modification date/time in the Google Cloud
Storage object's metadata, under the `mtime` tag.

The above only applies to files: Modification dates are not preserved for
directories.

### Globus Limitations

Globus for Google Cloud Storage does not support the following Google Cloud
features:

* Custom Metadata: Custom Metadata on existing objects are ignored when those
  objects are downloaded, and new objects do not have custom metadata set.  The
  exception is the `mtime` tag, which is used if you upload a file with the
  "preserve source file modification times" options set.

* Versions: When downloading a file from a bucket, Globus will always
  access the latest version.  When Globus deletes a versioned file, the file
  will not be truely deleted: Older versions will be left behind.

* Checksums: At this time, Globus does not support providing a pre-computed
  checksum on upload, nor does it support using Google CRC32C checksums for
  integrity checks.

  The Google Cloud Storage connector will attempt to checksum the
  data as it is sending it to Google Cloud Storage, and use that checksum for
  the post-upload integrity check that occurs within the transfer.  If this
  checksum fails, Globus will re-download the object from Google Cloud Storage,
  in order to verify it was uploaded correctly.

* Requester-Pays buckets: Attempts to access a requester-pays bucket will
  always show an "ErrorUnknown" error, with a message saying "no user project
  provided".

These limitations are present because Globus supports only a common set of
features between storage platforms, to make file transfers as portable as
possible.

We have requested Globus support CRC32C checksums, to reduce the need for
re-downloading files from Google Cloud Storage.  We have also asked Globus to
add support for requester-pays buckets.

If you are OK with the limitations above, you should move on to authenticating
to Google Cloud.

## Authenticate to Google Cloud Storage

As someone with a full SUNetID—or as someone with a base SUNetID and a
[Stanford Google
Account](https://uit.stanford.edu/service/accounts/googleworkspace-id)—you have
a Google account associated with your SUNetID.  Google knows you by SUNetID; if
your SUNetID is `nobody`, Google will know you as `nobody@stanford.edu`.  This
is true even if you have a different preferred email address or alias.

To authenticate to Google Cloud Storage, you must first access the Globus Cloud
Storage collection, using the link at the top of the page.  You might be asked
to log in; if so, log in through *Stanford University*.

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

To authenticate to Google Cloud Storage for the first time, go to the [Stanford
Google Cloud
](https://app.globus.org/file-manager/collections/1a7d4931-986a-42f5-80fc-1fafe28f9826/overview)
collection.

{% include hero-image.html
   src="/assets/cloud/CloudCollectionwithCredentials.png"
   alt="The Google Cloud Storage collection, with the Credentials tab hilighted."
   caption-overlay=true
   caption-header="Google Cloud Storage collection"
   caption-text=""
%}


From the Collection information page, click on the 'Credentials' tab.

{% include hero-image.html
   src="/assets/cloud/CloudCollectioncredentialsconsent1.png"
   alt="A prompt to give Globus consent to manage your Google Cloud Storage credentials."
   caption-overlay=true
   caption-header="Google Cloud Storage credentials consent required"
   caption-text=""
%}

If this is the first time you are accessing this collection, you will be asked
to give consent for Globus to store your Google credentials.  Click 'Continue'.

{% include hero-image.html
   src="/assets/cloud/CloudConsentIdentitySelection.png"
   alt="A prompt to confirm your Google account."
   caption-overlay=true
   caption-header="Confirming your identity for giving consent"
   caption-text=""
%}

On this screen, Globus displays a screen confirming the Google account to use.
This should show your sunetid@stanford.edu.  Click 'Continue'.  If Globus says
your Google Account is *not* your sunetid@stanford.edu, **stop**, click on
'Cancel', and <a href="mailto:srcc-support@stanford.edu">email us a
screenshot</a>.

{% include hero-image.html
   src="/assets/cloud/CloudCollectionCredentialsConsent2.png"
   alt="A prompt to give consent to the Globus Web app to manage your Google credentials in the Google Cloud Storage collection."
   caption-overlay=true
   caption-header="Consent required to manage Google credentials"
   caption-text=""
%}

Next, click on 'Allow' to give Globus permission to store your Google
credentials.  This is what authorizes Globus to store your Google credentials.

You will now be taken to Google, which will ask you to grant permission for
Globus to access Google Cloud Storage on your behalf.

{% include hero-image.html
   src="/assets/cloud/CloudGoogleconsent1.png"
   alt="A Google screen, asking you to select your Stanford Google account."
   caption-overlay=true
   caption-header="Selecting your Stanford Google Account"
   caption-text=""
%}

Google will first ask you to confirm which account you want to use.  Select
your Stanford Google account.  Once you do so, you might be redirected through
Stanford Login.

{% include hero-image.html
   src="/assets/cloud/CloudGoogleconsent2.png"
   alt="A Google screen asking for permission to share information about you with Globus."
   caption-overlay=true
   caption-header="Google Cloud Storage consent, part 1"
   caption-text=""
%}

Next, Google will ask for permission to share your basic information (like your
name) with Globus.  Click 'Continue'.

{% include hero-image.html
   src="/assets/cloud/CloudGoogleconsent3.png"
   alt="A Google screen asking for permission to allow access to Google Cloud Storage."
   caption-overlay=true
   caption-header="Google Cloud Storage consent, part 2"
   caption-text=""
%}

Next, Google will ask you to give permission for our installation of the Globus
software to access and manage your content on Google Cloud Storage.

These consents only apply to this specific Globus installation, not
installations run by others.  Click 'Allow'.

{% include hero-image.html
   src="/assets/cloud/CloudCollectionCredentials.png"
   alt="A Globus screen showing Google Cloud Storage credentials."
   caption-overlay=true
   caption-header="Cloud Storage collection with credentials loaded"
   caption-text=""
%}

Congratulations, setup is complete!  You may now proceed to access files
through this collection.

## Accessing Files on Google Cloud Storage

With Google Cloud Storage credentials loaded and permissions granted, you may
now proceed to access your data on Google Cloud Storage through Globus!

Using the link at the top of the page, access the Google Cloud Storage
collection.  You might be asked to log in; if so, log in through *Stanford
University*.

{% include hero-image.html
   src="/assets/cloud/CloudCollectionwithOverviewandFileManager.png"
   alt="The Google Cloud Storage collection, with the Overview tab and File Manager buttons hilighted."
   caption-overlay=true
   caption-header="Cloud collection"
   caption-text=""
%}

Click on the "Open in File Manager" button.  That will take you to the File
Manager and connect to Google Cloud Storage.

### First-Time Access

The first time you access the Google Cloud Storage collection, you will be
asked for consent.

{% include hero-image.html
   src="/assets/cloud/CloudFileManagerWithConsentScreen.png"
   alt="The Google Cloud Storage collection, saying that consent is required."
   caption-overlay=true
   caption-header="Cloud Storage collection requesting consent"
   caption-text=""
%}

When you first loaded your credentials, you gave Globus consent to store those
credentials for you.  Now, you are giving Globus consent to actually use those
credentials to talk to Google Cloud Storage.  Click the "Continue" button.

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
   src="/assets/cloud/CloudCollectionAccessConsent.png"
   alt="A prompt to give consent to the Globus Web app to access Google Cloud Storage on your behalf."
   caption-overlay=true
   caption-header="Google Cloud Storage collection consent screen"
   caption-text=""
%}

Finally, click on 'Allow' to give Globus permission to use your Google
credentials to access Google Cloud Storage.

### Subsequent Accesses

When you access the Google Cloud collection—assuming you have previously provided
consent—you should be greeted with an error, as well as a note.

{% include hero-image.html
   src="/assets/cloud/CloudFileManagerRootNoPath.png"
   alt="The File Manager showing the root of the Google Cloud Storage collection, which displays an error message."
   caption-overlay=true
   caption-header="To access Google Cloud Storage, you must enter a bucket name"
   caption-text=""
%}

This is one of the major differences between Google Cloud Storage and Amazon
S3: With Google Cloud Storage, you must enter the name of the bucket that you
would like to acess.

For example, if you would like to access the bucket `karltest20220321`, enter `karltest20220321` into the *Path* field and press the *Return* key.

{% include hero-image.html
   src="/assets/cloud/CloudFileManagerRootEnteringPath.png"
   alt="The File Manager, showing a bucket name typed into the 'Path' field."
   caption-overlay=true
   caption-header="Enter a bucket name and press Return"
   caption-text=""
%}

{% include hero-image.html
   src="/assets/cloud/CloudFileManagerRoot.png"
   alt="The File Manager, showing the contents of a bucket."
   caption-overlay=true
   caption-header="The bucket's contents are displayed"
   caption-text=""
%}

You may now transfer your files.
