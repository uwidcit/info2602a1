const puppeteer = require('puppeteer');
const { expect, assert }  = require('chai');


let URL ="http://127.0.0.1:8080/index.html";

const HEADLESS = false;
const TIMEOUT = 12000;

let browser;
let page;
let requests = [];

before(async function(){
  this.timeout(TIMEOUT);
  browser = await puppeteer.launch({ headless: HEADLESS,  defaultViewport: null, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('request', request => {
    requests.push(request.url());
    request.continue();
  });
//   await page.emulateMedia("screen");
  await page.goto(URL, { waitUntil: 'networkidle2'});
});

function pause(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, timeout);
  });
}

async function getStyles(selector){
  return await page.evaluate(selector => {
    try{
      return JSON.parse(
        JSON.stringify(
          getComputedStyle(document.querySelector(selector)
        ))
      );
    }catch(e){
      return null;
    }
 
  }, selector);
}

function getHTML(selector){
  return page.evaluate(selector=>{
    try{
      return document.querySelector(selector).outerHTML;
    }catch(e){
      return null;
    }
  }, selector);
}

describe('Assignment 1', () => {

  context('The index page', ()=>{

    it('Test 1: Should have the page title "Poke Dextr"', async () => {
        let pageTitle = await page.title();
        expect(pageTitle).to.eql('Poke Dextr');
    });

    it('Test 2: Should have a nav bar with containing the text "Poke Dextr"', async ()=>{
        let navhtml = await getHTML('nav');
        let result = navhtml === null ? -1 : navhtml.search('Poke Dextr');
        expect(result).to.not.eql(-1);
    });

    it('Test 3: Should have a main element', async ()=>{
      let mainHandle = await page.$('main');
      expect(mainHandle).to.be.ok;
    });
        
    it('Test 4: Should have a link to index.html in nav entitled "Listing"', async ()=>{
      let linkHandle = await page.$('nav a[href="index.html"]');
      expect(linkHandle).to.be.ok;
    });

    it('Test 5: Should make an ajax call which requests pokemon data on load', async ()=>{
      let url = 'https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50';
      let match = requests.includes(url); 
      expect(match).to.equal(true);
    }).timeout(2000);

    it('Test 6: Should load a list of 50 links with the class "collection-item" within an element with the id “listing”. ', async ()=>{
      let links = await page.$$('a.collection-item');
      expect(links.length).to.equal(50);
    });
    
    it('Test 7: Should have an element with the id "listing" and a max height of 600px', async ()=>{
      let listing = await getStyles('#listing');
      expect(listing.maxHeight).to.equal('600px');
    });
    
    it('Test 8: Should have an element with the id "listing" and be vertically scrollable', async ()=>{
      let listing = await getStyles('#listing');
      expect(listing.overflowY).to.equal('scroll');
    });

    it('Test 9: Should show a #dugtrio link when the page is loaded', async () => {
      
      const dugtrioLink = await (await (await page.$('#dugtrio')).getProperty('textContent')).jsonValue();

      expect(dugtrioLink).to.equal('dugtrio');
    });

    it('Test 10: Should send an ajax request for pokemon details on link click', async ()=>{
      let reqs = ['https://pokeapi.co/api/v2/pokemon/dugtrio', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png'];
      let count = 0;
        
      await page.click('a#dugtrio');

      await pause(1000);

      reqs.forEach(req => {
        if(requests.includes(req))count++
      })

      expect(count).to.equal(2);

    }).timeout(2000);
    
    it('Test 11: Should show pokemon image, id, types, weight and height in #result on link click', async ()=>{
      await page.click('a#dugtrio'); 
      await pause(500);
      await page.waitForSelector('#result');

      let searchKeys = { weight:'ground', id:'51', name: 'dugtrio', weight:'333', height:'7' };

      let result = await getHTML('#result');
      let checks = {
        name: false,
        type: false,
        id: false,
        weight: false,
        height: false
      };

      for(let key of Object.keys(checks)){
        checks[key] = result.search(searchKeys[key]) != -1;
      }

      expect(checks).to.eql({
        name: true,
        type: true,
        id: true,
        weight: true,
        height: true
      });
       
    });

  });

})

after(async () => {
  await browser.close();
});