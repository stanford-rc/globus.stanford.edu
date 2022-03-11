# globus.stanford.edu

This is the source code for the Globus @ Stanford web site!

Anything pushed to the `master` branch will go live at [https://stanford-rc.github.io/globus.stanford.edu/](https://stanford-rc.github.io/globus.stanford.edu/).

NOTE: Eventually, this will probably end up being globus.stanford.edu.

This site uses the [Jekyll](https://jekyllrb.com) template engine.  We do that
because that is what GitHub Pages uses, and we are using GitHub Pages to
publish our content!

This site uses the [Lagunita theme](https://web.stanford.edu/group/webdev/lagunita/), which Karl converted to be used with Jekyll.  It is simple enough that GitHub Pages is able to build the site itself, so we don't need any external stuff (like Travis CI) to build.

# How to Test Locally

It is pretty easy, with a little bit of sysadmin skill, to test your changes
locally before you push them!  Here's how to do it:

## Step 1: Get Ruby & Bundler

This depends on your OS:

* **On macOS**, first get either [Homebrew](https://brew.sh) or [MacPorts](https://www.macports.org).  Then, install the appropriate package:

  * If you're using Homebrew, run `brew install ruby`.

  * If you're using MacPorts, run `sudo port install ruby31`.
    If you previously had `rb25-bundler` installed, you can uninstall both it
    and `ruby25`.

* **On Linux**, install the `bundler` package.

_You will only need to do this once._

## Step 2: Get the repo

Check out this repository to your computer.

_If you already have the repository checked out, do a "git pull" to update it._

## Step 3: Get the dependencies

In your Terminal, `cd` to the root of the repositry.  Then, run `bundle config
set --local path 'vendor/bundle'`.  That will set the local path where Ruby
dependencies will be installed.

NOTE: If you are using MacPorts, the command is `bundle3.1 install`.  You
should use `bundle3.1` anytime you see `bundle`.

Then, run `bundle install`.  This will download and install all of the
necessary Ruby software.

NOTE: If you are updating a local copy that already had dependencies installed,
you can run `bundle update` instead of `bundle install`.

The software it downloads will be installed to the local Git directory, in a
way that will not interact with the rest of the software on your computer.

## Step 4: Run Jekyll

In your Terminal, `cd` to the root of the repository.  Then, run `bundle exec
jekyll serve`.  This will run Jekyll, which will build the site.

NOTE: If you are using MacPorts, the command is `bundle3.1 exec jekyll serve`.

Once the static HTML has been built, Jekyll will start a local web server.
Launch your web browser, and go to the URL provided by Jekyll.  There's the
site!

You can now make edits.  As you save your changes, you will see Jekyll
rebuilding the static HTML pages.

When you are done, press Control-C to stop the temporary Jekyll server.
