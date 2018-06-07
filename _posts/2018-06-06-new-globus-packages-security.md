---
layout:      no-sidebars
title:       New Globus Packages Improve Security
excerpt:     Recent Globus updates improve the security of data transfer and OAuth authentication.  Read on for details, and be sure to upgrade your Globus Connect Server installation soon!
---

In May, Globus released updates to the GridFTP and MyProxy OAuth components of
Globus Connect Server, which improve security.

MyProxy OAuth was updated to support TLS 1.1 and 1.2.  Before now, only TLS 1.0
was supported.

GridFTP's change was related to encrypted transfers.  Now, endpoint-to-endpoint
data transfer supports Elliptic-Curve Diffie-Hellman Ephemeral
([ECDHE](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman)) key
exchange.  If an attacker is able to intercept endpoint-to-endpoint traffic,
ECDHE key exchange makes it extremely difficult to decrypt the traffic (even
more so than it already is).

Around the time Globus pushed out these changes, Globus also increased the
strength of the RSA keys used for encrypted transfers: The endpoint-to-endpoint
transfers now use 2048-bit RSA keys (up from 1024-bit).

If you run an installation of Globus Connect Server, you should update to pick
up these changes, using your normal package update process (`apt` or `yum`).
When updating existing systems, make sure that you have at least the following
package versions:

* `globus-gridftp-server-control` version 6.2
* `globus-gssapi-gsi` version 13.6
* `myproxy-oauth` version 0.29

If you installed Globus Connect Server from scratch, any time after June 1,
these updates should already be installed.
