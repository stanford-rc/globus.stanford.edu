---
layout:      page
toc:  true
title:       Globus and Elm
see-also: true
id: cloud
description: Globus works with Elm, but with a number of restrictions.
---

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

Globus has a number of limitations when working with Elm.  These limits
do not affect most common use cases, but they might affect you, so you should
review them before starting to use Globus with Elm.

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
appropriate workgroup, you should [log in to
Elm](https://campus.elm.stanford.edu:9001/browser).  After going through
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

Below, fill in the names of the buckets you want to access through Globus, and
choose if you want to allow Globus to upload and/or delete files.


```
{
 "Version": "2012-10-17",
 "Statement": [
  {
   "Effect": "Allow",
   "Action": [
    "s3:ListAllMyBuckets",
    "s3:GetBucketLocation"
   ],
   "Resource": [
    "arn:aws:s3:::*"
   ]
  },
  {
   "Effect": "Allow",
   "Action": [
    "s3:ListBucket",
    "s3:ListBucketMultipartUploads"
   ],
   "Resource": [
    "arn:aws:s3:::allcats" <------ ONE LINE PER BUCKET
   ]
  },
  {
   "Effect": "Allow",
   "Action": [
    "s3:DeleteObject",               <------- If allowing deletions
    "s3:PutObject",                  <------\
    "s3:ListMultipartUploadParts",   <------|- If allowing uploads
    "s3:AbortMultipartUpload",       <------/
    "s3:GetObject"
   ],
   "Resource": [
    "arn:aws:s3:::allcats/*" <------ ONE LINE PER BUCKET
   ]
  }
 ]
}
```

Replace the default Current User Policy with the custom policy above, and click
"Create":

{% include hero-image.html
   src="/assets/cloud/ElmCreateAccessKeyWithPolicy.png"
   alt="The Create Access Key page, with a name and policy filled in."
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
