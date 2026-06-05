const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {

  const browser = await puppeteer.launch({

    headless: false,

    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome.exe",

    defaultViewport: null,

    args: [
      "--start-maximized"
    ]

  });

  const page = await browser.newPage();

  console.log("ABRINDO COLLECTION 🚀");

  await page.goto(
    "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    {
      waitUntil: "networkidle2"
    }
  );

  await new Promise(resolve => setTimeout(resolve, 8000));

  const products = await page.evaluate(() => {

    const images = Array.from(document.querySelectorAll("img"));

    const filtered = images.filter(img =>
      img.src.includes("susercontent")
    );

    return filtered.map((img, index) => ({

      id: index + 1,

      title:
        img.alt ||
        `Produto ${index + 1}`,

      image: img.src,

      price: "R$ 99,90",

      category: (() => {

        const cats = [
          "Tecnologia",
          "Casa Moderna",
          "Decoração",
          "Piscina",
          "Virais"
        ];

        return cats[index % cats.length];

      })(),

      badge: "TREND",

      link:
        "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"

    }));

  });

  console.log("PRODUTOS:", products.length);

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(products, null, 2)
  );

  console.log("JSON GERADO 🚀");

  await browser.close();

}

run();