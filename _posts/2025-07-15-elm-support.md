---
layout:  post
news: true
toc: false
title:       Introducing the Elm Cold Storage Service!
excerpt:     Today, Stanford Resaerch Computing introduces the Elm Cold Storage Service.  It works with Globus!  Read on for more information.
---

[Elm](https://uit.stanford.edu/service/elm-storage) is Stanford Research
Computing’s answer to the growing data archiving needs of the research
community. Built with cutting-edge, open-source technology, Elm offers a fast,
scalable, vendor-neutral and cost-efficient platform for storing large datasets
that require long-term retention with infrequent access, making it ideal for
archival and compliance purposes.

Today, Elm is now available for the Stanford community!  We are also happy to
announce that Elm storage is also available through Globus!

Elm is exposed to clients as an S3 service, but with some differences.  In
particular:

* When you order Elm, you order storage quota.  In other words, you pay for the
  storage you are allowed to use, not the storage you are actually using.

* Elm prefers larger files, not smaller files.  Elm has a limit of 10,000
  objects (files) for every 1 TiB of storage quota.  Elm support files up to 5
  TiB in size; the larger the better.

* After one month, your files are moved to on-campus tape storage.  Although
  directory listings are fast, downloads from tape are slow.  You will see
  timeouts when moving data out of Elm, but the transfers will eventually make
  progress.

If you are interested in ordering Elm Cold Storage, start at University IT's
[Elm Cold Storage service page](https://uit.stanford.edu/service/elm-storage).

When you are ready to access Elm through Globus, check out our [Globus and
Elm]({{ "/cloud/elm.html" | relative_url }}) page for known limitations,
instructions on how to create an Access key, and instructions on how to load
that key in to Globus.
