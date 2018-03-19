---
layout:     left-sidebar
title:      Globus Accounts
title_line: false
---

# About Globus Accounts

As a first-time user, it is worth knowing a little bit about how Globus handles
identities and authentication.

Globus recognizes that many people have multiple accounts, not just the account
at their primary institution.  For example, if you do work at
[CERN](https://home.cern), then you probably have a CERN account.  Globus
refers to these accounts as _identities_.  The first time you log in to Globus,
the account you use to log in will be your _primary identity_; once logged in,
you can add _linked identities_, one for each account at other institutions.

In <a href="#example">the example</a>, Karl (who works at Stanford) first
logged into Globus using his Stanford credentials, but later he added his
account at The Ohio State University, and his personal email address, as linked
identities.  Karl was able to add his personal email address because he has a
Google account.

Karl can now log in to Globus using his Ohio State or Google accounts, in
addition to his Stanford account.  If someone wants to share something with
Karl, or add him to a group, they can do so using any of his linked email
addresses (not just his Stanford address).

{% include info-box.html
   header="Got an XSEDE Allocation?"
   content="If you have access to any XSEDE resources, you should link your XSEDE account.  All XSEDE clusters (including XStream) use XSEDE accounts for authentication."
%}

{% include info-box.html
   icon="globe"
   header="International Institutions"
   content="Although many domestic institutions can be authenticated to through Globus, international coverage is thinner.  Interested institutions should join through one of the <a href=\"https://technical.edugain.org/status\" title=\"eduGAIN technical site\">eduGAIN federations</a>.  Also, <a href=\"https://docs.globus.org/faq/security/#how_do_i_get_my_organization_added_as_an_option_to_log_into_globus\" title=\"Globus Security FAQ\">certain information</a> will need to be made available to Globus."
%}

For people without any institutional affiliation (or, at least, any institution
that Globus recognizes), you can get a [Globus ID](https://www.globusid.org).
It is mainly used for entities (like programs) do not have a normal
institutional account.  It is also the last-resort option if you want to link a
personal email address.

{% include info-box.html
   header="Google, ORCID, United ID"
   content="If you have an account with one of these services—even if you registered with your personal email address—you can link them.  This is preferable to creating a Globus ID."
%}

Globus IDs for entities are covered more in the [Globus Connect Server]({{
"server" | relative_url }}) [Site Prep and Installation]({{
"server/install.html" | relative_url }}) page.

{% include left-sidebar/transition.md %}

{% include toc.html id="accounts" %}

<a name="example"></a>
{% include hero-image.html
   src="assets/accounts/Identity Diagram.svg"
   alt="A diagram of one human with a Stanford account, a Google account, and an Ohio State account."
   caption-header="Three accounts, one identity"
   caption-text="This person has accounts at two instutions, plus Google, but Globus recognizes this as one Human."
%}
