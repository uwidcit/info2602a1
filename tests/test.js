const puppeteer = require('puppeteer');
const { expect, assert }  = require('chai');

const environment = require('../environment.json');

const URL = 'http://localhost:8080';

const HEADLESS = true;
const TIMEOUT = 12000;

let browser;
let page;

before(async function(){
    this.timeout(TIMEOUT);
    browser = await puppeteer.launch({ headless: HEADLESS,  defaultViewport: null,  args: ['--no-sandbox', '--disable-setuid-sandbox']});
    page = await browser.newPage();
    await page.emulateMedia("screen");
    await page.goto(URL, { waitUntil: 'networkidle2'});
});

function getInnerText(selector){
  return page.evaluate(selector=>document.querySelector(selector).innerText.trim(), selector);
}


function checkElements(elements){
  for(let [name, ele] of Object.entries(elements)){
    it(`Should have ${name}`, async()=>{
      expect(await page.$(ele)).to.be.ok;
    });
  }
}

describe('Test Suite 1: The Pokelisting Table', ()=>{


  checkElements({
    'the appropriate HTML table elements': 'table>thead+tbody',
    '5 columns': 'table>thead>tr>th:nth-child(5)',
    '50 rows': ' table>tbody>tr:nth-child(50)'
  })

  it('Should have "bulbasaur" in first column of the first row', async()=>{
      expect((await getInnerText('tr:nth-child(1) > td:nth-child(1)'))).to.eql('Bulbasaur')
  });

   it('Should have "grass" in first column of the first row', async()=>{
   expect(await getInnerText('tr:nth-child(1) > td:nth-child(2)')).to.eql('grass')
  });

    it('Should have "poison" in first column of the first row', async()=>{
   expect(await getInnerText('tr:nth-child(1) > td:nth-child(3)')).to.eql('poison')
  });

  it('Should have "6.9" r in first column of the first row', async()=>{
   expect(await getInnerText('tr:nth-child(1) > td:nth-child(4)')).to.eql('6.9')
  });

  it('Should have "0.7" in first column of the first row', async()=>{
   expect(await getInnerText('tr:nth-child(1) > td:nth-child(5)')).to.eql('0.7')
  });
});

after(async () => {
  await browser.close();
});
