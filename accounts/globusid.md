---
layout:      left-sidebar
title:       Globus ID
title_line:  false
description: Information on Globus IDs, and how to get one.
---

# The Globus ID

Normally, Globus identifies people using their institutional identity.  That
is, their institution's login page is used for authentication, and the
person is identified using the identifier assigned by the institution
(typically something like "username@university.edu").

If a person does not have an institutional login—or their institution is not
recognized by Globus—then Globus also accepts three non-institutional
providers:

* *Google*: If you have a Google account (either personally, or through your
  institution), you may use that.

* *ORCID*: If you have an [ORCID](https://orcid.org), you may use that.

* *United ID*: If you have a [United ID](https://unitedid.org), you may use
  that.

If a person does not have a login with _any_ of the above providers, then as a
last resort a person can create a _Globus ID_.  The Globus ID is an account (a
username and password) that is only used with Globus services.

If you are _not_ a person, and you are configuring a Globus Connect Server, you
will need a Globus ID, as that is how Globus Connect Server authenticates
itself to Globus during initial setup.

{% capture minsec %}
<p>Stanford's <a href="http://minsec.stanford.edu"
title="Stanford Minimum Security Standards">Minimum Security Standards</a>
require the use of two-step authentication whenever working with Moderate Risk
(or higher) data.  The Globus ID does not support two-step authentication on
its own.  Therefore, when working with Stanford data, you should use one of the
other methods to identify and authenticate yourself.</p>
<p>If you are using a Globus ID to create a Globus Connect Server (which is the
only option available), you must not use the Globus ID for anything else!
</p>
{% endcapture %}
{% include info-box.html
   icon="lock-open"
   raw=minsec
%}

## Creating a Globus ID

If you have decided to create a Globus ID, go to
[globusid.org](https://www.globusid.org) and select _create a Globus ID_.  A
form will be displayed for you to complete.

{% include hero-image.html
   src="assets/server/GlobusID Create.png"
   alt="The 'Create a Globus ID' page, with fields filled in."
   caption-overlay=true
   caption-header="Globus ID Creation"
   caption-text=""
%}

Here are some thing to keep in mind as you fill in the form:

* Use your department's name as your _Full Name_, and use "Stanford University"
  as your _Organization_.

* Use a mailing list as your email address.  **This is important**; password
  resets and other important Globus communications will be sent here.

 * Remember to **practice password complexity**!  Your Globus ID only uses a
   static password, so be sure to consult the [Password Requirements Quick
   Guide](https://uit.stanford.edu/service/accounts/passwords/quickguide) to
   find out how long your password should be.

{% include left-sidebar/transition.md %}

{% include toc.html id="accounts" %}
