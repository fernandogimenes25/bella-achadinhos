"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Flame,
  Star,
  Sparkles,
  TrendingUp,
  Heart,
  ShoppingBag,
  Home,
  Cpu,
  Lamp,
  Waves,
} from "lucide-react";

const categories = [
  "Todos",
  "Casa Moderna",
  "Tecnologia",
  "Decoração",
  "Piscina",
  "Virais",
];

const products = [
  {
    title: "Projetor Smart 4K",
    price: "R$ 599,90",
    category: "Tecnologia",
    badge: "TOP",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Luminária LED Premium",
    price: "R$ 129,90",
    category: "Casa Moderna",
    badge: "VIRAL",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Painel Ripado Luxo",
    price: "R$ 249,90",
    category: "Decoração",
    badge: "TREND",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Kit Automação Inteligente",
    price: "R$ 319,90",
    category: "Tecnologia",
    badge: "SMART",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Espreguiçadeira Premium",
    price: "R$ 899,90",
    category: "Piscina",
    badge: "LUXO",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Quadro Praia Moderna",
    price: "R$ 89,90",
    category: "Decoração",
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,120,255,0.15),transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-3xl bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <Sparkles className="w-7 h-7 text-black" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Bella Achadinhos
              </h1>

              <p className="text-zinc-400 text-sm">
                Marketplace Premium
              </p>
            </div>

          </div>

          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 w-[360px]">

            <Search className="w-5 h-5 text-zinc-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="bg-transparent outline-none w-full placeholder:text-zinc-500"
            />

          </div>

          <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-black font-black shadow-xl shadow-orange-500/20">
            Shopee Store
          </button>

        </div>

      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm mb-8">
              <TrendingUp className="w-4 h-4" />
              Produtos virais atualizados
            </div>

            <h2 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight">
              O marketplace mais premium da internet.
            </h2>

            <p className="text-zinc-400 text-xl leading-relaxed mt-8 max-w-2xl">
              Tecnologia, decoração, automação e tendências virais em uma experiência inspirada em TikTok Shop e Amazon.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-orange-500 hover:bg-orange-400 transition px-8 py-5 rounded-2xl text-black font-black text-lg shadow-2xl shadow-orange-500/20">
                Explorar Produtos
              </button>

              <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-8 py-5 rounded-2xl font-bold text-lg">
                Bella Trends
              </button>

            </div>

          </div>

          <div className="relative">

            <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop"
              className="relative rounded-[40px] border border-white/10 shadow-2xl"
            />

          </div>

        </div>

      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-6">

        <div className="flex gap-4 overflow-x-auto pb-2">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-2 font-semibold ${
                activeCategory === category
                  ? "bg-orange-500 border-orange-400 text-black"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >

              {category === "Virais" && <Flame className="w-4 h-4" />}
              {category === "Tecnologia" && <Cpu className="w-4 h-4" />}
              {category === "Casa Moderna" && <Home className="w-4 h-4" />}
              {category === "Decoração" && <Lamp className="w-4 h-4" />}
              {category === "Piscina" && <Waves className="w-4 h-4" />}

              {category}

            </button>

          ))}

        </div>

      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredProducts.map((product) => (

            <div
              key={product.title}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl hover:-translate-y-3 hover:border-orange-500/40 transition-all duration-500"
            >

              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-orange-500 text-black px-4 py-2 rounded-full text-xs font-black">
                  {product.badge}
                </div>

                <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center">

                  <Heart className="w-5 h-5" />

                </button>

              </div>

              <div className="p-7">

                <div className="flex items-center gap-2 mb-4">

                  <div className="flex items-center gap-1 text-yellow-400">

                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="font-bold">4.9</span>

                  </div>

                  <span className="text-zinc-500 text-sm">
                    +2.1k vendas
                  </span>

                </div>

                <h3 className="text-2xl font-black leading-snug">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between mt-6">

                  <div>

                    <p className="text-zinc-500 line-through text-sm">
                      R$ 999,90
                    </p>

                    <p className="text-3xl font-black text-orange-400">
                      {product.price}
                    </p>

                  </div>

                </div>

                <button className="w-full mt-7 bg-orange-500 hover:bg-orange-400 transition-all duration-300 text-black py-4 rounded-2xl font-black text-lg shadow-2xl shadow-orange-500/20">
                  Ver Produto
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      <footer className="relative z-10 border-t border-white/10 py-10 px-6 text-center text-zinc-500 text-sm">
        © 2026 Bella Achadinhos Premium
      </footer>

    </div>
  );
}