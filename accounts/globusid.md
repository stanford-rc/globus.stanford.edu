---
layout:      page
toc:  true
title:       Globus ID
id: accounts
see-also: true
description: Information on Globus IDs, and how to get one.
---


Normally, Globus identifies people using their institutional identity.  That
is, their institution's login page is used for authentication, and the
person is identified using the identifier assigned by the institution
(typically something like "username@university.edu").

If a person does not have an institutional login—or their institution is not
recognized by Globus—then Globus allows people to log in using Google or ORCID.

If even Google and ORCID are not an option, then as a
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
<p>You should keep your Globus ID password in an approprite
<a href="https://uit.stanford.edu/security/password-manager" title="Stanford University IT Password Manager">password manager</a>.</p>
<p>If you are using a Globus ID to create a Globus Connect Server, you must not
use the Globus ID for anything else!</p>
{% endcapture %}
{% include info-box.html
   icon="lock-open"
   raw=minsec
%}

## Creating a Globus ID

If you have decided to create a Globus ID, go to
[globusid.org](https://www.globusid.org) and select _create a Globus ID_.  A
form will be displayed for you to complete.

{% include figure.html
   src="/assets/server/GlobusIDCreate.png"
   alt="The 'Create a Globus ID' page, with fields filled in."
   caption="Globus ID Creation"
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




