---
layout:      page
toc:  true
permalink: cloud.html
title:       Globus and the Cloud
see-also: true
id: cloud
description: Stanford has licensed various cloud add-ons for Globus, described here.
---

<div class="well">
Globus supports transferring data to and from many different cloud services, as
add-ons to a standard Globus subscription.  Although we have license to use
them, not all of them are available today.  
</div>

Here is a list of what is (and is not) supported.  Click on a cloud service's
name for more information.

| Cloud Service | Available Today? |
|---------------|-----------------------|
| <a href="#amazon-s3">Amazon S3</a> | ✅ |
| <a href="#s3-compatible-storage">S3-compatible storage</a> | ✅ |
| <a href="#box">Medicine Box</a> | ❌ |
| <a href="#ceph">Ceph</a> | ❌ |
| <a href="#dropbox">Dropbox</a> | ❌ |
| <a href="#elm">Elm</a> | ✅ |
| <a href="#google-cloud-storage">Google Cloud Storage</a> | ✅ |
| <a href="#google-drive">Google Drive</a> | ✅ |
| <a href="#irods">iRODS</a> | ❌ |
| <a href="#microsoft-azure-blob-storage">Microsoft Azure Blob Storage</a> | ❌ |
| <a href="#microsoft-onedrive">Microsoft OneDrive</a> | ✅ |
| <a href="#oracle-cloud-infrastructure-oci-object-storage">Oracle Cloud (OCI) Object Storage</a> | ❌ |
| <a href="#wasabi">Wasabi</a> | ✅ |

&nbsp;

{% capture collection-under-construction %}
<h4>Under Construction</h4>
<p>This collection is still under construction, and is likely going to change
in the future.  If you run into problems accessing it, contact us for <a href="support.html">support.</a></p>
{% endcapture %}

# Amazon S3

