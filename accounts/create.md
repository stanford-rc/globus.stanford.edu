---
layout:     left-sidebar
title:      Globus Account Creation
title_line: false
---

# Create a Globus Account

{% include info-box.html
   icon="envelope"
   header="Do you have a sponsored account?"
   content="If you have a sponsored account that does not include Stanford email, please go to <a href=\"https://stanfordyou.stanford.edu\" title=\"StanfordYou\">StanfordYou</a> and put an email address in the SU Contact Info section.  Wait ten minutes for this change to take effect, and then continue!"
%}

Your Globus account is created automatically when you first log in to
Globus.

To begin, go to [globus.org/app](https://globus.org/app).  You will be
presented with the login page:

{% include hero-image.html
   src="assets/accounts/Login Page.png"
   alt="Globus login screen"
   caption-overlay=true
   caption-header="The Globus login screen"
   caption-text=""
%}

Select *Stanford University* from the list, and click the *Continue* button.

When you click on the *Continue* button, you will be taken to the normal
Stanford University login page.  If you have not logged in today, or on this
browser, you may be prompted to log in and/or two-step.

After logging in, you will be asked if this will be used as a _primary
identity_, or if you want to link this login to a different identity.

{% include hero-image.html
   src="assets/accounts/Login Identity.png"
   alt="First-time login screen"
   caption-overlay=true
   caption-header="First-Time login confirmation"
   caption-text=""
%}

If you are part of Stanford, then you will likely be using your Stanford
identity as your primary identity, and so you should click on the _Continue_
button.  If you are primarily affiliated with another institution, then your
first-time login should be with that instituion's credentials, and instead you
will want to add your Stanford identity as a [linked identity]({{
"accounts/link.html" | relative_url }}).

After clicking the _Continue_ button, you will be asked for some more
information (such as if you plan on using the service for commercial purposes.

{% include hero-image.html
   src="assets/accounts/Login Information Gathering.png"
   alt="Globus login screen"
   caption-overlay=true
   caption-header="First-Time user information collection"
   caption-text=""
%}

Complete the form and click on the _Continue_ button.

The final first-time user page will now appear.  The first time you access any
site using Globus authentication, Globus' authentication site will want to
confirm that it is OK to share your information with the site.

{% include hero-image.html
   src="assets/accounts/Login Consent.png"
   alt="Globus Web App consent screen"
   caption-overlay=true
   caption-header="Asking permission"
   caption-text=""
%}

This is a little confusing, because a Globus-run authentication service is
asking your approval to provide information to another Globus service, but this
is also a good example of how web services should ask for consent before
providing information to _any_ other service.

Click the _Allow_ button, and you will be taken to the Globus transfer page.

{% include hero-image.html
   src="assets/accounts/Transfer Page.png"
   alt="Globus transfer screen"
   caption-overlay=true
   caption-header="The Globus 'Transfer Files' screen"
   caption-text=""
%}

Congratulations!  You have successfully logged in to Globus, and your Stanford
account has been associated with an identity.

{% include left-sidebar/transition.md %}

{% include toc.html id="accounts" %}
