"use client";

import { useState, useEffect } from "react";

interface ProductResult {
  title: string;
  price: string;
  category: string;
  reason: string;
  searchUrl: string;
  badge: string;
}

interface QuickAdd {
  product: ProductResult;
  url: string;
  image: string;
}

const DEFAULT_TOPICS = [
  { label: "🔥 Mais Virais Agora", value: "produtos mais virais hype brasil 2026 shopee" },
  { label: "🏠 Casa & Decoração", value: "produtos decoracao casa viral trending brasil shopee 2026" },
  { label: "📱 Tecnologia", value: "gadgets tecnologia viral shopee brasil 2026" },
  { label: "💪 Fitness", value: "produtos fitness academia viral shopee brasil 2026" },
  { label: "🏊 Piscina & Lazer", value: "produtos piscina lazer viral shopee brasil 2026" },
  { label: "⚡ Automação", value: "automacao casa inteligente viral shopee brasil 2026" },
];

function loadCategories(): string[] {
  try {
    const saved = localStorage.getItem("bella_categories");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

export default function BellaIA() {
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(DEFAULT_TOPICS[0]);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [added, setAdded] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [searched, setSearched] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [quickAdd, setQuickAdd] = useState<QuickAdd | null>(null);

  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  const allFilters = ["Todos", ...categories.length > 0 ? categories : ["Tecnologia", "Decoracao", "Casa Moderna", "Fitness", "Piscina", "Automacao"]];

  async function buscarProdutos() {
    setLoading(true);
    setResults([]);
    setSearched(false);
    setStatusMsg("");
    setAdded([]);
    setQuickAdd(null);

    try {
      const response = await fetch("/api/bella-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic.value, categories }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResults(data.products);
      setSearched(true);
    } catch (err) {
      setStatusMsg("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function abrirQuickAdd(product: ProductResult) {
    setQuickAdd({ product, url: product.searchUrl, image: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function salvarQuickAdd() {
    if (!quickAdd) return;
    try {
      const saved = localStorage.getItem("bella_products");
      const current = saved ? JSON.parse(saved) : [];
      const newProduct = {
        id: Date.now().toString(),
        title: quickAdd.product.title,
        price: quickAdd.product.price,
        image: quickAdd.image,
        rating: "4.8",
        category: quickAdd.product.category,
        url: quickAdd.url || quickAdd.product.searchUrl,
        badge: quickAdd.product.badge,
      };
      localStorage.setItem("bella_products", JSON.stringify([...current, newProduct]));
      setAdded(prev => [...prev, quickAdd.product.title]);
      setStatusMsg(`✓ "${quickAdd.product.title}" adicionado à loja!`);
      setQuickAdd(null);
    } catch {
      setStatusMsg("Erro ao adicionar produto.");
    }
  }

  const filtered = activeFilter === "Todos" ? results : results.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black text-xl">B</div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">Bella <span className="text-orange-500">IA</span></h1>
              <p className="text-xs text-zinc-500">Produtos virais em tempo real</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="/" className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/10 px-4 py-2 rounded-full transition">← Loja</a>
            <a href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/10 px-4 py-2 rounded-full transition">Admin</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Tendências 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            O que está<br /><span className="text-orange-500">bombando agora</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            A Bella IA busca os produtos mais virais do momento para você adicionar na sua loja.
          </p>
        </div>

        {/* MINI FORMULARIO QUICK ADD */}
        {quickAdd && (
          <div className="bg-white/5 border border-orange-500/40 rounded-2xl p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-black text-orange-400 mb-1">Adicionar à Loja</h3>
                <p className="font-bold text-white">{quickAdd.product.title}</p>
                <p className="text-orange-500 font-black">{quickAdd.product.price}</p>
              </div>
              <button onClick={() => setQuickAdd(null)} className="text-zinc-600 hover:text-white text-xl transition">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Link direto do produto na Shopee *</label>
                <input
                  value={quickAdd.url}
                  onChange={e => setQuickAdd({ ...quickAdd, url: e.target.value })}
                  placeholder="Cole o link direto do produto aqui..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
                <p className="text-xs text-zinc-600 mt-1">Abra a Shopee, ache o produto e cole o link aqui</p>
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Link da imagem (opcional)</label>
                <input
                  value={quickAdd.image}
                  onChange={e => setQuickAdd({ ...quickAdd, image: e.target.value })}
                  placeholder="Clique com botao direito na foto → Copiar endereco da imagem"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
              {quickAdd.image && (
                <img src={quickAdd.image} className="w-20 h-20 object-cover rounded-xl" alt="preview" />
              )}
              <div className="flex gap-3">
                <button onClick={salvarQuickAdd} className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-xl transition text-sm">
                  ✓ Adicionar à Loja
                </button>
                <a href={quickAdd.product.searchUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center border border-white/10 hover:border-orange-500/40 text-zinc-400 hover:text-white py-3 rounded-xl transition text-sm">
                  Buscar na Shopee →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* STATUS */}
        {statusMsg && (
          <div className={`mb-6 border text-sm px-5 py-3 rounded-xl ${statusMsg.startsWith("✓") ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
            {statusMsg}
          </div>
        )}

        {/* TOPICOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {DEFAULT_TOPICS.map(topic => (
            <button key={topic.value} onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition text-left ${selectedTopic.value === topic.value ? "bg-orange-500 text-black border-orange-500" : "bg-white/5 text-zinc-400 border-white/10 hover:border-orange-500/40 hover:text-white"}`}>
              {topic.label}
            </button>
          ))}
        </div>

        {/* BOTAO BUSCAR */}
        <button onClick={buscarProdutos} disabled={loading}
          className="w-full py-5 rounded-2xl font-black text-lg transition mb-8 bg-orange-500 hover:bg-orange-400 text-black disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Bella IA buscando tendências 2026...
            </span>
          ) : "🔍 Buscar Produtos Virais 2026"}
        </button>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <span className="text-4xl animate-bounce">🔥</span>
              <p className="text-zinc-400 text-sm">Buscando o que está bombando no Brasil em 2026...</p>
              <div className="flex gap-1">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FILTROS */}
        {searched && results.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {allFilters.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition ${activeFilter === cat ? "bg-orange-500 text-black border-orange-500" : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"}`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* RESULTADOS */}
        {searched && filtered.length > 0 && (
          <>
            <p className="text-zinc-500 text-sm mb-6">
              {filtered.length} produto{filtered.length !== 1 ? "s" : ""} em alta — clique em <strong className="text-white">+ Adicionar</strong> para completar e salvar na loja
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((product, i) => {
                const isAdded = added.includes(product.title);
                return (
                  <div key={i} className={`bg-white/5 border rounded-2xl p-5 transition ${isAdded ? "border-green-500/40" : "border-white/10 hover:border-orange-500/30"}`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">{product.badge}</span>
                          <span className="text-zinc-600 text-xs">{product.category}</span>
                        </div>
                        <h3 className="font-bold text-white text-base leading-tight">{product.title}</h3>
                      </div>
                      <p className="text-orange-500 font-black text-lg whitespace-nowrap">{product.price}</p>
                    </div>
                    <p className="text-zinc-500 text-xs mb-4 italic">"{product.reason}"</p>
                    <div className="flex gap-2">
                      <a href={product.searchUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 text-center text-xs border border-white/10 hover:border-orange-500/40 text-zinc-400 hover:text-white py-2 rounded-xl transition">
                        Buscar na Shopee →
                      </a>
                      <button onClick={() => abrirQuickAdd(product)} disabled={isAdded}
                        className={`flex-1 text-xs font-bold py-2 rounded-xl transition ${isAdded ? "bg-green-500/20 text-green-400 cursor-default" : "bg-orange-500 hover:bg-orange-400 text-black"}`}>
                        {isAdded ? "✓ Adicionado!" : "+ Adicionar à Loja"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 text-sm text-zinc-400">
              <p className="font-bold text-white mb-1">💡 Dica</p>
              <p>Clique em <strong className="text-white">"Buscar na Shopee"</strong> para achar o produto, depois clique <strong className="text-white">"+ Adicionar à Loja"</strong> e cole o link direto e a imagem.</p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
