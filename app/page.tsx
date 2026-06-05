"use client";

import { useMemo, useState } from "react";
import products from "../data/products.json";

export default function Home() {

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = useMemo(() => {

    const cats = products.map(
      (product: any) => product.category
    );

    return ["Todos", ...new Set(cats)];

  }, []);

  const filteredProducts = useMemo(() => {

    return products.filter((product: any) => {

      const searchMatch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        activeCategory === "Todos" ||
        product.category === activeCategory;

      return searchMatch && categoryMatch;

    });

  }, [search, activeCategory]);

  return (

    <div className="min-h-screen bg-black text-white">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

          <div>

            <h1 className="text-2xl font-black">
              Bella Achadinhos
            </h1>

            <p className="text-zinc-500 text-sm">
              Produtos virais premium
            </p>

          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 w-[280px] outline-none"
          />

        </div>

      </header>

      <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">

        <div className="flex gap-3 overflow-x-auto">

          {categories.map((category) => (

            <button
              key={String(category)}
              onClick={() => setActiveCategory(String(category))}
              className={`whitespace-nowrap px-5 py-2 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === category
                  ? "bg-orange-500 text-black"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {String(category)}
            </button>

          ))}

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">

          {filteredProducts.map((product: any) => (

            <div
              key={product.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-[24px] overflow-hidden hover:border-orange-500/40 transition-all duration-300"
            >

              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-orange-500 text-black px-3 py-1 rounded-full text-[10px] font-black">
                  {product.badge}
                </div>

              </div>

              <div className="p-4">

                <div className="flex items-center justify-between mb-2">

                  <span className="text-yellow-400 text-sm">
                    ★★★★★
                  </span>

                  <span className="text-zinc-500 text-xs">
                    4.9
                  </span>

                </div>

                <h2 className="text-sm font-bold leading-snug line-clamp-2 min-h-[38px]">
                  {product.title}
                </h2>

                <p className="text-zinc-500 text-xs mt-2">
                  {product.category}
                </p>

                <div className="mt-4">

                  <p className="text-xl font-black text-orange-400">
                    {product.price}
                  </p>

                </div>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-orange-500 hover:bg-orange-400 transition text-center text-black py-3 rounded-2xl font-black text-sm"
                >
                  Comprar
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

}