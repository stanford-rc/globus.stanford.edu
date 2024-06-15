---
layout:      page
toc:  true
title:      Unlinking and Demoting Identities
id: accounts
see-also: true
---


Beyond [linking identities]({{ "accounts/link.html" | relative_url }}), you
might also wish to unlink identities which you have linked.  Or, you might be
moving to a new institution, and wish to "demote" your current primary
identity.  Both procedures may be found on this page.

<a name="unlink"></a>
## Unlinking Identities

Most of the time, you will not normally need to unlink an identity.  You will
only normally need to unlink an identity when you are demoting your primary
identity.  You can also unlink identities for institutions where you have not
been affiliated for some time.

When you do find yourself needing to unlink an identity, follow this procedure.

{% include info-box.html
   icon="exclamation-triangle"
   header="Stop all activities before proceeding"
   content="When you unlink an identity, all active transfers authenticated by that identity will be cancelled.  You should wait for active transfers to complete before you proceed."
%}

To unlink an identity, [log in to Globus](https://app.globus.org/)
and click on the **<i class="fas fa-user-circle"></i> Account** link (near the bottom-right corner of the page).

{% include hero-image.html
   src="/assets/accounts/TransferPage.png"
   alt="Globus transfer screen"
   caption-overlay=true
   caption-header="The Globus 'Transfer Files' screen"
   caption-text="The 'Account' link is in the bottom-left corner of the page."
%}

The Account page displays your primary and linked identities.  Near the
upper-right of the page, locate and click on the **<i class="fas fa-id-card"></i> Manage Identities** link.

{% include hero-image.html
   src="/assets/accounts/AccountManagement.png"
   alt="Globus transfer screen"
   caption-overlay=true
   caption-header="The Globus 'Account' screen"
   caption-text="The 'Manage Your Identities' link is in the upper-right quadrant of the screen."
%}

You will be taken to a page listing all of your identities.  Each linked
identity will have a large <i class="fas fa-times" title="letter X"></i> to the
right of the identity.

{% include hero-image.html
   src="/assets/accounts/Identities.png"
   alt="Globus account identities screen"
   caption-overlay=true
   caption-header="The Globus 'Identities' list"
   caption-text="Click on the letter X to delete an identity."
%}

Locate the identity you wish to remove, and click on the <i class="fas
fa-times" title="letter X"></i>.  You will then be asked if you are sure about
unlinking the identity.

{% include hero-image.html
   src="/assets/accounts/UnlinkingConfirmation.png"
   alt="Globus screen confirming that is it OK to unlink an identity"
   caption-overlay=true
   caption-header="Your linked identity's point of no return"
   caption-text="This is your last chance to go back!"
%}

If you confirm the operation, the identity will be unlinked.

<a name="demote"></a>
## Demoting Primary Identities

Although Globus recognizes that one human may have multiple _identities_, only
one of those may be your _primary identity_.  It is possible to change your
primary identity, using the steps described in this section.  You should do
this whenever you change your primary institutional affiliation.

{% include info-box.html
   icon="exclamation-triangle"
   header="Stop all activities before proceeding"
   content="When you unlink and re-link identities, all active transfers will be cancelled.  You should wait for active transfers to complete before you proceed."
%}

{% include info-box.html
   icon="exclamation-triangle"
   header="Third-party consents will be revoked"
   content="If you have granted any third-party applications access to your Globus identity, those grants will be revoked during this process.  After completing this process, you will need to re-log-in to each third-party application."
%}

{% include info-box.html
   icon="exclamation-triangle"
   header="History will be lost"
   content="The steps below will cause all transfer and endpoint history to be lost.  Endpoints will also be deactivated, so you will have to sign into them again.  You should make a note of endpoints that you do not control, but which you have recently used, to reactivate them later."
%}

### Step 1: Check Your Endpoints

Check all of the endpoints (including shared endpoints) you administer, making sure that your
_current_ primary identity is on the list of administrators.  Globus Connect
Personal endpoints—and shared endpoints created from Globus Connect Personal
endpoints—are excluded from this step, because they can not have multiple
administrators.

{% include hero-image.html
   src="/assets/server/EndpointRoles.png"
   alt="A Globus Connect Personal endpoint, showing the list of roles."
   caption-overlay=false
   caption-header="An example Globus Connect Personal endpoint"
   caption-text="This is where you should check administrators.  This is a
   Globus Connect Personal endpoint, so only one administrator is allowed."
%}

### Step 2: Unlink All Linked Identities

Make a note of all of the your linked identities.  Then, follow the
instructions <a href="#unlink">above</a> to unlink your linked identities.

### Step 3: Log In to Your New Primary Identity

Log out of Globus and [log in]({{ "accounts/create.html" | relative_url }})
using whichever identity you want to be your new primary identity.  Globus will
lead you through the normal account-creation process.

### Step 4: Add Other Linked Identities

Use the [identity-linking process]({{ "accounts/link.html" | relative_url }})
to link all of your other identities to your new primary identity.

{% include info-box.html
   header="Keep your previously-primary identity"
   content="Even if you no longer use it, you should keep your previously-primary identity linked as long as possible, for others who knew you primarily by that identity."
%}

### Step 5: Log in to Third-Party Sites

If you had any third-party sites or program that used your Globus credentials,
you will need to log back in to them, so that fetch new Globus credentials.

Congratulations, the identity-demotion process is complete!  You may now
re-activate endpoints, and return to normal life.




