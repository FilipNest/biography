# Biography service demo

Just a doodle of 100% someone else's idea to see how small and quick to build it could be following a Tweet by Jina Anne:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Idea: like gravatar but for biographies (in small, medium, and large length options).</p>&mdash; 🌙 jina anne (@jina) <a href="https://twitter.com/jina/status/895453664009113600">August 10, 2017</a></blockquote>

## What it is

* An user page for every email account with some form fields (verified via a link sent to an email to save having to do user accounts).
* Simple REST API for fetching values from profiles including specifying the maximum biography length you want.
* No client side JavaScript, no CSS. Just HTML, some basic form templates and a Node.js server.

# What you can do with it if you like the idea

* Fork it? Ignore it? The idea is not mine (see above), I just doodled it in code for fun after thinking "that'd be easy to make".

## Deploy

* git clone/download
* npm install
* edit `config.json` file with the following settings (example below):
 - port: Port the server runs on
 - bios: An array of different biography character counts
 - extra: An object of any extra fields you want to collect with a character count 
 - baseUrl: The URL the server will run on. Used in email verification.
 - fromEmail: Who emails will be from

 ```JSON
 
 {
    "port": 80,
    "bios": [16, 100, 500],
    "extra": {
        "interests": 16
    },
    "baseURL": "http://localhost",
    "fromEmail": "mail@filipnest.com"
}
 
 ```
 
* node index.js
 
## REST API


 
## Demo site
 
An instance is running on biography.filipnest.com but that was just for testing.
 