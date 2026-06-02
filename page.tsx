"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: string;
  category: string;
  url: string;
  badge?: string;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Projetor Smart 4K",
    price: "R$ 599,90",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    category: "Tecnologia",
    url: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    badge: "Viral",
  },
  {
    id: "2",
    title: "Luminaria LED Premium",
    price: "R$ 129,90",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    category: "Decoracao",
    url: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    badge: "Viral",
  },
  {
    id: "3",
    title: "Painel Ripado Decorativo",
    price: "R$ 249,90",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    category: "Casa Moderna",
    url: "https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront",
    badge: "Viral",
  },
];

function loadProducts(): Product[] {
  try {
    const saved = localStorage.getItem("bella_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultProducts;
}

function loadCategories(): string[] {
  try {
    const saved = localStorage.getItem("bella_categories");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return ["Tecnologia", "Decoracao", "Casa Moderna", "Virais", "Piscina", "Automacao"];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProducts(loadProducts());
    setCategories(loadCategories());
    setLoaded(true);
    function onStorage(e: StorageEvent) {
      if (e.key === "bella_products") setProducts(loadProducts());
      if (e.key === "bella_categories") setCategories(loadCategories());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const allCategories = ["Todos", ...categories];

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter(
          (p) =>
            p.category === activeCategory
        );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black text-xl">
              B
            </div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">Bella Achadinhos</h1>
              <p className="text-xs text-zinc-500">Achadinhos premium da Shopee</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-orange-400 transition">Inicio</a>
            <a href="#produtos" className="hover:text-orange-400 transition">Produtos</a>
            <a href="/bella-ia" className="flex items-center gap-1 text-orange-400 font-bold hover:text-orange-300 transition">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Bella IA
            </a>
          </nav>
          <a
            href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-400 transition text-black text-sm font-bold px-5 py-2 rounded-full"
          >
            Abrir Shopee
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              Produtos virais atualizados diariamente
            </span>
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Os produtos
              <span className="block text-orange-500">mais desejados</span>
              da internet.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Descubra produtos virais, decoracao moderna, tecnologia e achadinhos premium da Shopee.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#produtos"
                className="bg-orange-500 hover:bg-orange-400 transition text-black font-bold px-8 py-4 rounded-2xl"
              >
                Explorar Produtos
              </a>
              <span className="flex items-center gap-2 text-zinc-400 text-sm px-4 py-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Bella Trends
              </span>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Bella Achadinhos"
              className="w-full max-w-sm object-contain"
              style={{ imageRendering: "auto" }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop";
                e.currentTarget.className = "w-full max-w-sm object-cover rounded-3xl";
              }}
            />

          </div>
        </div>
      </section>

      {/* CATEGORIAS + BOTAO ADMIN */}
      <section id="produtos" className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition border ${
                activeCategory === cat
                  ? "bg-orange-500 text-black border-orange-500"
                  : "bg-white/5 text-zinc-400 border-white/10 hover:border-orange-500/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* BOTAO CADEADO ADMIN */}
          <a
            href="/admin"
            title="Painel Admin"
            className="ml-auto flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 hover:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </a>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {!loaded ? (
          <div className="text-center py-20 text-zinc-600">Carregando produtos...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-2xl mb-2">Nenhum produto nesta categoria</p>
            <p className="text-sm">
              Acesse o{" "}
              <a href="/admin" className="text-orange-400 underline">
                painel admin
              </a>{" "}
              para adicionar produtos.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 rounded-[28px] overflow-hidden hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop"}
                    alt={product.title}
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-xs text-zinc-300 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-orange-400 text-xs">{"★★★★★"}</span>
                    <span className="text-zinc-500 text-xs">{product.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition">
                    {product.title}
                  </h3>
                  <p className="text-orange-500 text-2xl font-black mt-2">{product.price}</p>
                  <div className="mt-5 w-full bg-orange-500 group-hover:bg-orange-400 transition text-black py-3 rounded-xl font-bold text-center text-sm">
                    Ver Produto na Shopee →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-20 py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black">B</div>
              <span className="font-black text-lg">Bella Achadinhos</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Achadinhos premium. Produtos virais, tecnologia, decoracao moderna e os melhores achadinhos da Shopee.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categorias</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              {["Tecnologia","Decoracao","Casa Moderna","Virais"].map((c) => (
                <li key={c}><a href="#" className="hover:text-orange-400 transition">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Bella Trends</h4>
            <p className="text-zinc-500 text-sm mb-4">Descubra diariamente os produtos mais desejados da internet.</p>
            <a
              href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-400 transition text-black font-bold px-5 py-2 rounded-full text-sm"
            >
              Abrir Shopee
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-zinc-600">
          <span>© 2025 Bella Achadinhos — Achou, gostou, comprou! ♥</span>
          <a href="/admin" className="hover:text-zinc-400 transition">⚙</a>
        </div>
      </footer>

    </div>
  );
}
