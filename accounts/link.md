---
layout:     left-sidebar
title:      Globus Account Creation
title_line: false
---

# Linking Additional Identities

As mentioned in the [introduction]({{ "accounts" | relative_url }}), Globus
supports having multiple _identites_ per person, with one identity acting as
the person's _primary identity_.

{% include info-box.html
   header="Got an ACCESS Allocation?"
   content="If you have access to any ACCESS resources, you should link your ACCESS account.  All ACCESS clusters use ACCESS accounts for authentication."
%}

{% include info-box.html
   header="Google, ORCID"
   content="If you have an account with one of these services—even if you registered with your personal email address—you can link them.  This is the best way to use your personal email address with Globus."
%}

{% include info-box.html
   icon="window-close"
   header="Do not link your entity's Globus ID"
   content="If your group owns, or has access to, a Globus ID for the group, you <b>must not</b> link it to your primary identity.  Those Globus IDs are for entities, and may not be linked to individual people."
%}

To link an identity, go to [app.globus.org](https://app.globus.org).  If you
are not already logged in, then you will be presented with the login page:

{% include hero-image.html
   src="assets/accounts/Login Page.png"
   alt="Globus login screen"
   caption-overlay=true
   caption-header="The Globus login screen"
   caption-text=""
%}

Log in as normal, and you will arrive at the transfer page:

{% include hero-image.html
   src="assets/accounts/Transfer Page.png"
   alt="Globus transfer screen"
   caption-overlay=true
   caption-header="The Globus 'Transfer Files' screen"
   caption-text=""
%}

Click on the **<i class="fas fa-user-circle"></i> Account** option (near the bottom-left corner of the page).  This will
take you to the Account Management page:

{% include hero-image.html
   src="assets/accounts/Account Management.png"
   alt="Globus Account Management"
   caption-overlay=true
   caption-header="Account Management"
   caption-text="All linked identites, and Globus Plus status, are displayed here."
%}

The Account Management page displays your current primary identity (likely your
Stanford identity) and any linked identites.

To link a new identity, click on **<i class="fas fa-id-card"></i><i class="fas fa-plus-circle"></i> Link Another Identity**, on the right of the page.

{% include hero-image.html
   src="assets/accounts/Add Linked Identity.png"
   alt="Page asking you to select an institution to log in"
   caption-overlay=true
   caption-header="Selecting an Institution"
   caption-text="Just like when logging in for the first time, when linking an identity, you must choose an institution in which to log."
%}

You will now be sent through the normal login process for the linked identity.
Once that is complete, you will be taken back to the account management page,
with the newly-linked identity listed in the _linked identities_ section.

{% include info-box.html
   icon="exclamation-triangle"
   header="Identities cannot be double-linked"
   content="If you want to 'move' a linked identity, you will need to un-link the identity from the 'losing' primary, before you link it to the 'gaining' primary."
%}

{% include left-sidebar/transition.md %}

{% include toc.html id="accounts" %}

<a name="example"></a>
{% include hero-image.html
   src="assets/accounts/Identity Diagram.svg"
   alt="A diagram of one human with a Stanford account, a Google account, and an Ohio State account."
   caption-header="Three accounts, one identity"
   caption-text="This person has accounts at two instutions, plus Google, but Globus recognizes this as one Human."
%}
