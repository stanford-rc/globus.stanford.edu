---
layout:      page
toc:  true
title:       Globus and Elm
see-also: true
id: cloud
description: Globus works with Elm, but with a number of restrictions.
customjs: /assets/js/connect.js
---

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some Elm buckets are allowed to store High Risk data (including PHI).  You are not allowed to use Globus with those buckets."
%}

Elm may be accessed through the [Stanford Elm Storage (project:
campus)](https://app.globus.org/file-manager/collections/0e458bf0-7fde-42bb-8622-42a5d00c5b61/overview)
collection.

Before continuing, you may need to do some one-time setup work.  You will need
to…

* <a href="#service-limitations">Review the service limitations</a>, to see if
  they will affect your usage.  If you are still OK using Globus, your next
  step will be to…

* <a href="#creating-an-access-key">Create an Access Key</a>, which will give
  you an access key (officially an "Access Key ID") and a secret key
  (officially a "Secret Access Key").  Once your access key is created, you
  will need to…

* <a href="#loading-credentials-into-globus">Load the credentials into
  Globus</a>.  This gives Globus access to Elm, with the credentials you
  provide.

Once the one-time setup work is complete, you should proceed to <a
href="#accessing-files-on-elm">access your files on Elm</a>.

Each step is described in detail below.

## Service Limitations

Globus has a number of limitations when working with Elm.  These
limits might affect your use case—especially when dealing with research data or
shared content—so you should review them before starting to use Globus with
OneDrive.

### Elm Limitations

Even though Elm is accessed through the S3 protocol, it has a number of
limitations compared to Amazon S3.  In particular…

* Big Data is Best: Elm works best with large files (hundreds of megabytes and
  larger).  If you are thinking of uploading smaller files, you may wish to
  combine them into a larger `.tar` or `.zip` file before you copy them to Elm.

* Be Aware of Quotas: Elm rentals come with both a *storage quota*—a limit on
  how much data (TiB) you can store—and an *objects quota*—a limit on how many
  objects (files) you can store.  If you exceed either quota, you will start
  seeing "Permission Denied" errors on all uploads.

  Even though Globus transfers do have the "Fail on quota errors" option, it
  has no effect here: The S3 protocol does not have a way to represent "Quota
  Exceeded", so the Elm developers instead represent the error as "Permission
  Denied".

  If you suddenly start seeing "Permissions Denied" errors on transfers to Elm,
  check to see if you have exceeded quota.  To see your current storage & inode
  usage, check your Elm Grafana Dashboard.  To get a link to your Elm Grafana
  Dashboard, go to Elm's [Getting Started
  guide](https://docs.elm.stanford.edu/getting-started/#accessing-your-elm-bucket)
  and enter your bucket name.  If you get your quota increased before a
  transfer's deadline, once quota is added, the transfer will continue
  automatically.

* Expect Slow Restores: Data on Elm are eventually sent to tape.  Directory
  listings will be fast, but downloads from Elm will be much slower than
  expected, and you will see timeouts.  The workaround is to leave the transfer
  alone: Elm will continue restoring files to disk in the background, and files
  will slowly transfer.

  For the same reason, you should avoid using the "where the checksum is
  different" type of sync transfer in Globus: In order to perform the checksum,
  Elm must have your files on disk.  If the files have already been sent to
  tape, this will result in a restore from tape.  There is one exception: A
  checksum-sync transfer is OK to perform immediately after you upload data to
  Elm.

* Workgroups Rule: Even if you give Globus full read, write, and delete access,
  your workgroup membership will limit what Globus can do.  Specifically…

  * You must be a member of your bucket's main workgroup to have read access.
    If you are in either the "Uploader" or the "Editor" workgroup, you are
    automatically part of this workgroup.

  * You must be a member of your bucket's "Uploader" workgroup to have
    read/write access.

  * You must be a member of your bucket's "Editor" workgroup to have full
    read/write/delete access.

* No Cross-Account Access: Elm does not support S3 cross-account bucket access.
  Instead, you should add users to the appropriate workgroup, so they can
  create their own access keys.

### Globus Limitations

If you are planning on a large (or long) transfer to Globus, we strongly
recommend that you enable the "Skip files on source with errors" option.  This
will keep the transfer moving, even in the face of "File not found" or
"Permission denied" errors on the sending side.

If you turn on the "sync" option for your transfer, expect to see a long delay
at the start of the transfer.  This is due to how Globus structures sync
transfers internally.

Globus for Elm does not support the following S3 features:

* Custom Metadata / Tags: Custom Metadata and tags on existing objects are
  ignored when those objects are downloaded, and new objects do not have custom
  metadata or tags set.

* Versions: When downloading a file from an S3 bucket, Globus will always
  access the latest version.

* ACLs: ACLs on existing objects (and the bucket) will influence what you can
  download through Globus, but those ACLs are not copied out of S3.  When
  uploading new objects, ACLs are not explicitly set, and so inherit any
  bucket-level ACL that is set.

* Additional Checksum Algorithms: At this time, if an object in Elm needs to be
  verified, Globus will re-download it in order to compute the checksum.

These limitations are present because Globus supports only a common set of
features between storage platforms, to make file transfers as portable as
possible.

If you are OK with the limitations above, you should move on to creating an
Access Key, which Globus will need to interact with Elm.

## Creating an Access Key

Once your Elm bucket is created, and you have been given access to the
appropriate workgroup, you should log in to the MinIO Console URL provided on
Elm's [Getting Started
guide](https://docs.elm.stanford.edu/getting-started/#accessing-your-elm-bucket)
(enter your bucket name to get the MinIO Console URL).  After going through
Stanford Login, you will see your buckets.

{% include hero-image.html
   src="/assets/cloud/ElmBuckets.png"
   alt="The Elm main page, showing your buckets."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Select the "Access Keys" option:

{% include hero-image.html
   src="/assets/cloud/ElmBucketsWithAccessKeys.png"
   alt="The Elm main page, with the 'Access Keys' link hilighted."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

You will see the list of access keys.  Click "Create access key":

{% include hero-image.html
   src="/assets/cloud/ElmAccessKeysCreate.png"
   alt="The Elm 'Access Keys' page, with 'Create Access Key' hilighted."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

You'll now be presented with the screen to configure the new access key.

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKey.png"
   alt="The Create Access Key page."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

To start, in the *Name* field, enter your name and the word "Globus", so that
others will know what you are using the Access Key for:

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithName.png"
   alt="The Create Access Key page, with a name filled in."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Next, turn on the "Restrict beyond user policy" setting:

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithRestrictSetting.png"
   alt="The Create Access Key page, with a name filled in."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

You will now be presented with the current User Policy, allowing you to change
it.

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithRestrictSettingOn.png"
   alt="The Create Access Key page, with a name filled in."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

### Setting a User Policy

The default User Policy allows more access than Globus needs.  So, you should
change it to a policy that restricts Globus to just the buckets, and actions,
that you want to allow.

On the Create Access Key page, MinIO will provide a default policy in the
Current User Policy box:

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithPolicyDefault.png"
   alt="The Create Access Key page, with a name and policy filled in."
   caption-overlay=false
   caption-header=""
   caption-text="A default policy (in red) will be provided.  You need to delete this."
%}

To start, delete that default policy, so that the Current User Policy box is
empty.

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithPolicyDeleted.png"
   alt="The Create Access Key page, with the policy deleted."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Next, you will need to provide a policy that allows Globus to do only what you
want it to do.

### User Policy Generator

Below, fill in the names of the buckets you want to access through Globus. Read-Only means that Globus can access and copy from your bucket, but cannot make changes to any objects/files.


You can choose to allow Globus to alter your bucket's contents by uploading or deleting objects.

This tool does not confirm that a listed bucket exists; please enter bucket names carefully.

{% include elm-generator.html %}

Take the policy you created above, copy/paste it into the Current User
Policy box, and then click "Create":

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithPolicyReplaced.png"
   alt="The Create Access Key page, with the policy updated."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Once created, you will be given your new Access Key and Secret Key.  Make a
note of these, to load into Globus.

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithKey.png"
   alt="The Create Access Key page, showing the newly-created Access Key and Secret Key."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

{% include info-box.html
   icon="warning"
   header="Safeguard these credentials!"
   content="This is the only time you will be shown the Secret Key.  Keep that information somewhere safe."
%}



## Loading Credentials into Globus



With an Access Key configured, you can now upload your credentials to Globus.

Using the link at the top of the page, access the Elm collection.  You might be
asked to log in; if so, log in through *Stanford University*.



{% include hero-image.html
   src="/assets/cloud/ElmCollectionwithCredentials.png"
   alt="The Elm collection, with the Credentials tab hilighted."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

You will be taken to the main page for the collection.  Click on the
'Credentials' tab.

{% include hero-image.html
   src="/assets/cloud/ElmCollectioncredentialsconsent1.png"
   alt="A prompt to give Globus consent to manage your Elm credentials."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

If this is the first time you accessed this collection, you will be asked to
give consent for Globus to store your Elm credentials.  Click 'Continue'.

{% include hero-image.html
   src="/assets/cloud/Consentidentityselection.png"
   alt="A prompt to select an identity for giving consent."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Some institutions allow you to have multiple accounts.  Stanford only allows
one SUNetID per person, so click on your SUNetID.

{% include hero-image.html
   src="/assets/cloud/ElmCollectioncredentialsconsent2.png"
   alt="A prompt to give consent to the Globus Web app to manage your IAM User credentials in the S3 collection."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Finally, click on 'Allow' to give Globus permission to store your Elm
credentials.

{% include hero-image.html
   src="/assets/cloud/ElmCollectioncredentialentry.png"
   alt="A form to enter your IAM User's Access Key ID and Secret Access Key."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Once consent is granted, you will be asked to enter your Elm credentials.
Enter the Access Key and Secret Key from when you <a
href="#creating-an-access-key">created your access key</a>.

{% include hero-image.html
   src="/assets/cloud/ElmCollectionCredentialList.png"
   alt="The credentials page after an Access Key has been entered, showing the Access Key ID and associated Globus identity."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

If you go to the Credentials tab after entering an Access Key, you
will see the Access Key ID, along with an option to replace the credential (the
gear icon) or delete the credential (the trashcan icon).

{% include info-box.html
   icon="clock"
   header="Rotate credentials regularly"
   content="You should rotate credentials—generating a new Secret Key—once every three months."
%}

You should now proceed to accessing the collection!

## Accessing Files on Elm

With Elm Access Key loaded and permissions granted, you may now proceed to
access your data on Elm through Globus!

Using the link at the top of the page, access the Elm collection.  You might be
asked to log in; if so, log in through *Stanford University*.

{% include hero-image.html
   src="/assets/cloud/ElmCollectionwithOverviewandFileManager.png"
   alt="The Elm collection, with the Overview tab and File Manager buttons hilighted."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Click on the "Open in File Manager" button.  That will take you to the File
Manager and connect to Elm.

### First-Time Access

The first time you access the Elm collection, you will be asked for consent.

{% include hero-image.html
   src="/assets/cloud/ElmFileManagerWithConsentScreen.png"
   alt="The Elm collection, saying that consent is required."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

When you first loaded your credentials, you gave Globus consent to store those
credentials for you.  Now, you are giving Globus consent to actually use those
credentials to talk to Elm.  Click the "Continue" button.

{% include hero-image.html
   src="/assets/cloud/Consentidentityselection.png"
   alt="A prompt to select an identity for giving consent."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Some institutions allow you to have multiple accounts.  Stanford only allows
one SUNetID per person, so click on your SUNetID.

{% include hero-image.html
   src="/assets/cloud/ElmCollectionAccessConsent.png"
   alt="A prompt to give consent to the Globus Web app to access Elm on your behalf."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Finally, click on 'Allow' to give Globus permission to use your AWS IAM User
credentials to access Elm.

### Subsequent Accesses

When you access the S3 collection—assuming you have previously provided
consent—you should be greeted with a list of the buckets from Elm.

{% include hero-image.html
   src="/assets/cloud/ElmFileManagerRoot.png"
   alt="The File Manager showing the root of the Elm collection, listing buckets."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

To access one of the buckets—*assuming your Access Key has
permissions*—double-click on the bucket's name.

{% include hero-image.html
   src="/assets/cloud/ElmFileManagerBucket.png"
   alt="The File Manager showing the root of an S3 bucket."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

If your Access Key does not have permissions, attempting to list the contents of
the bucket will give an error.

{% include hero-image.html
   src="/assets/cloud/ElmFileManagerListingError.png"
   alt="The File Manager, showing an erorr when trying to access a bucket in the Elm collection."
   caption-overlay=false
   caption-header=""
   caption-text=""
%}

Once you have access to a bucket, you can transfer files in and out like any
other Globus collection.

{% include info-box.html
   icon="weight-hanging"
   header="Big Data is Best"
   content="Elm works best with large files (hundreds of megabytes and larger).  If you are thinking of uploading smaller files, you may wish to combine them into a larger `.tar` or `.zip` file before you upload them to Elm."
%}

{% include info-box.html
   icon="hourglass"
   header="Expect Slow Restores"
   content="Data on Elm are eventually sent to tape.  File listing will be fast, but downloads from Elm will be slower than expected, and you may see timeouts."
%}
