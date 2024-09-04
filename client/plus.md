---
layout:      page
toc:  true
title:       Globus Plus
id: client
description: Enabling Globus Plus
permalink: /client/plus.html
see-also: true
---

If you would like to give other people access to content that is only
accessible with Globus Connect Personal (for example, because that content
lives on your laptop or desktop), you will need to create a _Guest Collection_.
In order to create a Guest Collection with Globus Connect Personal, you will
need access to a feature called _Globus Plus_.  This page explains how to
configure Globus Plus and start sharing.

{% include info-box.html
   header="Full (and full-sponsored) accounts only"
   icon="university"
   content="Globus Plus is only available to people who have a full-service (or full-sponsored) account.  If you have Stanford email, then you can use Globus Plus!"
%}

{% include info-box.html
   icon="exclamation-circle"
   header="Stanford endpoints only"
   content="When you create a new Globus Connect Personal endpoint, you attach it to a Globus identity.  Globus Plus will only work for Personal endpoints attached to a Stanford identity (identities ending in `@stanford.edu`)."
%}

{% include info-box.html
   icon="question-circle"
   header="You might not need Globus Plus"
   content="You only need Globus Plus if you want to give other people access to some of the files on your computer.  If you want to share content on a server (running Globus Connect Server), Globus Plus is not needed."
%}

{% include info-box.html
   icon="lock"
   header="Beware High-Risk Data"
   content="If your endpoint is used with High Risk data, then you may not run Globus Connect Personal on it."
%}

The first step is to ask that Globus Plus be enabled on your account.

## Enable Globus Plus

The ability to make Globus Connect Personal Guest Collections (a feature known
originally as "Globus Plus") is granted by giving you access to premium Globus
features.  This is implemented by adding you to a Globus Group.

You only need to do this once, even if you have multiple Globus Connect
Personal endpoints attached to your Stanford Identity.

To get access to our Globus subscription, email [srcc-support@stanford.edu](mailto:srcc-support@stanford.edu?subject=Please Enable Globus Plus&body=Hello!  My SUNetID is X.  Please give me access to Globus Plus through Stanford, so that I can use Globus Connect Personal to share Low- and Moderate-Risk files that I have on my endpoint.).
Send the email from your Stanford email.  In the email, provide your SUNetID,
and say that you would like access to Globus Plus through Stanford.  You should
receive a response within two business days.

When Research Computing Support processes your request, you will receive an
invitation to join the _Stanford_ Globus Group as a member.  Click on the link
that says "Click here to apply for membership."

{% include hero-image.html
   src="/assets/client/GlobusPlusGroupJoinEmail.jpg"
   alt="Part of an email from Globus, inviting the recipient to join the 'Stanford University Globus Plus Group'"
   caption-overlay=true
   caption-header=""
   caption-text=""
%}

Accepting the invitation will send you to the Globus web site (be sure to log
in through _Stanford University_), where you will be be asked to confirm your
information and read & agree to terms.

{% include hero-image.html
   src="/assets/client/GlobusPlusGroupJoinRequest.png"
   alt="The Globus web site, showing the Groups page, and displaying a screen asking the user to confirm that they want to join a group.  This involves filling in name & organization, and agreeing to terms"
   caption-overlay=true
   caption-header="Agreeing to terms of subscription access"
   caption-text=""
%}

Once you accept the invitation, you will receive a confirmation that your
membership is active.

{% include hero-image.html
   src="/assets/client/GlobusPlusGroupJoinConfirmation.png"
   alt="The Globus web site, confirming that the user is an active member in the 'Stanford' group."
   caption-overlay=true
   caption-header="Confirming group membership—and subscription access—has been
   processed"
   caption-text=""
%}

Globus Plus will be active on your account as soon as you accept the
invitation.  Remember, you _must accept the invitation in
order to be added to the group_, and _your Globus Plus access will not start
working until you join the group_!

You can confirm that Globus Plus is enabled by going to the [Globus File
Manager](https://app.globus.org/), clicking on the *Settings* button (located
on the left-side vertical bar, near the bottom), and clicking on the
*Subscription* tab.

{% include hero-image.html
   src="/assets/client/GlobusAccountwithPlus.png"
   alt="The 'Globus Account' page, showing access to Stanford's subscription."
   caption-overlay=false
   caption-header="This person has access to Globus Plus."
   caption-text="If the person was affiliated with multiple institutions, then she might have had access to multiple Globus Subscriptions."
%}

You now need to go to your endpoint, to decide what you want to share.

## Allow Sharing

Now that Globus Plus has been enabled, you need to tell Globus Connect Personal
which directories _might_ be shared.  To do this, right-click on the Globus
icon in the toolbar, and choose _Options_ from the pop-up menu.

{% include hero-image.html
   src="/assets/client/GlobusConnectPersonalToolbarPop-Up.png"
   alt="The pop-up menu that appears when right-clicking on the Globus icon in the toolbar"
   caption-overlay=true
   caption-header="Globus Connect Personal toolbar pop-up"
   caption-text=""
%}

When you select _Options_ from the pop-up menu, the options window opens.  Go
to the _Access_ tab.

{% include hero-image.html
   src="/assets/client/GlobusConnectPersonalAccess.png"
   alt="The Globus Connect Personal options window, with the Access tab selected, showing one directory."
   caption-overlay=true
   caption-header="Globus Connect Personal Options"
   caption-text=""
%}

If you plan on sharing files with someone else, that directory (or its parent)
needs to be listed, **and** the _Shareable_ box must be selected.  If the
folder is not listed, or the _Shareable_ box is not selected.

{% include info-box.html
   icon="question-circle"
   header="Why do I need to do this?"
   content="Whenever you want to use Globus Connect Personal to share something
   with others, you must enable the sharing both in the app, <em>and</em> on
   the Globus web site.  This is intentional, to help reduce the chances of
   sharing too much by accident."
%}

For example, let's say that you have the following directory tree:

```
C:\Users\Me\Sharing
C:\Users\Me\Sharing\User1
C:\Users\Me\Sharing\User2
```

If you plan on sharing the `User1` and `User2` directories with multiple
people, you have two choices:

1. You can have separate entries for `C:\Users\Me\Sharing\User1` and
   `C:\Users\Me\Sharing\User2`.  This would be the safest option, but it means
   more entries to manage.

2. You can have one entry for `C:\Users\Me\Sharing`.  This is the most flexible
   option, but it means you may accidentally grant access to other things
   inside of the `Sharing` folder.

Once you have configured the directories to allow sharing, save your changes.
You are now ready to start sharing from your endpoint!

## Start Sharing

To begin sharing content from your Globus Connect Personal endpoint, follow the
guide [How To Share Data Using
Globus](https://docs.globus.org/guides/tutorials/manage-files/share-files/),
part of Globus's [Guides](https://docs.globus.org/guides/) series.  Globus'
guide will step you through the process of creating a Guest Collection, which
gives other people access to a limited set of directories on your Globus
Connect Personal endpoint's Managed Collection.

That's it!  You should now be sharing part of your endpoint with others.

{% include info-box.html
   icon="clock"
   header="Don't Blink"
   content="Once in a while (say, once a quarter), you should check on your shared endpoints, and on your Globus Connect Personal access configuration, to make sure you are not over-sharing.  Don't forget, make a calendar reminder!"
%}

{% include info-box.html
   icon="laptop"
   header="Don't Fall Asleep"
   content="Your Shared Endpoint will only work when Globus Connect Personal is running, and your laptop or desktop is awake and connected to a network.  If your endpoint does fall asleep, any in-progress transfers will automatically resume once it wakes up."
%}
