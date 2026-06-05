const { chromium } = require("playwright"); 
 
async function run() { 
  const browser = await chromium.launch({ 
    headless: false 
  }); 
 
  const page = await browser.newPage(); 
 
  await page.goto( 
    "https://collshp.com/n/fernandogimenes891585?share_channel_code=1^&view=storefront", 
    { waitUntil: "networkidle" } 
  ); 
 
  await page.waitForTimeout(15000); 
 
  const html = await page.content(); 
 
  console.log(html); 
 
} 
 
run(); 
