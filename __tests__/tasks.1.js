const puppeteer = require("puppeteer");
const path = require("path");
const fs = require('fs');

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  devtools: false,
};
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Image Tags", () => {
  it("Page should contain an `img` tag with a valid `src` attribute", async () => {
    const img = await page.$('img');
    const imgSrc = await page.$eval('img', el => el.getAttribute('src'));
    expect(img).toBeTruthy();
    expect(imgSrc.length > 0).toBeTruthy();
  });
});
describe('UL, OL', () => {
  it("Page should contain a `UL` or an `OL` tag", async () => {
    const ul = await page.$('ul');
    const ol = await page.$('ol');
    expect(ul || ol).toBeTruthy();
  });
});

describe('Anchor Tags', () => {
  it("Page should contain at least one `anchor` tag with a valid `href` attribute", async () => {
    const aTag = await page.$('a');
    const aTagLink = await page.$eval('a', el => el.getAttribute('href'));
    expect(aTag).toBeTruthy();
    expect(aTagLink.length > 0).toBeTruthy();
  });
});

describe('Semantic HTML tags', () => {
  it("Page should contain semantic HTML tags - `header`, `main`, `footer` etc.", async () => {
    const header = await page.$('header');
    const main = await page.$('main');
    const footer = await page.$('footer');
    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();
  });
});

describe('Styling', () => {
  it("Page should be styled by an external css file", async () => {
    const cssContent = fs.readFileSync(__dirname + "/../style.css", "utf8").replace(/[\n  ]/g, '');
    expect(cssContent.length > 0).toBeTruthy();
  });
});

describe('CSS Properties', () => {
  it("Page should contain `padding`, `margin`, `width` and `height` CSS properties for styling", async () => {
    const cssContent = fs.readFileSync(__dirname + "/../style.css", "utf8").replace(/[\n  ]/g, '');
    expect(cssContent.includes('padding')).toBeTruthy();
    expect(cssContent.includes('margin')).toBeTruthy();
    expect(cssContent.includes('width')).toBeTruthy();
    expect(cssContent.includes('height')).toBeTruthy();
  });
});
