const Url = require('../models/url.model');
const dns = require('dns');

module.exports.greet = (req, res, next) => {
    res.json({ greeting: 'hello API' });
}

module.exports.createUrl = (req, res, next) => {
    let urlLookup = req.body.url.replace(/^https?:\/\//, "").replace(/(\/[^\/\s]+)*\/?$/, "");
    // make sure URL follows format: http(s)://www.example.com(/more/routes)
    let urlMatched = /^https?:\/\/(\w+\.)+\w+(\/[^\/\s]+)*\/?$/.test(req.body.url);
    dns.lookup(urlLookup, function (err, address, family) {
        if (err || !urlMatched) {
            res.send({ "error": "invalid URL" });
        } else {
            let original_url = req.body.url.replace(/\/$/, "");
            Url.findOne({ "original_url": original_url }, function (err, doc) {
                if (doc === null) {
                    // url doesn't already exist in db => create new entry
                    Url.count({}, function (err, c) {
                        let short_url = c + 1;
                        let doc = { "original_url": original_url, "short_url": short_url }
                        let url = new Url(doc);
                        url.save(function (err, doc) {
                            if (err) {
                                console.error(err);
                            } else {
                                res.send({
                                    "original_url": doc.original_url,
                                    "short_url": doc.short_url
                                });
                            }
                        });
                    });
                } else {
                    // url already exists in db => pull it from db
                    res.send({
                        "original_url": doc.original_url,
                        "short_url": doc.short_url
                    });
                }
            });
        }
    })
}

module.exports.shortenUrl = (req, res, next) => {
    let short_url = req.params.short_url;
    Url.findOne({ "short_url": short_url }, function (err, doc) {
        if (doc === null) {
            res.send({ "error": "No short url found for given input" });
        } else {
            res.redirect(doc.original_url);
        }
    })
}