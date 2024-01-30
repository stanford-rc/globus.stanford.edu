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

* **On Windows**, first download and install the [RubyInstaller with
  DevKit](https://rubyinstaller.org/downloads/).  Start at the top of the "WITH
  DEVKIT" list, and choose the first one where the version number starts with
  "3.2" and ends with "(x64)".  As of today, that is "3.2.3-1 (x64)".  Select
  the default installation options.

  After the Ruby installer finishes, when you click the "Finish" button, a
  second program ("RubyInstaller2 for Windows") will launch.  This second
  program installs non-Ruby software needed to install Ruby packages (called
  "gems") on Windows.  Press the Return key to accept the default (installing
  MSYS2 and the MINGW development toolchain).  After a few minutes, you should
  see the message "Install MSYS2 and MINGW development toolchain succeeded".
  You might also see some warnings, but as long as you see the "… toolchain
  succeeded" message, that's OK.  Press the Return key to close the installer
  window.

  To finish the Ruby installation, launch PowerShell, and run the command `gem
  update --system`.  You should now have a fully up-to-date Ruby installation.
  Close PowerShell, and continue on to installing Git.

  For Git, you need to install two pacakges.

  First, download and install [Git for Windows](https://gitforwindows.org).
  The installer will ask many questions; here is the guide on how to answer
  them:

  * For the list of components to install, the default list is fine.

  * For the text editor to use, select whichever plain text editor you would
    like to use.  The "Notepad" option will use the Windows Notepad text
    editor.

  * For the SSH executable to use, select "Use external OpenSSH".

  * For the HTTPS transport backend, select "Use the native Windows Secure
    Channel library".

  * For all other installer questions, choose the default option.

  Lastly, install the [GitHub CLI](https://cli.github.com).  This installer
  should not ask any questions; if it does, select the default answer.

* **On Linux**, install the `bundler` and `gh` packages.  On Febora, the
  `bundler` package is called `rubygem-bundler`.  On current-generation
  Debian/Ubuntu/Fedora distros, this will bring in Ruby 3.1, which is new
  enough.   If your Linux distribution does not provide a `gh` package, you can
  use [GitHub's own
  repo](https://github.com/cli/cli/blob/trunk/docs/install_linux.md).

Once you have all the software installed, launch your terminal (or PowerShell
on Windows) and run two commands:

```
git config --global user.email "sunetid@stanford.edu"
git config --global user.name "Your Name"
```

In the commands above, replace `sunetid` with your SUNetID, and replace `Your
Name` with your name.  Git will add that information to each commit you make.

## Step 2: Get the repo

**If you have never used the GitHub CLI** (the `gh` command), run `gh auth
login` to log in to GitHub.  You will be asked a number of questions; here are
the answers:

* Choose to log in to "GitHub.com".

* For the preferred protocol, if you have a preference of SSH instead of HTTPS,
  you can select SSH.  If you don't care, select HTTPS.

* When asked to authenticate Git with your GitHub credentials, enter `Y`.

* When asked how you would like to authenticate, choose "Login with a web
  browser".

You will be shown a unique, one-time code.  When prompted, press the Return key
to open your web browser, which will take you to the GitHub login page: Log in
to GitHub, and then enter the one-time code.

Once the one-time code is entered, after a short delay, the GitHub CLI should
say "Authentication complete" and "Logged in".

**One you have authenticated to GitHub**, you should now `cd` to wherever you
would like the repository to live, and then run `gh repo clone
stanford-rc/globus.stanford.edu` to clone the repository to your computer.

**If you already have the repository cloned to your machine**, you do not need
to clone it again.  Insted, you can update your existing clone.  `cd` to the
repository, and run `gh repo sync`.

## Step 3: Get the dependencies

All of these commands are run in your terminal (or PowerShell on Windows).
First, `cd` to your cloned repository.

**If you have just cloned the repository from GitHub**, there is a setup step
you need to complete:

* **On macOS with MacPorts**, run `bundle3.2 config set --local path 'vendor/bundle'`.

* **On Windows**, run `bundle config set --local path 'vendor\bundle'`.

* **On Linux, and macOS with HomeBrew**, run `bundle config set --local path 'vendor/bundle'`

This one-time setting will ensure Ruby dependencies are installed inside the
cloned repository.

Finally, run `bundle install` (if you are using MacPorts, run `bundle3.2
install`).  This will download the Ruby software needed to work on this web
site.  The software will be installed inside the clone directory, so it will
not modify your Ruby installation.

You should run `bundle install` any time you make a new clone, and also
after pulling in changes from the repository (using `gh repo sync`).

## Step 4: Run Jekyll

In your Terminal (or PowerShell on Windows), `cd` to the root of the
repository.  Then, run `bundle exec jekyll serve`.  This will run Jekyll, which
will build the site.

NOTE: If you are using MacPorts, the command is `bundle3.2 exec jekyll serve`.

Once the static HTML has been built, Jekyll will start a local web server.
Launch your web browser, and go to the URL provided by Jekyll.  There's the
site!

You can now make edits.  As you save your changes, you will see Jekyll
rebuilding the static HTML pages.

When you are done, press Control-C to stop the temporary Jekyll server.  On
Windows, you will twice be asked if you want to "Terminate batch job?"  Answer
`Y` both times, and the temporary Jekyll server will exit.
