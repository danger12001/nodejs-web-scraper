var express = require('express');
var app = express();
const puppeteer = require('puppeteer');


app.get('/custom', function(req, res) {
    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
        });
    
        const page = await browser.newPage();
        
        const image_selector = "div > img";
        let query = req.query.query;

        console.log('opening browser')
        await page.goto(`https://www.google.com/search?q=${query}&tbm=isch`);
        
        console.log('creating image collection');
        var eval = await page.$$eval(image_selector, (images) => {
            var imageCollection = [];
            images.forEach((img) => {
                if(img.src) {
                    imageCollection.push(img.src);
                }
            })
            return imageCollection;
        });

        await page.close();

        console.log("Image Collection Created");
        
        console.log('looping through collection');


        eval.forEach(async (img, index) => {

                console.log(`saving image - ${index + 1}`);
                const newPage = await browser.newPage();
                await newPage.goto(img);
                await newPage.screenshot({ path: 'screenshots/custom/cat' + (index + 1) + '.png' }).then( async () => {
                    await newPage.close();
                });
        });

        console.log('Images have been saved!');

    })();
    
});


app.get('/', function (req, res) {
    let queries = ['cat', 'cats', 'kittens', 'cute kittens', 'cute cats'];

    queries.forEach((query, qIndex) => {


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
        });
    
        const page = await browser.newPage();
        
        const image_selector = "div > img";


        console.log('opening browser')
        await page.goto(`https://www.google.com/search?q=${query}&tbm=isch`);
        
        console.log('creating image collection');
        var eval = await page.$$eval(image_selector, (images) => {
            var imageCollection = [];
            images.forEach((img) => {
                if(img.src) {
                    imageCollection.push(img.src);
                }
            })
            return imageCollection;
        });

        await page.close();

        console.log("Image Collection Created");
        
        console.log('looping through collection');


        eval.forEach(async (img, index) => {

                console.log(`saving image - ${qIndex} - ${index + 1}`);
                const newPage = await browser.newPage();
                await newPage.goto(img);
                await newPage.screenshot({ path: 'screenshots/cat' + qIndex + '-' + (index + 1) + '.png' }).then( async () => {
                    await newPage.close();
                });
        });

        console.log('Images have been saved!');

    })();
    

})



});


// //start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('web-scraper listening at http://%s:%s', host, port);

});