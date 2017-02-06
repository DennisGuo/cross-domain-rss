var express = require('express');
var request = require('request');
var parser = require('xml2js').parseString;
var app = express();
var port = 4000;

app.get('/', function (req, res) {
    res.send('welcome to cross-domain rss proxy.')
});

app.get('/proxy/:path', function (req, res) {
    var paramPath = req.params.path;
    log("access proxy path : " + paramPath);
    res.set('Access-Control-Allow-Origin', '*');

    if (paramPath) {
        var path = decodeURIComponent(paramPath);
        request({
            url: path,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //log('body : ' + body) // Show the HTML for the Google homepage. 
                //res.send(body);
                parser(body, {
                    trim: true,
                    ignoreAttrs :true,
                    normalizeTags: true,
                    explicitArray :false,
                    mergeAttrs :true
                }, function (err, result) {
                    if (err) {
                        log('parse error : ' + err);
                        res.json(null);
                    } else {
                        res.json(result);
                    }
                });
            } else {
                if (error) {
                    log("error : " + error);
                } else {
                    log("Bad status code : " + response.statusCode);
                }
                res.json(null);
            }
        });

    } else {
        res.json(null);
    }
});

app.listen(port, function () {
    log("Cross-domain rss proxy running on port " + port + " !");
})


function log(str) {
    console.log(getTime() + " | " + str);
}

function getTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDay();
    d = d < 10 ? '0' + d : d;
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = date.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;
    return y + '-' + m + '-' + d + " " + h + ":" + min + ":" + sec
}