var request = require('request');

var url = 'http://localhost:3000/files/hello.html';
//var url = 'http://unix:/tmp/necklace:/files/hello.html';
//var url = 'http://unix:/tmp/necklace:/login';
console.time('first');
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.timeEnd('first');
        //console.log(body) // Show the HTML for the Google homepage.
        console.time('second');
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.timeEnd('second');
                //console.log(body) // Show the HTML for the Google homepage.
                console.time('third');
                request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.timeEnd('third');
                        //console.log(body) // Show the HTML for the Google homepage.
                        console.time('fourth');
                        request(url, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.timeEnd('fourth');
                                //console.log(body) // Show the HTML for the Google homepage.
                                console.time('fifth');
                                request(url, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        console.timeEnd('fifth');
                                        //console.log(body) // Show the HTML for the Google homepage.

                                    } else
                                        console.error(error);
                                })

                            } else
                                console.error(error);
                        })

                    } else
                        console.error(error);
                })

            } else
                console.error(error);
        })
    } else
        console.error(error);
})

