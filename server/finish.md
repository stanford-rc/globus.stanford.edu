---
layout:      left-sidebar
title:       Globus Connect Server Final Configuration
title_line:  false
description: Finish your Globus Connect Server Installation
---

# Finishing Configuration

It is now time to finish the endpoint's configuration!  This assumes that you
have already performed all of the [initial setup]({{ "server/configure.html" |
relative_url }}), and that you have followed the instructions for your chosen
[authentication method]({{ "server/auth.html" | relative_url }}).

To finish your endpoint's configuration, you will need to do some work on the
server, followed by some work on the Globus web site.

## Additional GridFTP Configuration

When you ran `globus-connect-server-setup`, most of GridFTP's configuration was
done for you automatically.  But, some additional configuration is needed to
meet [MinSec](https://minsec.stanford.edu) requirements for Moderate Risk data.
The following five commands, run as `root`, will take care of the configuration
for you:

    echo 'log_transfer /var/log/gridftp_transfer.log' > /var/lib/globus-connect-server/gridftp.d/transfer-logging
    ln -s /var/lib/globus-connect-server/gridftp.d/transfer-logging /etc/gridftp.d/transfer-logging
    sed -e 's|/var/log/gridftp.log|/var/log/gridftp.log /var/log/gridftp_transfer.log|' -e 's|postrotate|sharedscripts\n   postrotate|' -i /etc/logrotate.d/globus-connect-server
    sed -e 's|MIN_TLS_PROTOCOL=.*|MIN_TLS_PROTOCOL=TLS1_1_VERSION|' -i /etc/grid-security/gsi.conf
    /etc/init.d/globus-gridftp-server restart

The above commands make two major changes:

1. Transfer logging is enabled.  This logs every file transfer to
   `/var/log/gridftp_transfer.log`.
   
   Each file-transfer log entry includes the unique ID of the Task the user
   submitted, the file being transferred, and the IP address of the other end
   of the transfer.

   This is implemented by creating a file in
   `/var/lib/globus-connect-server/gridftp.d/transfer-logging`, with a symlink
   from `/etc/gridftp.d/transfer-logging`.  The file contains the line
   `log_transfer /var/log/gridftp_transfer.log`.

   The existing log-rotation configuration is also updated to account for this
   new log file.

2. TLS 1.1 is set as the minimum TLS version for all GridFTP and MyProxy
   communications.  This includes all communications between Globus and MyProxy
   (when legacy MyProxy authentication is in use), all communications between
   the MyProxy OAuth server and MyProxy (when MyProxy OAuth authentication is
   in use), all communications between Globus and the GridFTP service (for
   metadata activity and transfer coordination), and—when transfer encryption
   is enabled—all data traffic between endpoints.
   
   The normal default is to use TLS 1.0 and later.  Regardless of this setting,
   normal TLS negotiation processes are used, so if both ends support a more
   modern TLS version, that will end up being used.

   This is implemented by editing `/etc/grid-security/gsi.conf`, setting
   `MIN_TLS_PROTOCOL` to `TLS1_1_VERSION`.

## Accessing the Endpoint

Now that Globus Connect Server is running, and GridFTP's configuration has been
updated, some final endpoint configuraion must be performed on the [Globus web
site](https://www.globus.org/app).  

{% include info-box.html
   icon="asterisk"
   header="Log in with the Globus ID"
   content="Since we are performing endpoint configuration, you will need to log in using the same Globus ID and password that you used during endpoint setup.  If you are using one of the common Globus IDs, talk to the owner of the Globus ID, who will work with you to finish configuration."
%}

Log in, and go to the Endpoints page.

{% include hero-image.html
   src="assets/server/Recent Endpoints.png"
   alt="The list of recently-used endpoints."
   caption-overlay=true
   caption-header="Recently-Used Endpoints"
   caption-text=""
%}

When you reach the Endpoints page, at the top of the list of endpoints, click
on _administered by me_.  The list of endpoints will switch to show endpoints
administered by your Globus ID.

{% include hero-image.html
   src="assets/server/Administered Endpoints.png"
   alt="The list of endpoints which you administer."
   caption-overlay=true
   caption-header="Endpoints You Administer"
   caption-text=""
%}

Your newly-created endpoint will appear.  Click on the endpoint's name, and you
will be taken to the Endpoint Overview page.

## Endpoint Overview

Click on the _Edit Attributes_ button, so that you can fill in the missing
endpoint information.

{% include hero-image.html
   src="assets/server/Endpoint Information Editable.png"
   alt="A list of endpoint attributes, with information already filled in."
   caption-overlay=true
   caption-header="Endpoint Information"
   caption-text=""
%}

All of the fields should be filled in.  Here are some guidelines:

* The _display name_ should contain a clear indication of the endpoint's
  purpose.  In the example above, this is a file server, and so the display
  name includes the lab name and file server name.

* The _description_ should contain a more-detailed description of the
  endpoint's purpose.

* The _keywords_ should contain at least two items: `stanford`, and your lab's
  name.

* The _endpoint info link_ should contain one of the following (ranked from
  most preferred to least preferred):

  1. A link to a web page containing information on the specific endpoint, or
     the data provided by the endpoint.

  2. A link to your group's web page.

  3. A link to your department or school's web page.

* The _contact_ email is a mailing list for your lab, or the email address of
  someone responsible for the endpoint.  A helpdesk or ticketing system email
  address is also appropriate.

* The _organization_ must be `Stanford University`, assuming you are using
  Stanford's campus subscription.

* The _department_ must be your lab's or group's name.

* The _other contact info_ should be your lab's or group's mailing address.

* _Force encryption_ must be set to `Yes` if either of these two conditions
  are true:

  1. When you did your [initial configuration]({{ "server/configure.html" |
     relative_url }}), you had set `RequireEncryption` to `True`; or…

  2. Your endpoint has access to Moderate Risk data.

  If none of the above conditions are met, then you can set this to `Yes` if
  you wish.

* _Managed endpoint_ must be set to `Yes`.  This ensures subscription-only
  features are available (even if you decide not to use them).

&nbsp;

{% include info-box.html
   icon="exclamation-circle"
   header="Some settings must not be changed"
   content="The <em>Visibility</em>, <em>Default Directory</em>, and <em>Legacy Name</em> settings <b>must not be changed</b> on the web site, or they will be overwritten when you next run globus-connect-server-setup on your endpoint.  If you need to change them, change them on your endpoint."
%}

Once you have filled in your endpoint's information, save changes and go to the _Server_ tab.

## Server

The _Server_ tab contains information on how users are authenticated, server
location & performance, and server connection details.

{% include hero-image.html
   src="assets/server/Endpoint Server.png"
   alt="An endpoint's server information tab."
   caption-overlay=true
   caption-header="Endpoint Server Information"
   caption-text="Authenticaion, locaion, performance, and connection details."
%}

The first section, _Identity Provider_, tells Globus how users authenticate.
You should make sure the values are correct:

* If you are using [CILogon authentication]({{ "server/cilogon.html" |
  relative_url}}), the _type_ should be `MyProxy OAuth` and the _host_ should
  be `cilogon.org`.

* If you are using [MyProxy OAuth]({{ "server/oauth.html" | relative_url }})
  authentication, the _type_ should be `MyProxy OAuth` and the _host_ should be
  the fully-qualified domain name of your endpoint.

* If you are using [legacy MyProxy]({{ "server/myproxy.html" | relative_url }})
  authentication, the _type_ should be `MyProxy`, the _host_ should be the
  fully-qualified domain name of your endpoint, and the _dn_ should be
  something that starts with `/C=US/O=Globus Consortium/`.

From time to time, `globus-connect-server-setup` fails to set the legacy
MyProxy DN correctly.  If the _host_ is correct but the _dn_ is empty, you can
set it yourself.  Use the following command to obtain the correct string to
set:

```
[root@scigc-xfs-2 ~]# openssl x509 -noout -subject -in /var/lib/globus-connect-server/grid-security/hostcert.pem
subject= /C=US/O=Globus Consortium/OU=Globus Connect Service/CN=8075a01e-236b-11e8-b773-0ac6873fc732
```

Next, skip to the third section, _Server_.  There should be one server entry.

The URI of the server should use the scheme `gsiftp`, the port number `2811`,
and your server's fully-qualified domain name.  The _subject dn_ should also be
set.  If it is missing, you can use the `openssl x509` command from above to
obtain the correct value.

{% include info-box.html
   icon="list-ul"
   header="Settings still missing?"
   content="If the _Server_ or _Identity Provider_ settings are wrong, you can also try fixing them by re-running the `globus-connect-server-setup` command.  If you still have issues, then you should reach out to Support."
%}

To finish this tab, go up to the second section, contains the _Network Use_
settings.  Click on the section's _edit_ link, and change the location to
`37.43,-122.17`.  Globus uses the general location of each endpoint influences
amount of parallelism: As endpoints grow farther apart, transfers between
endpoints are split into more pieces, to be transferred simultaneously.

{% include info-box.html
   icon="globe"
   header="Where on campus is that?"
   content="That is supposed to be the latitude/longitude of the Stanford clock tower, but limited precision places the marker close to the Oval."
%}

Before saving changes, you should also set the appropriate value in the
_Network Use_ dropdown.  Here is a basic guide to follow:

* If your endpoint system is only used for data transfers, and has at least 1
  Gigabit of bandwidth to the core network, set this to `aggressive`.

* If your endpoint system is also used by end users, or you aren't sure about
  bandwidth from your endpoint to the core, set this to `normal`.

* If your endpoint system is also used by end users, and they are complaining
  about slow access to disk, change this to `minimal`.

{% include info-box.html
   icon="fast-forward"
   header="Still too slow?"
   content="If your endpoint has queued transfers, is using a 10G link for data transfer, and does not appear bottlenecked by CPU or access to disk, then you should set custom network-use numbers, using the aggressive setting as a starting point."
%}

Save changes, and go to the _Roles_ tab.

## Roles

The _Roles_ tab shows all of the accounts which have special access to your
endpoint.

{% include hero-image.html
   src="assets/server/Endpoint Roles.png"
   alt="An endpoint's roles tab, showing two accounts which have administrator access, and one account which has 'activity monitor' access."
   caption-overlay=true
   caption-header="Endpoint Roles"
   caption-text="Authenticaion, locaion, performance, and connection details."
%}

When your endpoint was first created, your Globus ID was added as an
administrator.  You should now give elevated access to at least two more
accounts:

* Add yourself as an Administrator.  You should be able to find yourself by
  entering your `sunetid@stanford.edu`.

* Add team members as Administrators.

* Add the address
  `aa57f001-4ec4-424b-93f0-9b0c73b0d0b0@clients.auth.globus.org` as an
  "Activity Monitor".  This account is used by a program—run by
  [SRCC](https://srcc.stanford.edu/)—which collects usage information.  Giving
  access for usage data collection is a condition of getting access to the
  campus Globus subscription.

Role changes take effect immediately, so there is no need to explicitly save
your changes here.

# Test!

At this point, Globus Connect Server configuration has been completed.  You
should now launch a second browser, log in to the Globus web site as yourself,
and perform some tests:

* You should be able to access the endpoint, and your default directory should
  return a directory listing.

* Test that access permissions hold:

  * If you have set the `RestrictPaths` setting on the endpoint, make sure you
    can list the contents of all of the allowed directories.  Also, make sure
    that disallowed directories can not be listed.

  * If you left `RestrictPaths` empty, make sure you can list the contents of
    directories that you can normally access, like your home directory, and
    `/tmp`.  Also try to list a restricted directory (like `/root`), and make
    sure it fails.

* Perform some data transfers _from_ your endpoint:

  * If you have set the `RestrictPaths` setting on the endpoint, you should
    test all of the paths that are allowed.

  * If you left `RestrictPaths` empty, perform test transfers from some
    directories that you have access to.

  When performing these transfer tests, you can send data to a [Globus Connect
  Personal endpoint]({{ "client.html" | relative_url }}) on your local system,
  or to another endpoint where you have write access.

* Perform some data transfers _to_ your endpoint.

  This step only applies if permissions (OS permissions, and the
  `RestrictPaths` setting) allow writing to the endpoint.

  * If you have set the `RestrictPaths` setting on the endpoint, you should
    test all of the paths that are allowed.

  * If you left `RestrictPaths` empty, perform test transfers from some
    directories that you have access to.

  When performing these transfer tests, you should use the `esnet#sunn-dtn`
  endpoint as the source of the transfer.  This endpoint is run by
  [ESnet](https://fasterdata.es.net/performance-testing/DTNs/) and is hosted in
  Sunnyvale, close to one of Stanford's network links to the outside world.  It
  will happily saturate your endpoint's network connection.

* If you have enabled sharing, make sure that you can create a shared endpoint.

  * If you set `SharingRestrictPaths`, then make sure you can create a shared
    endpoint on each allowed path.  Also, make sure sharing of a disallowed
    path is blocked.

  * If you left `SharingRestrictPaths` un-set, then simply try sharing a
    directory that you are otherwise allowed to access.

* If you have enabled sharing, perform a few transfer tests both _from_ and
  _to_ your shared endpoint.

If you encounter issues which you cannot resolve yourself, then you
should reach out to [Support]({{ "support.html" | relative_url }}).

# Monitor!

Globus logs to two or three different paths, depending on authentication
method.  If you are using MyProxy or MyProxy OAuth authentications, MyProxy
logs its activity to syslog.  If you are using MyProxy OAuth, OAuth activity is
logged in Apache logs.  Finally, GridFTP warnings and errors are logged at
`/var/log/gridftp.log`, with file-transfer records being logged at
`/var/log/gridftp_transfer.log`.  You should ensure that Globus logs are
handled the same as other system/application logs in your group.

You should also ensure [Qualys](https://uit.stanford.edu/service/qualys) is
scanning your endpoint for vulnarabilities, and that you are regularly checking
reports and acting on the results.  If your server is maintained by someone
else, you should contact them.  If you are also the server admin, and you need
more information on Qualys, reach out to your
[LNA](https://web.stanford.edu/group/networking/dist/sunet.reports/LNA.html) or
to your [ISO](https://uit.stanford.edu/organization/iso) Consultant.

Finally, every quarter, you should go to your [list of endpoints you
administer](https://www.globus.org/app/endpoints?scope=administered-by-me), and
heck for any endpoints that you do not use anymore.  Those endpoints should be
removed.

**Congratulations, you have reached the end of the Server setup pages!**  We,
SRCC, the contributors to this site, and other Stanford Globus users hope that
you will make good use of your new endpoint.

{% include left-sidebar/transition.md %}

{% include toc.html id="server" %}
