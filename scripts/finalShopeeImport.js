const { chromium } = require("playwright");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(
    "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    {
      waitUntil: "networkidle"
    }
  );

  await page.waitForTimeout(15000);

  const html = await page.content();

  const regex =
    /<img src="(https:\/\/down-br\.img\.susercontent\.com\/file\/.*?)".*?alt="(.*?)".*?R\$<\/span><span class="truncate text-base\/5 font-medium">(.*?)<\/span>/gs;

  const products = [];

  let match;

  while ((match = regex.exec(html)) !== null) {

    products.push({

      title: match[2],

      price: "R$ " + match[3],

      image: match[1],

      category: "Shopee",

      shopee_link:
        "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"

    });

  }

  console.log(products);

  for (const product of products) {

    const { error } = await supabase
      .from("products")
      .insert([product]);

    if (error) {

      console.log(error);

    } else {

      console.log(
        "SALVO:",
        product.title
      );

    }

  }

  console.log(
    "IMPORTAÇÃO FINALIZADA 🚀"
  );

}

run();