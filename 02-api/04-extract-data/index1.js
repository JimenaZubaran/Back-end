const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const filePath = path.resolve(__dirname, 'amazon-handC.json');
const saveJSON = content => writeFile(filePath,JSON.stringify(content));

const HANDCRAFT_SECTION_SELECTOR = 'div.s-result-item';
//const BOOK_TITLE_SELECTOR = 'h5 > span';

//{ headless: false,}
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); // ctrl + T
    await page.goto('https://www.amazon.com.mx/s?k=artesan%C3%ADa+mexicana&__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2ZXJ2P7C6IK46&sprefix=artesan%C3%ADa+%2Caps%2C213&ref=nb_sb_ss_i_1_10');
    await page.waitForSelector(HANDCRAFT_SECTION_SELECTOR);

    const articles = await page.$$eval(
        HANDCRAFT_SECTION_SELECTOR, 
        handCraftSections => handCraftSections.map(
            section => ({
                title: section.querySelector('h5 > a > span').innerText,
                image: section.querySelector('img').src,
               // price: section.querySelector('.a-price-whole').innerText,
                price: (section.querySelector('.a-offscreen') || {}).innerText || "$0.99",
                stock : Math.floor(Math.random()*100),
            })
        ),
    );

    await saveJSON(articles);
    await browser.close();
})(); // se ejecuta con () - al usar async 
