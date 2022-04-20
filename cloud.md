---
layout:      left-sidebar
title:       Globus and the Cloud
title_line:  true
description: Stanford has licensed various cloud add-ons for Globus, described here.
---

<div class="well">
Globus supports transferring data to and from many different cloud services, as
add-ons to a standard Globus subscription.  Stanford has licensed some of these
add-ons for use by the campus community.  
</div>

Here is a list of what is (and is not) supported.  Click on a cloud service's
name for more information.

| Cloud Service | Supported & Licensed? |
|---------------|-----------------------|
| <a href="#amazon-s3">Amazon S3</a> | ✅ |
| <a href="#s3-compatible-storage">S3-compatible storage</a> | ✅ |
| <a href="#stanford-box">Stanford Box</a> | ✅ |
| <a href="#stanford-box">Medicine Box</a> | ❌ |
| <a href="#ceph">Ceph</a> | ❌ |
| <a href="#google-cloud-storage">Google Cloud Storage</a> | ✅ |
| <a href="#google-drive">Google Drive</a> | ✅ |
| <a href="#irods">iRODS</a> | ❌ |
| <a href="#microsoft">Microsoft Azure Blob Storage</a> | ❌ |
| <a href="#microsoft">Microsoft OneDrive</a> | ❌ |
| <a href="#wasabi">Wasabi</a> | ✅ |

&nbsp;

{% capture collection-under-construction %}
<h2>Under Construction</h2>
<p>This collection is still under construction, and is likely going to change
in the future.  If you run into problems accessing it, check the announcements
(on the home page) to see if things have changed!</p>
{% endcapture %}

# Amazon S3

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

Amazon S3 buckets—in all regions—may be accessed through the [SRCC SCG AWS
S3](https://app.globus.org/file-manager/collections/6122aa2f-bd3f-4474-b8bf-691c35397822/overview)
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

# Stanford Box

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

{% include info-box.html
   icon="biohazard"
   header="Medicine Box Unavailable"
   content="Although Stanford has a site license for using the Globus add-on for Box, access to Medicine Box is blocked for security reasons."
%}

{% include info-box.html
   icon="stream"
   header="Custom Metadata & Permissions Not Supported"
   content="Globus does not copy any custom metadata or permissions from files it downloads.  Uploaded items will inherit the permissions of the parent folder."
%}

Stanford Box may be accessed through the [Stanford Box
(DEV)](https://app.globus.org/file-manager/collections/9988335d-9800-47e6-9645-0d2813c4707e/overview)
collection.

This collection gives you access to your Box files, as well as to folders which
have been shared with you.

When uploading, Globus will respect the permissions set on the destination; if
you do not have write permission, uploads will fail with a "Permission Denied"
error.

# Ceph

{% include info-box.html
   header="Object Storage Only"
   content="The Ceph add-on for Globus only supports Ceph object storage.  If you want to access Ceph file storage (CephFS), you should use a normal Globus (POSIX) collection (for which we do have a license."
%}

At this time, Stanford does not have a license for the Ceph (object storage)
add-on.  If you are interested in using this add-on, [contact
us](mailto:srcc-support@stanford.edu) to learn about the costs involved.

# Google Cloud Storage

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some Google Cloud accounts are allowed to store High Risk data (including PHI).  Such accounts are not allowed to use Globus."
%}

Access to Google Cloud Storage is possible through region-specific collections.

**You must use the collection specific to your bucket's region.**  Multi-region
buckets may be accessed through any region in the area.  If you need access to
a different region, [let us know](mailto:srcc-support@stanford.edu).

Both you and us will need to do a certain amount of setup work before accessing
Google Cloud Storage through Globus.  [Contact
us](mailto:srcc-support@stanford.edu) for more information!

# Google Drive

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some users are able to able to store High Risk data (including PHI) in Google Drive.  If you are part of this group, you are not allowed to use Globus to access that data."
%}

Google Drive may be accessed through the [Stanford Google Drive
(DEV)](https://app.globus.org/file-manager/collections/e1c8858b-d5aa-4e36-b97e-95913047ec2b/overview?back=endpoints)
collection.

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

In order to access Google Drive, you will need to provide two sets of consents:

• You will need to provide the standard concent for the Globus web site to
  access the collection on your behalf.

• You will also be sent to Google to log in and give the collection permission
  to access Google Drive on your behalf.

Once fully authorized, you will be able to access both your own Drive and the
Shared Drives to which you have access (through Globus uses the older "Team
Drive" terminology).  Quick access is also provided to starred items and to
items which have been shared with you.

When uploading, Globus will respect the permissions set on the destination; if
you do not have write permission, uploads will fail with a "Permission Denied"
error.

# iRODS

At this time, Stanford does not have a license for the iRODS community add-on.
If you are interested in using this add-on, [contact
us](mailto:srcc-support@stanford.edu) to learn about the costs involved.

# Microsoft

At this time, Stanford does not have a license for either the Microsoft Azure
Blob Storage add-on or the Microsoft OneDrive add-on.  If you are
interested in using this add-on, [contact us](mailto:srcc-support@stanford.edu)
to learn about the costs involved.

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

You will need to do a certain amount of setup work before accessing Wasabi
through Globus.  [Contact us](mailto:srcc-support@stanford.edu) for more
information!

{% include left-sidebar/transition.md %}

{% include toc.html id="cloud" %}
