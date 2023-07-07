---
layout:     left-sidebar
title:      Leaving Stanford
title_line: false
---

# Leaving Stanford

When the time comes to leave Stanford, there are several Globus-related steps
you should take, either to make sure your Globus account is terminated cleanly,
or to keep Globus working as you transition to another institution.

{% include info-box.html
   icon="clock"
   header="120 Days To Go"
   content="Although you don't have to do it immediately, for faculty and graduating students, you should complete this process within 120 days of graduation.  For staff, you should complete this process before your last day."
%}

What you choose to do mainly depends on where you are going

* If you are moving to another educational institution or Lab, they may be
  using Globus, and so you should <a href="#keep">keep your Globus account</a>.

* If you are going to the private sector, you probably won't be using Globus
  anymore, and so you should <a href="#close">close your account</a>.

<a name="keep"></a>
## Keep your Globus Account

To keep your Globus account, you should first _link_ a non-Stanford identity to
your Globus account, and then you should make it your primary identity by
_demoting_ your existing primary identity (which is probably your Stanford
identity).

[Read about linking an additional identity]({{ "accounts/link.html" |
relative_url}}) — [Read about demoting an identity]({{
"accounts/unlink.html#demote" | relative_url }})

If you have a Google account which uses your personal email address, then you
can use this as a Globus identity.  If you do not have a Google account linked
to your personal email address, then you can create a [Globus
ID](https://www.globusid.org).  Normally reserved for entities wishing to
create Globus Connect Server endpoints, the Globus ID is also used by humans
who do not have an institution logon that Globus recognizes, and who also do
not have a Google account.

{% include info-box.html
   header="Got an ORCID?"
   content="If you do not have a Google account, but you do have an ORCID (and that ID is linked to your personal email address), then you can link it (instead of creating a Globus ID)."
%}

Once you are settled in at your new institution, add that institution's login
as another linked identity.  You may also choose to repeat the demotion
process, making it your new primary identity.

{% include info-box.html
   icon="exclamation-triangle"
   header="Demotions and your Stanford Identity"
   content="If you execute the demotion process after you have left Stanford, and your SUNetID has been deactivated, you will not be able to re-add your Stanford identity."
%}

<a name="close"></a>
## Close your Globus Account

If you have decided to close your Globus account, you will need to complete
running transfers, clean up endpoints, and then notify Globus to delete your
Globus account.

### Step 1: Check Transfers

First, you should check on the endpoints you administer.  [Log in to Globus](https://www.globus.org/app/transfer), and you will be taken to the transfer page.

{% include hero-image.html
   src="assets/accounts/Transfer Page.png"
   alt="Globus 'Transfer' page"
   caption-overlay=true
   caption-header=""
   caption-text=""
%}

In the left-side menu is the **Activity** option.  If any transfers are
in progress, a number will appear on top of the icon.  You should only continue
when there are no transfers in progress.

### Step 2: Uninstall Globus Connect

If you have Globus Connect Personal installed on any computers, uninstall the
software now.

If you administer any Globus Connect Server instances, and you are planning on
deleting those as well, uninstall the `globus-connect-server` package from the
server.

{% include info-box.html
   icon="asterisk"
   header="Transfer Globus ID Passwords"
   content="If you own any Globus IDs that are associated with entities (for example, your workgroup or department), and if those are going to be kept active after your departure, then take this opportunity to transfer the Globus ID password to someone else."
%}

### Step 3: Clean Up Endpoints

You will now need to either delete any endpoints that you administer, or
transfer them to someone else.

Click on the **Endpoints** option (also located in the left-side menu).  You
should be taken to the list of recently-used endpoints.

{% include hero-image.html
   src="assets/server/Recent Endpoints.png"
   alt="Globus 'Endpoints' page, showing recently-used endpoints"
   caption-overlay=true
   caption-header="Recently-used endpoints"
   caption-text=""
%}

At the top of the list, is the link _Administered by me_.  Click on the link to
see endpoints which you administer.

{% include hero-image.html
   src="assets/server/Administered Endpoints.png"
   alt="Globus 'Endpoints' page, showing endpoints you administer"
   caption-overlay=true
   caption-header="Endpoints you administer"
   caption-text=""
%}

For each endpoint, you need to decide if you want to <a href="#delete">delete
it</a>, or if you want to <a href="#transfer">transfer it to someone else</a>.

{% include info-box.html
   header="Globus Connect Personal"
   content="Globus Connect Peronsal endpoints, and shared endpoints created from Globus Connect Personal endpoints, may only be deleted."
%}

<a name="delete"></a>
### Step 3a: Delete Endpoint

{% include info-box.html
   header="Delete shared endpoints first"
   content="If you have any shared endpoints, delete them first, before you delete the related Globus Connect Personal or Globus Connect Server endpoints."
%}

To delete an endpoint, click on the endpoint's name.  You will be
taken to the endpoint's overview page.

{% include hero-image.html
   src="assets/server/Endpoint Overview.png"
   alt="A Globus endpoint's 'Overview' page, showing endpoint details"
   caption-overlay=true
   caption-header="Endpoint overview"
   caption-text=""
%}

Next, click on the **<i class="fas fa-times-circle"></i>Delete Endpoint** button, located on the right side of the
page.  A warning will appear.

{% include hero-image.html
   src="assets/server/Delete Endpoint.png"
   alt="The confirmation window that appears when you try to delete an endpoint."
   caption-overlay=true
   caption-header="Endpoint deletion confirmation"
   caption-text=""
%}

If you are sure about deleting the endpoint, click on the **Delete endpoint**
button, and the endpoint will be deleted.

You will need to repeat this step (either deletion, or transfer) for each
endpoint you administer.

<a name="transfer"></a>
### Step 3b: Transfer Endpoint

To transfer an endpoint to someone else, click on the endpoint's name.  You
will be taken to the endpoint's overview page.

{% include hero-image.html
   src="assets/server/Endpoint Overview.png"
   alt="A Globus endpoint's 'Overview' page, showing endpoint details"
   caption-overlay=true
   caption-header="Endpoint overview"
   caption-text=""
%}

Next, click on the _Roles_ tab, to see who currently administers the endpoint.

{% include hero-image.html
   src="assets/server/Endpoint Roles.png"
   alt="A list of an endpoint's roles.  That is, people who have some control over the endpoint."
   caption-overlay=true
   caption-header="Endpoint roles"
   caption-text=""
%}

If you are the only administrator, add somoene else in your group as an
administrator.

Once you have added a new administrator, go back to the _Overview_ tab.  If you
are listed as the endpoint owner, click _Edit Attributes_ and change the owner
to someone else.

You will need to repeat this step (either deletion, or transfer) for each
endpoint you administer.

### Step 4: Notify Globus

Follow the steps in the [Globus Security
FAQ](https://docs.globus.org/faq/security/#how_can_i_delete_my_globus_account)
to complete the account deletion.

{% include left-sidebar/transition.md %}

{% include toc.html id="accounts" %}
