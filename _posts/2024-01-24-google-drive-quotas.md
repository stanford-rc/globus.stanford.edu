---
layout:  post
news: true
toc: false
   
news: true
toc: false
title:       Google Drive quotas, and using Globus for Drive migrations.
excerpt:     Future changes to Google Drive quotas will not prevent users from using Globus to transfer data. Learn about migrating data from Google Drive with Globus.
---
{% include note.html
   content=
'The information below may be out-of-date. Check [Transitioning to a
Sustainable Google
Workspace](https://uit.stanford.edu/news/transitioning-sustainable-google-workspace) for the latest updates.' 
%}


On January 23, University IT posted the news article [Transitioning to a
Sustainable Google
Workspace](https://uit.stanford.edu/news/transitioning-sustainable-google-workspace).
The article talks about changes coming to Stanford Google Drive.  At a glance,
the changes are…

* A 50 GB storage limit will be applied to My Drive and each shared drive.

* Starting ~~Sept. 1, 2024~~, the storage limit will be enforced for drives with
  more than 500 GB.
  ***Updated Aug. 7, 2024:*** The enforcement of any storage limit for Google My Drive and shared drives will begin no sooner than March 1, 2025, with billing deferred accordingly. During this period, drives will not switch to "read-only."

* Starting Sept. 1, 2025, the storage limit will be enforced for drives with
  more than 50 GB.

* Additional storage may be purchased starting Aug. 1, 2024, at a rate of $0.15
  per GB per year in Fiscal Year 2025.

* Policies for shared drive creation and lifecycle management will be announced
  soon.

## Globus Transfers with Google Drive quotas

**Globus will still work to transfer data to & from Google
Drive**, even after the transition.  Globus already supports platforms that
have storage quotas.  If you hit a storage quota during a transfer, Globus will
react one of two ways, depending on the transfer setting "Fail on quota
errors".

{% include figure.html
   src='/assets/posts/2024/TransferSyncoption.png'
   alt='A Globus File Manager window, showing transfer and sync options.  The _Fail on quota errors_ option is highlighted.'
   caption='Controlling what happens when there is a quota error.'
%}

When you are preparing a Globus transfer, if you go to the *Transfer & Timer
Options*, you will see an option to "Fail on quota errors".

Whenever Globus hits a storage quota, it reacts as if this is a temporary
error:  Globus will retry the transfer every few minutes, giving up after
approximately two days.  This gives you time to notice the problem and react
(by removing other files, or by obtaining additional storage quota).

If the "Fail on quota errors" option is enabled, when Globus hits a storage
quota, the transfer will fail immediately.  This will trigger an email
notification.  You will then have to react (removing files, obtaining
additional quota, etc.) and restart the transfer.  In this case you might want
to enable the "sync" option to only transfer files that were not already
transferred.

## Using Globus for data migration

This announcement will likely trigger data migrations off of Google Drive.  If
you are planning to migrate data off of Google Drive, Globus might be an option
for you!  To reduce the number of migration problems, there are some steps you
should take before a migration.

* **Separate Google app files**: Google applications—Drive, Sheets, Slides,
  etc.—all appear to store files in Google Drive.  *This is not true.*  The
  'files' you see do not contain data, they contain a pointer to the data
  within the specific Google product.  Most of the time, the 'files' just
  contain a unique Google Docs/Sheets/Slides/etc. ID number.

  If you use Globus to migrate data, those types of files will either generate
  an error, or will create a file on the destination which only contains the
  pointer.  This can cause confusion.

  Instead, it is better to separate those 'files' into their own part of your
  Google Drive.

* **Old versions will be ignored**: Google Drive supports keeping older
  versions of files.  Globus is only able to access the latest version, and
  will not transfer older versions of files.

* **Custom permissions will be ignored**: If something in Google Drive has
  custom permissions, those permission will not be applied at the destination.
  You will need to re-apply those custom permissions after the files have been
  transferred to their destination.

* **Empty directories might not transfer**: Some cloud services—particularly
  Amazon S3, and services that act like S3—do not support directories that are
  empty.  If you have empty directories in Google Drive, those might not
  transfer.

* **Your destination might have other requirements**: For example,
  [OneDrive]({{ "/cloud/onedrive.html" | relative_url }}) has unique
  restrictions on file sizes.  As you consider where to migrate data, [Globus
  and the Cloud]({{ "cloud.html" | relative_url }}) has the list of cloud services
  we support, and each cloud service has a page explaining the limits that
  apply.  You should take those limits into account.

* **Transfers will take time**: Of the services Globus supports, Google Drive
  has some of the strictest transfer quotas and bandwidth limits.  Transfers
  may end up taking longer than you expect.

## Questions and Migration support

If you have questions about the Google Drive changes, check out the [transition
announcement](https://uit.stanford.edu/news/transitioning-sustainable-google-workspace)
and the [UIT project
page](https://uit.stanford.edu/project/google-workspace-optimization).  If
those resources do not answer your question, check out the
[FAQ](https://uit.stanford.edu/project/google-workspace-optimization/FAQs),
which will tell you where to go.

If you have questions about using Globus for the migration, your first contact
should be to your local IT support.  After that, see our [support
page]({{ "support.html" | relative_url }}) to learn how to reach out to us.

{% include info-box.html
   icon="clock"
   header="Sooner is better!"
   content="UIT has a limited number of Globus subject-matter experts.  Support will be provided in the order requests are received, so start working on migrating now!"
%}
