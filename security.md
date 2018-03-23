---
layout:      no-sidebars
title:       Security
description: Information about Globus security
---

# Sorry, nothing is here yet!

Sorry, this page hasn't been filled in yet.  This placeholder only exists so
that links will work.  Hopefully there will be something here soon!

# Globus Web and API

All end-user access to Globus happens via the Globus web site, which is secured
by 2048-bit RSA.  TLS 1.1 and 1.2 are the only supported
protocols.  SSL Labs gives the Globus web site an [A rating](https://www.ssllabs.com/ssltest/analyze.html?d=www.globus.org).

API accesses related to authentication go to `auth.globus.org`, which is
secured by 2048-bit RSA.  TLS 1.0 through 1.2 are supported.  SSL Labs gives
the endpoint an [A rating](https://www.ssllabs.com/ssltest/analyze.html?d=auth.globus.org&latest).

API accesses related to endpoints and data transfer go to
`transfer.api.globus.org`, which is secured by 2048-bit RSA.  TLS 1.0 through
1.2 are supported, and SSL Labs currently caps the API endpoint's rating [at
B](https://www.ssllabs.com/ssltest/analyze.html?d=transfer.api.globusonline.org),
due to the use of weak Diffie-Hellman key exchange parameters (also known as
the Logjam attack).

TODO: CILogon authentication for logging in

TODO: Any way client-side to require TLS 1.1+ ?

# GridFTP Control

The GridFTP server running on the endpoint accepts control connections from
Globus only.  

The `endpoint_cert` API returns a 2048-bit RSA key, along with a minimal
certificate (in that it is lacking any X.509 extended attributes).  The
certificate is SHA-256-signed, and lasts for nine years.  It is signed by
Globus' "Globus Connect CA 3" CA.

The "Globus Connect CA 3" certificate is embedded in the
`globus-connect-server` package, and can be [viewed on GitHub](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/security/go-ca3.pem).

If sharing is enabled, the "Transfer CA 2 Alpha" certificate is installed,
again using the certificate built in to the `globus-connect-server` package,
and which is [available on GitHub](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/security/go_transfer_ca_2.pem).

TODO: Certs for user identification.

# GridFTP Data

# legacy MyProxy

# MyProxy OAuth

# CILogon

When using CILogon, proxy certificates are issued by the "CILogon Basic CA 1"
or by the "CILogon Silver CA 1" certificates.  Both CA certificates are built
in to the `globus-connect-server` package, and are available on GitHub (for
both
[basic](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/security/cilogon-silver.pem)
and
[silver](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/security/cilogon-silver.pem)).
Both CAs may also be independently downloaded [from CILogon
directly](http://ca.cilogon.org/downloads).

CILogon certificates are often valid for days, so when an endpoint trusts
CILogon for authentication, `globus-connect-server-setup` installs two hourly
cron jobs, each of which downloads the latest CRL for one of the CAs.

# More Details

## GridFTP Security

Regarding the `endpoint_cert` API, you can try it yourself using the
[`globus-sdk` package](https://pypi.python.org/pypi/globus-sdk/1.5.0) and the
following demo code:

{% gist 5b9a820c54ff80c1f05db257a964b0be %}

The API is called by `configure_credential` in [`globus.connect.server`](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/server/__init__.py).

The "Globus Connect CA 3" certificate is installed as part of `configure_trust_roots`, which is also in [`globus.connect.server`](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/server/__init__.py). 

## CILogon

The two CILogon CA certificates are installed as part of `configure_trust_roots`, which is also in [`globus.connect.server`](https://github.com/globus/globus-connect-server/blob/master/source/globus/connect/server/__init__.py).  That is also where the CRL-download cron job is defined.
