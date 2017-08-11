const express = require('express'),
    app = express(),
    fs = require("fs"),
    Handlebars = require("handlebars"),
    bodyParser = require('body-parser'),
    config = JSON.parse(fs.readFileSync("config.json", "utf8")),
    datastore = require('nedb'),
    crypto = require('crypto'),
    db = new datastore({
        filename: 'database/profiles.db',
        autoload: true
    }),
    sendmail = require('sendmail')(),
    tokens = {};

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('static'));

app.get("/:email", function (req, res) {

    db.findOne({
        email: req.params.email
    }, function (err, doc) {

        // Check if a REST API call

        if ("json" in req.query) {

            delete doc._id;

            if ("biolength" in req.query) {

                var accepted = doc.bios.filter(bio => {

                    return bio.length < req.query.biolength;

                });

                if (!accepted.length) {

                    doc.biography = doc.bios[0].substring(0, req.query.biolength);

                } else {

                    doc.biography = accepted[accepted.length - 1];

                }

            }

            if (doc) {

                res.json(doc);

            } else {

                res.status(404).json({});

            }

        } else {

            fs.readFile(__dirname + "/templates/" + "profile.html", "utf8", function (err, template) {

                res.send(Handlebars.compile(template)({
                    existing: doc,
                    email: req.params.email,
                    bios: config.bios,
                    extra: config.extra,
                    edit: !doc || req.query.edit ? true : undefined,
                    disabled: !doc || req.query.edit ? undefined : "disabled"
                }));

            });

        }

    });

});

app.get("/", function (req, res) {

    if (req.query.email) {

        req.query.email = decodeURIComponent(req.query.email);

    }

    if (req.query.auth) {

        if (tokens[req.query.email] && tokens[req.query.email].token === req.query.token) {

            db.update({
                email: req.query.email
            }, tokens[req.query.email].profile, {
                upsert: true
            });

            delete tokens[req.query.email];

            res.redirect("/" + req.query.email);

        } else {

            res.send("Not a valid token. It may have expired or have already been used");

        }

    } else if (req.query.email) {

        res.redirect("/" + req.query.email);

    } else {

        fs.readFile(__dirname + "/templates/" + "start.html", "utf8", function (err, template) {

            res.send(template);

        });

    }

});

app.post("/:email", function (req, res) {

    var profile = {
        email: req.params.email,
        name: req.body.name,
        bios: [],
        extra: {}
    };

    for (var field in req.body) {

        if (field.startsWith("bio")) {

            if (profile.bios.length < config.bios.length) {

                profile.bios.push(req.body[field]);

            }

        }

    }

    for (var extraField in config.extra) {

        if (req.body[extraField]) {

            profile.extra[extraField] = req.body[extraField];

        }
    }

    crypto.randomBytes(48, function (err, buffer) {

        let token = buffer.toString('hex');

        tokens[req.params.email] = {
            token,
            profile,
        };

        setTimeout(function () {

            delete tokens[req.params.email];

        }, 100000);

        var tokenLink = config.baseURL + "?auth=true&email=" + encodeURIComponent(req.params.email) + "&token=" + token;


        sendmail({
            from: config.fromEmail,
            to: req.params.email,
            subject: 'Biography verifcation',
            html: "<a href=" + tokenLink + ">" + tokenLink + "</a>",
        }, function (err, reply) {

            res.send("An email has been sent to you with a verification link.");

        });

    });

});

app.listen(config.port);
