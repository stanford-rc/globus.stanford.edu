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

{% include info-box.html
   icon="stream"
   header="Custom Metadata & Permissions Not Supported"
   content="Globus does not copy or set any custom tags, metadata, versions (other than the latest), ACLs, or additional checksum algorithms from objects it transfers.  Uploaded objects inherit bucket-wide settings and will use the bucket's default storage class and encryption."
%}

{% include info-box.html
   icon="folder-open"
   header="Empty Folders Not Supported"
   content="Amazon S3 does not support empty folders.  If you try to transfer an empty folder, the transfer will succeed but no folder will be created."
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

Google Drive may be accessed through the [Stanford Google Drive
(DEV)](https://app.globus.org/file-manager/collections/e1c8858b-d5aa-4e36-b97e-95913047ec2b/overview?back=endpoints)
collection.

{% include info-box.html
   icon="wrench"
   raw=collection-under-construction
%}

{% include info-box.html
   icon="biohazard"
   header="No High Risk Access allowed"
   content="Some users are able to able to store High Risk data (including PHI) in Google Drive.  If you are part of this group, you are not allowed to use Globus to access that data."
%}

{% include info-box.html
   icon="stream"
   header="Custom Metadata & Permissions Not Supported"
   content="Globus does not copy any permissions from items it downloads.  Uploaded items will inherit the permissions of the parent folder."
%}

{% include info-box.html
   icon="unlink"
   header="Google-specific files can not be transferred"
   content="Globus is not able to properly upload or download 'files' which are created by Google products, such as Docs, Sheets, Slides, etc..  Attempting to transfer such items will result in an error."
%}

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
