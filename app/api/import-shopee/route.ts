import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {

  const products = [

    {
      title: "Luminaria LED Moderna",
      price: "R$ 89,90",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      category: "Decoracao",
      shopee_link: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    },

    {
      title: "Projetor Galaxy TikTok",
      price: "R$ 129,90",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
      category: "Virais",
      shopee_link: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    },

    {
      title: "Organizador Premium",
      price: "R$ 59,90",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      category: "Casa",
      shopee_link: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    },

  ];

  await supabase
    .from("products")
    .insert(products);

  return NextResponse.json({
    success: true,
  });
}