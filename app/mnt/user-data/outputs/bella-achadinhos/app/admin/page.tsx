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

const CATEGORIES = ["Tecnologia", "Decoracao", "Casa Moderna", "Virais", "Piscina", "Automacao", "Outros"];

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

const emptyForm = {
  title: "",
  price: "",
  image: "",
  rating: "4.9",
  category: "Tecnologia",
  url: "",
  badge: "Viral",
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const ADMIN_PASSWORD = "bella2025";

  useEffect(() => {
    const savedProds = localStorage.getItem("bella_products");
    if (savedProds) {
      try {
        const parsed = JSON.parse(savedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        } else {
          setProducts(defaultProducts);
        }
      } catch {
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }
    const auth = sessionStorage.getItem("bella_admin");
    if (auth === "true") setUnlocked(true);
  }, []);

  function saveToStorage(prods: Product[]) {
    localStorage.setItem("bella_products", JSON.stringify(prods));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      sessionStorage.setItem("bella_admin", "true");
      setWrongPass(false);
    } else {
      setWrongPass(true);
    }
  }

  function handleAdd() {
    if (!form.title || !form.url) return;
    const newProduct: Product = {
      ...form,
      id: Date.now().toString(),
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveToStorage(updated);
    setForm(emptyForm);
    setShowForm(false);
  }

  function handleEdit(product: Product) {
    setEditId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category: product.category,
      url: product.url,
      badge: product.badge || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleUpdate() {
    const updated = products.map((p) =>
      p.id === editId ? { ...p, ...form } : p
    );
    setProducts(updated);
    saveToStorage(updated);
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Remover este produto?")) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(updated);
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black text-xl">B</div>
            <div>
              <h1 className="text-white font-black">Admin</h1>
              <p className="text-zinc-500 text-xs">Bella Achadinhos</p>
            </div>
          </div>
          <label className="block text-sm text-zinc-400 mb-2">Senha de acesso</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Digite a senha..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 mb-1"
          />
          {wrongPass && <p className="text-red-400 text-xs mb-3">Senha incorreta.</p>}
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-400 transition text-black font-bold py-3 rounded-xl"
          >
            Entrar
          </button>
          <a href="/" className="block text-center text-zinc-600 hover:text-zinc-400 text-xs mt-4 transition">
            ← Voltar para a loja
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black">B</div>
            <div>
              <h1 className="font-black text-white leading-none">Painel Admin</h1>
              <p className="text-xs text-zinc-500">Bella Achadinhos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-400 text-sm font-medium">✓ Salvo!</span>
            )}
            <a
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition border border-white/10 px-4 py-2 rounded-full"
            >
              Ver Loja →
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Total de Produtos</p>
            <p className="text-3xl font-black text-white">{products.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Categorias</p>
            <p className="text-3xl font-black text-orange-500">
              {new Set(products.map((p) => p.category)).size}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Virais</p>
            <p className="text-3xl font-black text-white">
              {products.filter((p) => p.badge === "Viral").length}
            </p>
          </div>
        </div>

        {/* Add Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-8 border-2 border-dashed border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-orange-300 py-5 rounded-2xl font-bold transition text-sm"
          >
            + Adicionar Novo Produto
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 border border-orange-500/30 rounded-2xl p-6 mb-8">
            <h2 className="font-black text-lg mb-6 text-orange-400">
              {editId ? "Editar Produto" : "Novo Produto"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nome do Produto *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Luminaria LED Galaxy"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Preco *</label>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Ex: R$ 89,90"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1">Link do Produto na Shopee *</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="Cole o link do produto aqui..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
                <p className="text-xs text-zinc-600 mt-1">Ex: https://shopee.com.br/produto-xxx</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1">Link da Imagem</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Cole o link da imagem (URL)..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
                <p className="text-xs text-zinc-600 mt-1">Dica: clique com botao direito na imagem da Shopee → Copiar endereco da imagem</p>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Badge (opcional)</label>
                <select
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                >
                  <option value="">Nenhum</option>
                  <option value="Viral">Viral</option>
                  <option value="Novo">Novo</option>
                  <option value="Oferta">Oferta</option>
                  <option value="Top">Top</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Avaliacao</label>
                <input
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  placeholder="4.9"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

            </div>

            {/* Preview */}
            {(form.image || form.title) && (
              <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
                <p className="text-xs text-zinc-500 mb-3">Preview:</p>
                <div className="flex gap-4 items-start">
                  {form.image && (
                    <img src={form.image} alt="preview" className="w-20 h-20 object-cover rounded-xl" />
                  )}
                  <div>
                    <p className="font-bold text-sm">{form.title || "—"}</p>
                    <p className="text-orange-500 font-black">{form.price || "—"}</p>
                    <p className="text-xs text-zinc-500 mt-1">{form.category} {form.badge && `• ${form.badge}`}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={editId ? handleUpdate : handleAdd}
                className="bg-orange-500 hover:bg-orange-400 transition text-black font-bold px-8 py-3 rounded-xl text-sm"
              >
                {editId ? "Salvar Alteracoes" : "Adicionar Produto"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-white/5 hover:bg-white/10 transition text-zinc-400 font-medium px-6 py-3 rounded-xl text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="space-y-3">
          <h2 className="font-bold text-zinc-400 text-sm uppercase tracking-wider mb-4">
            Produtos cadastrados ({products.length})
          </h2>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition"
            >
              <img
                src={product.image || "https://via.placeholder.com/80"}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0 bg-white/5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-sm truncate">{product.title}</p>
                  {product.badge && (
                    <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-orange-500 font-black text-sm">{product.price}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{product.category} • {product.url.slice(0, 45)}...</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
