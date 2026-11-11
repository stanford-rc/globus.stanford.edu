---
layout: post
news: true
toc: false

title: "Automatic removal of inactive Cloud Guest Collections"
excerpt: If you have a Guest Collection being hosted on one of our Globus Cloud Collections, and it hasn't been used in the past 18 months, it will be deleted soon.
---

Today we are announcing a policy on inactive Globus Guest Collections, for
Guest Collections that are hosted on one of our [Globus Cloud
Collections]({{ "cloud.html" | relative_url }}).

Guest Collections that have been inactive for 18 months will be deleted.
We plan on implementing this policy on Monday, November 23, 2026.

Any activity—even a single directory listing operation—is enough to 'reset the
clock' on a Guest Collection's inactivity.

# Who is affected by this?

This policy applies only to Guest Collections that are hosted on any of the
Mapped Collections listed on the [Globus Cloud
Collections]({{ "cloud.html" | relative_url }}) page.  Other Globus
Endpoints will have their own policies around Guest Collections.

The majority of 'Cloud Guest Collections' are active, having been used at some
point within the past month.  *We expect this policy to affect less than ten
Guest Collections immediately.*

## Will affected users be notified?

For the Guest Collections that are being deleted on November 23, we are
notifying Guest Collection owners directly.

After November 23, as other Guest Collections become inactive, Globus will
notify owners automatically, in advance of deletion.

## Will I lose any data?

No.  **Deleting a Guest Collection does not delete data**.  We are only
deleting the Globus Guest Collection record that enables sharing, we are not
deleting any files or directories.

# Why delete inactive Guest Collections?

Guest Collections require a certain amount of server and administrator
resources in order to maintain.  Removing inactive Guest Collections ensures
resources can be directed towards things that are in use.

Also, the longer something is shared without being used, the greater the risk
that something is shared inappropriately.  See [*Is Your Google Drive Sharing
More Than You
Realize?*](https://uit.stanford.edu/news/your-google-drive-sharing-more-you-realize)
(February 2026) and [*Stanford community urged to purge unneeded
data*](https://news.stanford.edu/stories/2017/12/stanford-community-urged-purge-unneeded-data)
(2017).

Since some projects operate on a yearly cadence, we feel that 18 months of
inactivity is enough to justify deletion.

If you have any other questions, you can reach out to Stanford Research
Computing at [srcc-support@stanford.edu](mailto:srcc-support@stanford.edu).