Amazon S3 buckets—in all regions other than China—may be accessed through the
[Stanford Amazon (AWS)
S3](https://app.globus.org/file-manager/collections/483837a5-663b-407a-9168-9ec98f82ff36/overview)
collection.

If you need to access a requester-pays bucket, you may do so through the
[Stanford Amazon (AWS) S3
Requester-Pays](https://app.globus.org/file-manager/collections/f73507db-2379-4927-9f45-c91af223c794/overview)
collection.

[Go here for detailed information on how to use Globus with Amazon S3]({{ "cloud/s3.html" | absolute_url }}).

Using Globus with Amazon S3 requires an IAM User with appropriate permissions
to list buckets, list objects within buckets, download objects, (optionally)
upload objects (which includes managing multi-part uploads), and (optionally)
delete objects.  Globus' documentation [has an example IAM
Policy](https://docs.globus.org/premium-storage-connectors/v5.4/aws-s3/#permissions-anchor),
or [see the step-by-step instructions]({{ "cloud/s3.html" | absolute_url }}).

Globus for Amazon S3 supports working with buckets in other accounts
(cross-account access), as long as access is granted directly to your IAM User.
Access via IAM Roles is _not_ supported.  *Both* you *and* the account owner
must give your IAM User access to the bucket.

Globus does not support Requester-Pays buckets, but this feature has been
requested.  An announcement will be posted when this feature is available.

Globus also does not support custom metadata/tags, ACLs, and additional checksum
algorithms.  Only the latest version of objects will be accessed.  Uploaded
objects will be placed into the S3 Standard storage class.

# S3-compatible storage

The Globus S3 connector supports more than just Amazon S3.  If you run a
storage platform that supports the S3 API, the Globus-for-S3 add-on may support
it.

As of this page's last update, besides Amazon S3, we are aware of the Globus S3
connector being used with Dell EMC ECS on-prem, and with Wasabi (as mentioned
later on this page).

If you would like to use the Globus S3 connector with your own storage
platform, you may do so!  You will need to set up a [Globus Connect Server v5
endpoint](https://docs.globus.org/globus-connect-server/v5.4/), along with [an
S3 storage
gateway](https://docs.globus.org/premium-storage-connectors/v5.4/aws-s3/) and
at least one mapped collection.

For compability across multiple products, the Globus S3 connector uses a
limited subset of the S3 REST API.  Your storage platform will need to support
the following aspects and operations:

* For authentication, v4 signatures are used with Access Keys and Secret Keys.

* Globus uses path-style for bucket access, instead of virtual-host style.

* Globus makes a `GetBucketLocation` call before anything else, to identify
  which Amazon S3 region's endpoint should be used.  As long as your storage
  platform returns something (instead of an error), Globus will ignore
  responses it cannot parse.  If your platform has multiple instances or
  endpoints, you may need a separate storage gateway for each.

* The `ListObjects` and `GetObject` calls are used for directory listings and
  downloads, respectively.  Globus follows the convention of using the
  forward-slash character as a 'directory' separator.

* Uploading objects use the following operations: `PutObject`,
  `ListMultipartUploads`, `ListParts`, `CreateMultipartUpload`,
  `CompleteMultipartUpload`, `UploadPart`, and `AbortMultipartUpload`.

* Deleting objects uses the `DeleteObject` operation.

Unfortunately, SRCC are unable to host or administer a Globus endpoint for your
storage connector, but you may still [contact
us](mailto:srcc-support@stanford.edu) for general advice.

# Box

Although Stanford's subscription does support the Box connector, University IT
does not provide Box storage as a service.

The School of Medicine does offer a Box instance—known as "Medicine Box"—but
Stanford's Globus subscription has not gone through the necessary Security &
Privacy reviews for access to High Risk data, so access to Medicine Box is
blocked.

# Ceph

{% include info-box.html
   header="Object Storage Only"
   content="The Ceph add-on for Globus only supports Ceph object storage.  If you want to access Ceph file storage (CephFS), you should use a normal Globus (POSIX) collection."
%}

Although Stanford's subscription does support the Ceph (object storage)
connector, University IT does not provide Ceph storage as a service.

If you run your own Ceph service, you may be able to [run your own Globus
endpoint]({{ "server5.html" | relative_url }}) with the Ceph connector.  [Contact
us](mailto:srcc-support@stanford.edu) if you are interested in this.

# Dropbox

Although Stanford's subscription does support the Dropbox connector, University
IT does not provide Dropbox storage as a service.

Some groups within the University do use Dropbox.  If you use Dropbox, you may
be able to [run your own Globus endpoint]({{ "server5.html" | relative_url }})
with the Dropbox connector.  [Contact us](mailto:srcc-support@stanford.edu) if
you are interested in this. 

# Elm

Elm may be accessed through the [Stanford Elm Storage (project:
campus)](https://app.globus.org/file-manager/collections/0e458bf0-7fde-42bb-8622-42a5d00c5b61/overview)
collection.

[Go here for detailed information on how to use Globus with Elm]({{ "cloud/elm.html" | absolute_url }}).

Using Globus with Elm requires an Access Key with appropriate permissions to
list buckets, list objects within buckets, and download objects.  You can
optionally provide permission to upload objects and delete objects.  The
[step-by-step instructions]({{ "cloud/elm.html" | absolute_url }}) has a [User
Policy Generator]({{ "cloud/elm.html#user-policy-generator" | absolute_url }}),
which will create the appropriate IAM policy for you.

Elm works best with large files (hundreds of megabytes and larger).  If you are
thinking of uploading smaller files, you may wish to combine them into a larger
`.tar` or `.zip` file before you upload them to Elm.

Globus also does not support custom metadata/tags, ACLs, and additional checksum
algorithms.  Only the latest version of objects will be accessed.

# Google Cloud Storage

{% capture google-account-required %}
<h4>Stanford Google Account Required</h4>
<p>To access Google Cloud Storage, you need a Stanford Google account.  If you
have Stanford email, you have a Stanford Google account.  If you do not have
Stanford email, you & your sponsor should read about <em><a title="Stanford Google Workspace ID for Base SUNet IDs" href="https://uit.stanford.edu/service/accounts/googleworkspace-id">Stanford Google Workspace ID for Base SUNet IDs</a></em>.</p>
{% endcapture %}
{% comment %}
Capture is in the Google Cloud Storage section, above
{% endcomment %}
{% include info-box.html
   icon="id-card"
   raw=google-account-required
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some Google Cloud accounts are allowed to store High Risk data (including PHI).  Such accounts are not allowed to use Globus."
%}

Google Cloud Storage may be accessed through the [Stanford Google
Cloud](https://app.globus.org/file-manager/collections/1a7d4931-986a-42f5-80fc-1fafe28f9826/overview)
collection.

[Go here for detailed information on how to use Globus with Google Cloud Storage]({{ "cloud/cloud.html" | absolute_url }}).

When using Google Cloud Storage, Globus will act on your behalf.  You will be
able to access any buckets outside of the VPC Service Perimeter.  In other
words, you will not be able to access buckets associated with Nero projects,
and other High Risk projects.

# Google Drive

{% capture drive-limits %}
<h4>Incoming Google Drive limits</h4>
<p>Starting September 1, 2024: Google Drive spaces
(including your 'My Drive' space and all Shared Drives) will have a 50 GB quota.
<b><a title="Transitioning to a Sustainable Google Workspace" href="https://uit.stanford.edu/news/transitioning-sustainable-google-workspace">Read the transition announcement</a></b>.</p>
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

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some users are able to able to store High Risk data (including PHI) in Google Drive.  If you are part of this group, you are not allowed to use Globus to access that data."
%}

Google Drive may be accessed through the [Stanford Google Drive
](https://app.globus.org/file-manager/collections/e1c8858b-d5aa-4e36-b97e-95913047ec2b/overview?back=endpoints)
collection.

[Go here for detailed information on how to use Globus with Google Drive]({{ "cloud/drive.html" | absolute_url }}).

When using Globus with Google Drive, Globus will act on your behalf.  You will
be able to access files on your own Drive, on Shared Drives (formerly known as
Team Drives), and to folders & items Shared With You.

Globus does not support setting or copying custom permissions.  Uploaded items
will inherit the permissions of the parent folder.

Globus is also not able to copy Drive Shortcuts.  Drive Shortcuts are similar
to shortcuts on Windows or aliases on macOS.  At this time, Globus is not able
to copy or follow Shortcuts; attempting to copy a Shortcut will create an empty
file at the destination, and generate a checksum (integrity-checking) error.
Support for Shortcuts is currently on Globus' backlog for implementation.

Finally, Globus is not able to copy 'files' which are created by Google
products, such as Docs, Sheets, Slides, etc..  Google does not actually store
data for Google products in Drive; instead, Drive holds a 'pointer' to the
specific Google product.  Attempting to copy these 'files' will generate an
error.

# iRODS

Although Stanford's subscription does support the iRODS connector,
University IT does not provide iRODS storage as a service.

If you run your own iRODS installation, you may be able to [run your own Globus
endpoint]({{ "server5.html" | relative_url }}) with the iRODS connector.  [Contact
us](mailto:srcc-support@stanford.edu) if you are interested in this.

# Microsoft Azure Blob Storage

Stanford's subscription supports the Microsoft Azure Blob Storage connector.

Microsoft Azure Blob Storage has unique properties that make it different to
Amazon S3 and Google Cloud Storage.  For that reason, before we provide an
Azure Blob Storage Globus service, we would like to hear from existing Azure
Blob Storage users.

If you use Microsoft Azure Blob Storage within the University, and you are
interested in accessing it through Globus, please [reach
out](mailto:srcc-support@stanford.edu)!

# Microsoft OneDrive

{% include info-box.html
   icon="id-card"
   header="Full SUNetID Required"
   content="To interact with Microsoft services through Stanford, you must have a full or full-sponsored SUNetID.  Therefore, using the Globus OneDrive connector also requires a full (or full-sponsored) SUNetID."
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some users are able to able to store High Risk data (including PHI) in Microsoft OneDrive.  If you are part of this group, you are not allowed to use Globus to access that data."
%}

Microsoft OneDrive may be accessed through the [Stanford OneDrive](https://app.globus.org/file-manager/collections/9beecf19-601f-47b9-a15b-a0f34845abb1/overview)
collection.

[Go here for detailed information on how to use Globus with Microsoft OneDrive]({{ "cloud/onedrive.html" | absolute_url }}).

When using Globus with Microsoft OneDrive, Globus will act on your behalf.  You
will be able to access files on your own OneDrive, files shared with you by
others in Stanford University, and files in Stanford University
SharePoint sites.

Globus does not support setting or copying custom permissions.  Uploaded items
will inherit the permissions of the parent folder.

**Globus is not able to access non-University content**.  That includes things
shared by folks outside of Stanford University, and it also includes things
shared by members of Stanford Health Care and Stanford Children's Health.

# Oracle Cloud Infrastructure (OCI) Object Storage

Although Stanford's subscription does support the Oracle Cloud Infrastructure
(OCI) Object Storage connector, University IT does not provide Oracle Cloud as
a service.

OCI Object Storage uses the S3 protocol, and Globus has validated its use with
OCI.  If you use OCI Object Storage, you may be able to [run your own Globus
endpoint]({{ "server5.html" | relative_url }}) with the S3 connector,
configured to talk to OCI Object Storage.  [Contact
us](mailto:srcc-support@stanford.edu) if you are interested in this.

# Wasabi

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some Wasabi accounts are allowed to store High Risk data (including PHI).  Such accounts are not allowed to use Globus."
%}

Access to Wasabi is possible throguh region-specific collections:

* **us-west-1**: [SRCC Oak Wasabi S3](https://app.globus.org/file-manager/collections/0ffbca77-d3ca-463f-b564-690366dd2625/overview)

**You must use the collection specific to your Wasabi region.**  Wasabi accounts
created through Stanford University IT are placed into the us-west-1 region by
default.  If you need access to a different region, [let us
know](mailto:srcc-support@stanford.edu).





