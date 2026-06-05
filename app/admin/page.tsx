"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [products, setProducts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  async function loadProducts() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setProducts(data);
    }
  }

  async function addProduct() {

    await supabase
      .from("products")
      .insert([
        {
          title,
          price,
          image,
          category,
          shopee_link: link,
        },
      ]);

    setTitle("");
    setPrice("");
    setImage("");
    setCategory("");
    setLink("");

    loadProducts();
  }

  async function importShopee() {

    await fetch("/api/import-shopee");

    alert("Produtos importados 🚀");

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <div>
            <h1 className="text-5xl font-black">
              Bella Admin
            </h1>

            <p className="text-zinc-400 mt-2">
              Painel inteligente Bella Achadinhos
            </p>
          </div>

          <button
            onClick={importShopee}
            className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-4 rounded-2xl font-black"
          >
            Importar Shopee
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-5">

            <input
              type="text"
              placeholder="Produto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Imagem URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Link Shopee"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            />

            <button
              onClick={addProduct}
              className="w-full bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-2xl font-black"
            >
              Cadastrar Produto
            </button>

          </div>

          <div className="space-y-5">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 flex gap-5"
              >

                <img
                  src={product.image}
                  className="w-28 h-28 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h3 className="font-black text-xl">
                    {product.title}
                  </h3>

                  <p className="text-orange-400 font-black text-2xl mt-2">
                    {product.price}
                  </p>

                  <p className="text-zinc-500 mt-2">
                    {product.category}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}