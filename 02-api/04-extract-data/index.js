const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const filePath = path.resolve(__dirname, 'amazon-books.json');
const saveJSON = content => writeFile(filePath,JSON.stringify(content));

const BOOK_SECTION_SELECTOR = 'div.s-result-item';
const BOOK_TITLE_SELECTOR = 'h5 > span';

//{ headless: false,}
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); // ctrl + T
    await page.goto('https://www.amazon.com/s?k=javascript+books&__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1SPQC98B7PJ4C&sprefix=java%2Caps%2C206&ref=nb_sb_noss_1');
    //await page.screenshot({path : "amazon.png"})
    await page.waitForSelector(BOOK_SECTION_SELECTOR);

    const books = await page.$$eval(
        BOOK_SECTION_SELECTOR, 
        bookSections => bookSections.map(
            section => ({
                title: section.querySelector('h5 > a > span').innerText,
                image: section.querySelector('img').src,
                author: section.querySelector('.a-row a.a-size-base').innerText,
            })
        ),
    );

    await saveJSON(books);
    await browser.close();
})(); // se ejecuta con () - al usar async 
