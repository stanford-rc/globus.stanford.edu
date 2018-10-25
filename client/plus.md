---
layout:      left-sidebar
title:       Globus Plus
title_line:  false
description: Enabling Globus Plus
---

# Globus Plus

If you would like to give other people access to content that is only
accessible with Globus Connect Personal (for example, because that content
lives on your laptop or desktop), you will need to create a _Shared endpoint_.
In order to create a shared endpoint with Globus Connect Personal, you will
need access to a feature called _Globus Plus_.  This page explains how to
configure Globus Plus and start sharing.

{% include info-box.html
   header="Full (and full-sponsored) accounts only"
   icon="university"
   content="Globus Plus is only available to people who have a full-service (or full-sponsored) account.  Essentially, if you have a Stanford email address, then you can use Globus Plus!"
%}

{% include info-box.html
   header="You might not need Globus Plus"
   content="You only need Globus Plus if you want to give other people access to some of the files on your computer.  If you want to share content on a server (running Globus Connect Server), Globus Plus is not needed, because it only works with Globus Connect Personal."
%}

{% include info-box.html
   icon="lock"
   header="Beware High-Risk Data"
   content="If your endpoint is used with High Risk data, then you may not run Globus Connect Personal on it."
%}

The first step is to ask that Globus Plus be enabled on your account.

## Enable Globus Plus

Globus Plus is a feature that has to be enabled on a user's account.  It is
enabled by adding you to a special group in the Globus infrastructure.

You only need to do this once, even if you have multiple Globus Connect
Personal endpoints.

To get Globus Plus enabled on your account, email [srcc-support@stanford.edu](mailto:srcc-support@stanford.edu?subject=Please Enable Globus Plus&body=Hello!  My SUNetID is X.  Please add me to the Stanford Globus Plus Group, so that I can use Globus Connect Personal to share Low- and Moderate-Risk files that I have on my endpoint.).
Provide your SUNetID, and say that you would like to be added to the Stanford
Globus Plus group.  You should receive a response within two business days.

When SRCC Support processes your request, you will receive an invitation to
join the _Stanford University Globus Plus Group_.

{% include hero-image.html
   src="assets/client/Globus Plus Group Join Email.png"
   alt="Part of an email from Globus, inviting the recipient to join the 'Stanford University Globus Plus Group'"
   caption-overlay=true
   caption-header=""
   caption-text=""
%}

Accepting the invitation will send you to the Globus web site (be sure to log
in with your Stanford credentials), where you will be be asked to confirm your
information and read & agree to terms.

{% include hero-image.html
   src="assets/client/Globus Plus Group Join Confirmation.png"
   alt="The Globus web site, showing the Groups page, and displaying a screen asking the user to confirm that they want to join a group."
   caption-overlay=true
   caption-header="Create Globus Connect Personal Endpoint"
   caption-text=""
%}

Once you have accepted, you will be added to the group!  Your account should
then be enabled for Globus Plus.  Remember, you _must accept the invitation in
order to be added to the group_, and _your Globus Plus access will not start
working until you join the group_!

You can confirm that Globus Plus is enabled by going to your [Globus account
page](https://www.globus.org/app/account).

{% include hero-image.html
   src="assets/client/Globus Account with Plus.png"
   alt="The 'Globus Account' page, showing that Globus Plus is active."
   caption-overlay=false
   caption-header="This person has access to Globus Plus."
   caption-text="If the person was affiliated with multiple institutions, then she might have had access to Globus Plus through multiple affiliations.  In this case, only one is showin."
%}

Remember, you only need Globus Plus enabled once.  Even if you have multiple
Globus Connect Personal endpoints, as soon as Globus Plus is enabled on your
account, it will start working for all current (and future) Globus Connect
Personal endpoints.

You now need to go to your endpoint, to decide what you want to share.

## Allow Sharing

Now that Globus Plus has been enabled, you need to tell Globus Connect Personal
which directories _might_ be shared.  To do this, right-click on the Globus
icon in the toolbar, and choose _Options_ from the pop-up menu.

{% include hero-image.html
   src="assets/client/Globus Connect Personal Toolbar Pop-Up.png"
   alt="The pop-up menu that appears when right-clicking on the Globus icon in the toolbar"
   caption-overlay=true
   caption-header="Globus Connect Personal toolbar pop-up"
   caption-text=""
%}

When you select _Options_ from the pop-up menu, the options window opens.  Go
to the _Access_ tab.

{% include hero-image.html
   src="assets/client/Globus Connect Personal Access.png"
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
Globus](https://docs.globus.org/how-to/share-files/), part of Globus's [How
To](https://docs.globus.org/how-to/) series.  Globus' guide will step you
through the process of creating a Shared Endpoint, which gives other people
access to a limited set of directories on your Globus Connect Personal
endpoint.

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

{% include left-sidebar/transition.md %}

{% include toc.html id="client" %}
