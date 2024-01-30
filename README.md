# globus.stanford.edu

This is the source code for the Globus @ Stanford web site!

Anything pushed to the `main` branch will go live at [https://globus.stanford.edu/](https://globus.stanford.edu/).

This site uses the [Jekyll](https://jekyllrb.com) template engine.  We do that
because that is what GitHub Pages uses, and we are using GitHub Pages to
publish our content!

This site uses the [Lagunita theme](https://web.stanford.edu/group/webdev/lagunita/), which Karl converted to be used with Jekyll.  It is simple enough that GitHub Pages is able to build the site itself, so we don't need any external stuff (like Travis CI) to build.

# How to Test Locally

It is pretty easy, with a little bit of sysadmin skill, to test your changes
locally before you push them!

All operations will be done inside a terminal window (on macOS and Linux), or
in a PowerShell window (on Windows).  Here's what to do:

## Step 1: Get Ruby, Bundler, and Git

This depends on your OS:

* **On macOS**, first get either [Homebrew](https://brew.sh) or [MacPorts](https://www.macports.org).  Then, install the appropriate package:

  * If you're using Homebrew, run `brew install ruby gh`.

  * If you're using MacPorts, run `sudo port install ruby32 gh`.  If you
    previously had `rb25-bundler` installed, you can uninstall both it and
    `ruby25`.  If you previously had `ruby31` installed, you can also uninstall
    it.

* **On Linux**, install the `bundler` and `gh` packages.  On Febora, the
  `bundler` package is called `rubygem-bundler`.  On current-generation
  Debian/Ubuntu/Fedora distros, this will bring in Ruby 3.1.   If your Linux
  distribution does not provide a `gh` package, you can use [GitHub's own
  repo](https://github.com/cli/cli/blob/trunk/docs/install_linux.md).

_You will only need to do this once._

## Step 2: Get the repo

Check out this repository to your computer.

* **On macOS and Linux**, `cd` to wherever you would like the
  repository to live on your computer, and then run `gh repo clone
  stanford-rc/globus.stanford.edu`.

  If you already have the repository checked out, `cd` to the root of the
  repository and use `gh repo sync` to pull in updates.

## Step 3: Get the dependencies

*This section applies to both **macOS** and **Linux**.*

In your Terminal, `cd` to the root of the repositry.  Then, run `bundle config
set --local path 'vendor/bundle'`.  That will set the local path where Ruby
dependencies will be installed.

NOTE: If you are using MacPorts, the command is `bundle3.2 config set --local
path 'vendor/bundle'`.  You should use `bundle3.2` anytime you see `bundle`.

Then, run `bundle install`.  This will download and install all of the
necessary Ruby software.

NOTE: If you are updating a local copy that already had dependencies installed,
you can run `bundle update` instead of `bundle install`.

The software it downloads will be installed to the local Git directory, in a
way that will not interact with the rest of the software on your computer.

## Step 4: Run Jekyll

*This section applies to both **macOS** and **Linux**.*

In your Terminal, `cd` to the root of the repository.  Then, run `bundle exec
jekyll serve`.  This will run Jekyll, which will build the site.

NOTE: If you are using MacPorts, the command is `bundle3.2 exec jekyll serve`.

Once the static HTML has been built, Jekyll will start a local web server.
Launch your web browser, and go to the URL provided by Jekyll.  There's the
site!

You can now make edits.  As you save your changes, you will see Jekyll
rebuilding the static HTML pages.

When you are done, press Control-C to stop the temporary Jekyll server.
