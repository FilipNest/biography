# Biography API service demo

Just a doodle of 100% someone else's idea to see how small and quick to build it could be following a Tweet by Jina Anne:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Idea: like gravatar but for biographies (in small, medium, and large length options).</p>&mdash; 🌙 jina anne (@jina) <a href="https://twitter.com/jina/status/895453664009113600">August 10, 2017</a></blockquote>

## What it is

* A user page for every email account with some form fields for bio lengths and extra fields, customisable in a config file (verified via a link with expiring token sent to an email to save having to do user accounts/passwords oh no it's been hacked etc).
* Simple JSON REST API for fetching values from profiles including specifying the maximum biography length you want.
* No client side JavaScript, no CSS. Just HTML, some basic form templates and a Node.js server.

## What you can do with it?

* Fork it? Improve it? Ignore it? The idea is not mine (see above), I just doodled it in code for fun after thinking about how to make it after I saw the tweet.

## Deploy

* `git clone https://github.com/FilipNest/biography`
* `npm install` in its directory to get dependencies (kept small, could probably be even smaller)
* edit `config.json` file with the following settings (example below):
  * port: Port the server runs on
  * bios: An array of different biography character counts
  * extra: An object of any extra fields you want to collect with a character count 
  * baseUrl: The URL the server will run on. Used in email verification.
  * fromEmail: Who emails will be from (these get sent via the server's `sendmail` command)

 ```JSON
 
 {
    "port": 80,
    "bios": [16, 100, 500],
    "extra": {
        "interests": 16
    },
    "baseURL": "http://localhost",
    "fromEmail": "myemail@email.com"
}
 
 ```
 
* `node index.js`
 
## REST API

* Access a url at `/myemail@email.com?json` to get a JSON feed. Without the JSON parameter is the normal edit/view profile screen.
* You'll get back a biography JSON object with a `name`, `bios` array, and `extras` object for the extra fields. Plus an `email` field for reference.
* Want a biography at a certain length? Pass in a `biolength` parameter with a number and you'll get an extra `biography` parameter with the right one. If nothing is short enough the shortest match is trimmed.

That's it.
 
## Demo site
 
An instance is running on http://biography.filipnest.com but that's just for testing. This is not something you should use in this state. It's a doodle.
 
