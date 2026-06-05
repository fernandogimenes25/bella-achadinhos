"use client";

import { useState, useEffect, useRef } from "react";
import {
  getProducts, addProduct, updateProduct, deleteProduct,
  getCategories, addCategory, updateCategory, deleteCategory, reorderCategories,
  type Product
} from "../lib/supabase";

const BADGES = ["", "Viral", "Novo", "Oferta", "Top"];

const emptyForm = {
  title: "", price: "", image: "", rating: "4.9",
  category: "", url: "", badge: "Viral",
};

const TEMPLATES = [
  { id: "viral", label: "🔥 Viral", bg: "#0a0a0a", accent: "#f97316" },
  { id: "luxury", label: "✨ Luxo", bg: "#0a0a0a", accent: "#d4a843" },
  { id: "promo", label: "💥 Promoção", bg: "#1a0a00", accent: "#f97316" },
  { id: "minimal", label: "⬛ Minimal", bg: "#111111", accent: "#ffffff" },
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"produtos" | "categorias" | "stories">("produtos");
  const [newCatName, setNewCatName] = useState("");
  const [editCatIndex, setEditCatIndex] = useState<number | null>(null);
  const [editCatName, setEditCatName] = useState("");
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "bella2025";

  useEffect(() => {
    const auth = sessionStorage.getItem("bella_admin");
    if (auth === "true") {
      setUnlocked(true);
      loadData();
    }
  }, []);

  async function loadData() {
    setLoading(true);
    const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
    setProducts(prods);
    setCategories(cats);
    if (cats.length > 0) setForm(f => ({ ...f, category: cats[0] }));
    setLoading(false);
  }

  function flash() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      sessionStorage.setItem("bella_admin", "true");
      loadData();
    } else {
      setWrongPass(true);
    }
  }

  async function handleAdd() {
    if (!form.title || !form.url) return;
    const newProduct: Product = { ...form, id: Date.now().toString() };
    await addProduct(newProduct);
    setProducts(prev => [newProduct, ...prev]);
    setForm({ ...emptyForm, category: categories[0] || "" });
    setShowForm(false);
    flash();
  }

  function handleEdit(product: Product) {
    setEditId(product.id);
    setForm({ title: product.title, price: product.price, image: product.image, rating: product.rating, category: product.category, url: product.url, badge: product.badge || "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpdate() {
    if (!editId) return;
    const updated = { ...form, id: editId } as Product;
    await updateProduct(updated);
    setProducts(prev => prev.map(p => p.id === editId ? updated : p));
    setForm({ ...emptyForm, category: categories[0] || "" });
    setEditId(null);
    setShowForm(false);
    flash();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover este produto?")) return;
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    flash();
  }

  function handleCancel() {
    setForm({ ...emptyForm, category: categories[0] || "" });
    setEditId(null);
    setShowForm(false);
  }

  async function handleAddCat() {
    const name = newCatName.trim();
    if (!name || categories.includes(name)) return;
    await addCategory(name, categories.length);
    setCategories(prev => [...prev, name]);
    setNewCatName("");
    flash();
  }

  async function handleSaveEditCat() {
    const name = editCatName.trim();
    if (!name || editCatIndex === null) return;
    const oldName = categories[editCatIndex];
    await updateCategory(oldName, name);
    setCategories(prev => prev.map((c, i) => i === editCatIndex ? name : c));
    setProducts(prev => prev.map(p => p.category === oldName ? { ...p, category: name } : p));
    setEditCatIndex(null);
    flash();
  }

  async function handleDeleteCat(index: number) {
    if (!confirm(`Remover categoria "${categories[index]}"?`)) return;
    await deleteCategory(categories[index]);
    setCategories(prev => prev.filter((_, i) => i !== index));
    flash();
  }

  async function moveCat(index: number, dir: -1 | 1) {
    const updated = [...categories];
    const swap = index + dir;
    if (swap < 0 || swap >= updated.length) return;
    [updated[index], updated[swap]] = [updated[swap], updated[index]];
    setCategories(updated);
    await reorderCategories(updated);
    flash();
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
          <label className="block text-sm text-zinc-400 mb-2">Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Digite a senha..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 mb-1" />
          {wrongPass && <p className="text-red-400 text-xs mb-3">Senha incorreta.</p>}
          <button onClick={handleLogin} className="w-full mt-4 bg-orange-500 hover:bg-orange-400 transition text-black font-bold py-3 rounded-xl">Entrar</button>
          <a href="/" className="block text-center text-zinc-600 hover:text-zinc-400 text-xs mt-4 transition">← Voltar para a loja</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
            {saved && <span className="text-green-400 text-sm font-medium">✓ Salvo!</span>}
            {loading && <span className="text-zinc-400 text-sm">Carregando...</span>}
            <a href="/" className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/10 px-4 py-2 rounded-full transition">Ver Loja →</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Produtos</p>
            <p className="text-3xl font-black text-white">{products.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Categorias</p>
            <p className="text-3xl font-black text-orange-500">{categories.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-zinc-500 text-xs mb-1">Virais</p>
            <p className="text-3xl font-black text-white">{products.filter(p => p.badge === "Viral").length}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8">
          {[["produtos","📦 Produtos"],["categorias","🏷️ Categorias"],["stories","📱 Stories"]].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition border ${activeTab === tab ? "bg-orange-500 text-black border-orange-500" : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ABA PRODUTOS */}
        {activeTab === "produtos" && (
          <>
            {!showForm && (
              <button onClick={() => setShowForm(true)}
                className="w-full mb-8 border-2 border-dashed border-orange-500/30 hover:border-orange-500 text-orange-400 py-5 rounded-2xl font-bold transition text-sm">
                + Adicionar Novo Produto
              </button>
            )}

            {showForm && (
              <div className="bg-white/5 border border-orange-500/30 rounded-2xl p-6 mb-8">
                <h2 className="font-black text-lg mb-6 text-orange-400">{editId ? "Editar Produto" : "Novo Produto"}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Nome *</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Luminaria LED Galaxy" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Preco *</label>
                    <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Ex: R$ 89,90" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-zinc-400 block mb-1">Link do Produto *</label>
                    <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="Cole o link do produto aqui..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-zinc-400 block mb-1">Link da Imagem</label>
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Cole o link da imagem..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Categoria</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Badge</label>
                    <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm">
                      {BADGES.map(b => <option key={b} value={b}>{b || "Nenhum"}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Avaliacao</label>
                    <input value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} placeholder="4.9" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                </div>
                {(form.image || form.title) && (
                  <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-xs text-zinc-500 mb-3">Preview:</p>
                    <div className="flex gap-4 items-start">
                      {form.image && <img src={form.image} className="w-20 h-20 object-cover rounded-xl" />}
                      <div>
                        <p className="font-bold text-sm">{form.title || "—"}</p>
                        <p className="text-orange-500 font-black">{form.price || "—"}</p>
                        <p className="text-xs text-zinc-500 mt-1">{form.category} {form.badge && `• ${form.badge}`}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={editId ? handleUpdate : handleAdd} className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-8 py-3 rounded-xl text-sm">
                    {editId ? "Salvar" : "Adicionar"}
                  </button>
                  <button onClick={handleCancel} className="bg-white/5 text-zinc-400 px-6 py-3 rounded-xl text-sm">Cancelar</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h2 className="font-bold text-zinc-400 text-sm uppercase tracking-wider mb-4">Produtos ({products.length})</h2>
              {products.map(product => (
                <div key={product.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition">
                  <img src={product.image || "https://via.placeholder.com/80"} className="w-16 h-16 object-cover rounded-xl flex-shrink-0 bg-white/5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm truncate">{product.title}</p>
                      {product.badge && <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">{product.badge}</span>}
                    </div>
                    <p className="text-orange-500 font-black text-sm">{product.price}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{product.category} • {product.url.slice(0, 40)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg transition">Remover</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ABA CATEGORIAS */}
        {activeTab === "categorias" && (
          <div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 mb-8 text-sm text-zinc-400">
              <p className="font-bold text-white mb-1">💡 Como funciona</p>
              <p>Categorias aparecem como abas na loja. Crie, renomeie, reordene e remova conforme o momento.</p>
            </div>
            <div className="flex gap-3 mb-8">
              <input value={newCatName} onChange={e => setNewCatName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddCat()}
                placeholder="Nome da nova categoria..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm" />
              <button onClick={handleAddCat} className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-xl text-sm">+ Adicionar</button>
            </div>
            <div className="space-y-3">
              {categories.map((cat, index) => (
                <div key={cat} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveCat(index, -1)} disabled={index === 0} className="text-zinc-600 hover:text-white disabled:opacity-20 text-xs">▲</button>
                    <button onClick={() => moveCat(index, 1)} disabled={index === categories.length - 1} className="text-zinc-600 hover:text-white disabled:opacity-20 text-xs">▼</button>
                  </div>
                  <div className="flex-1">
                    {editCatIndex === index ? (
                      <input value={editCatName} onChange={e => setEditCatName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSaveEditCat()} autoFocus
                        className="w-full bg-black border border-orange-500 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white text-sm">{cat}</span>
                        <span className="text-zinc-600 text-xs">{products.filter(p => p.category === cat).length} produtos</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editCatIndex === index ? (
                      <>
                        <button onClick={handleSaveEditCat} className="text-xs bg-orange-500 text-black font-bold px-3 py-2 rounded-lg">Salvar</button>
                        <button onClick={() => setEditCatIndex(null)} className="text-xs bg-white/5 text-zinc-400 px-3 py-2 rounded-lg">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditCatIndex(index); setEditCatName(cat); }} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition">Renomear</button>
                        <button onClick={() => handleDeleteCat(index)} className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg">Remover</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA STORIES */}
        {activeTab === "stories" && <StoriesTab products={products} />}

      </main>
    </div>
  );
}

// STORIES TAB
function StoriesTab({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Product | null>(products[0] || null);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [customText, setCustomText] = useState("Achou, gostou, comprou! 🧡");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  async function drawCard(canvas: HTMLCanvasElement, scale: number = 1) {
    if (!selected) return;
    const W = 1080 * scale, H = 1920 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = template.bg; ctx.fillRect(0, 0, W, H);
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    grad.addColorStop(0, template.accent + "22"); grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    const grad2 = ctx.createLinearGradient(0, H * 0.55, 0, H);
    grad2.addColorStop(0, "transparent"); grad2.addColorStop(1, "#000000ee");
    ctx.fillStyle = grad2; ctx.fillRect(0, 0, W, H);
    if (selected.image) {
      try {
        const img = new Image(); img.crossOrigin = "anonymous";
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = selected!.image; });
        const iA = img.width / img.height, tW = W, tH = H * 0.65;
        let dW = tW, dH = dW / iA;
        if (dH < tH) { dH = tH; dW = dH * iA; }
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, tH); ctx.clip();
        ctx.drawImage(img, (tW - dW) / 2, (tH - dH) / 2, dW, dH); ctx.restore();
      } catch {}
    }
    if (selected.badge) {
      ctx.fillStyle = template.accent;
      const bx = 60*scale, by = 80*scale, bw = 180*scale, bh = 60*scale, br = 30*scale;
      ctx.beginPath(); ctx.moveTo(bx+br,by); ctx.lineTo(bx+bw-br,by); ctx.quadraticCurveTo(bx+bw,by,bx+bw,by+br); ctx.lineTo(bx+bw,by+bh-br); ctx.quadraticCurveTo(bx+bw,by+bh,bx+bw-br,by+bh); ctx.lineTo(bx+br,by+bh); ctx.quadraticCurveTo(bx,by+bh,bx,by+bh-br); ctx.lineTo(bx,by+br); ctx.quadraticCurveTo(bx,by,bx+br,by); ctx.fill();
      ctx.fillStyle = "#000"; ctx.font = `bold ${28*scale}px Arial`; ctx.textAlign = "center";
      ctx.fillText(selected.badge.toUpperCase(), bx+bw/2, by+bh*0.68);
    }
    const lX = W-120*scale, lY = 70*scale, lR = 45*scale;
    ctx.fillStyle = template.accent; ctx.beginPath(); ctx.arc(lX, lY+lR, lR, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#000"; ctx.font = `900 ${50*scale}px Arial`; ctx.textAlign = "center";
    ctx.fillText("B", lX, lY+lR+17*scale);
    ctx.fillStyle = template.accent+"cc"; ctx.font = `${26*scale}px Arial`; ctx.textAlign = "left";
    ctx.fillText(selected.category.toUpperCase(), 60*scale, H*0.70);
    ctx.fillStyle = "#ffffff"; ctx.font = `bold ${72*scale}px Arial`;
    const words = selected.title.split(" "); let line = "", lnY = H*0.73;
    for (const w of words) { const t = line+w+" "; if (ctx.measureText(t).width > W-120*scale && line) { ctx.fillText(line.trim(), 60*scale, lnY); line=w+" "; lnY+=85*scale; } else line=t; }
    ctx.fillText(line.trim(), 60*scale, lnY);
    lnY += 110*scale; ctx.fillStyle = template.accent; ctx.font = `900 ${110*scale}px Arial`;
    ctx.fillText(selected.price, 60*scale, lnY);
    lnY += 70*scale; ctx.fillStyle = template.accent; ctx.font = `${40*scale}px Arial`;
    ctx.fillText("★★★★★  "+selected.rating, 60*scale, lnY);
    lnY += 50*scale; ctx.strokeStyle = template.accent+"44"; ctx.lineWidth = 2*scale;
    ctx.beginPath(); ctx.moveTo(60*scale, lnY); ctx.lineTo(W-60*scale, lnY); ctx.stroke();
    lnY += 60*scale; ctx.fillStyle = "#ffffff99"; ctx.font = `${38*scale}px Arial`;
    ctx.fillText(customText, 60*scale, lnY);
    lnY += 70*scale; ctx.fillStyle = template.accent+"bb"; ctx.font = `${30*scale}px Arial`;
    ctx.fillText("🛒 Ver na Shopee → Link na bio", 60*scale, lnY);
    ctx.fillStyle = "#ffffff44"; ctx.font = `${28*scale}px Arial`; ctx.textAlign = "center";
    ctx.fillText("Bella Achadinhos • Achou, gostou, comprou!", W/2, H-60*scale);
  }

  useEffect(() => {
    if (previewRef.current && selected) drawCard(previewRef.current, 0.25);
  }, [selected, template, customText]);

  async function handleDownload() {
    if (!canvasRef.current || !selected) return;
    setGenerating(true); setDone(false);
    await drawCard(canvasRef.current, 1);
    const link = document.createElement("a");
    link.download = `bella-stories-${selected.title.replace(/\s+/g,"-").toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    setGenerating(false); setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  if (products.length === 0) return (
    <div className="text-center py-20 text-zinc-500">
      <p>Cadastre produtos primeiro na aba Produtos.</p>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <h2 className="font-black text-lg mb-4">1. Escolha o produto</h2>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {products.map(p => (
              <button key={p.id} onClick={() => setSelected(p)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition text-left ${selected?.id===p.id?"border-orange-500 bg-orange-500/10":"border-white/10 bg-white/5"}`}>
                {p.image && <img src={p.image} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{p.title}</p>
                  <p className="text-orange-500 font-black text-sm">{p.price}</p>
                </div>
                {selected?.id===p.id && <span className="text-orange-500">✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-black text-lg mb-4">2. Estilo</h2>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t)}
                className={`px-4 py-3 rounded-2xl border text-sm font-bold transition ${template.id===t.id?"border-orange-500 bg-orange-500/10 text-orange-400":"border-white/10 bg-white/5 text-zinc-400"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-black text-lg mb-4">3. Texto</h2>
          <input value={customText} onChange={e => setCustomText(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm" />
          <div className="flex flex-wrap gap-2 mt-2">
            {["Corre, acabando! 🔥","Link na bio! 🛒","Vi e comprei! ✨","Presente perfeito! 🎁"].map(t=>(
              <button key={t} onClick={()=>setCustomText(t)} className="text-xs bg-white/5 border border-white/10 text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition">{t}</button>
            ))}
          </div>
        </div>
        <button onClick={handleDownload} disabled={generating||!selected}
          className="w-full py-5 rounded-2xl font-black text-lg bg-orange-500 hover:bg-orange-400 text-black transition disabled:opacity-60">
          {generating ? "Gerando..." : done ? "✓ Baixado! 🚀" : "⬇ Baixar Card para Stories"}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-black text-lg mb-4 self-start">Preview</h2>
        <div className="bg-zinc-900 border-4 border-zinc-700 rounded-[40px] p-2 shadow-2xl">
          <div className="bg-black rounded-[32px] overflow-hidden" style={{width:270,height:480}}>
            <canvas ref={previewRef} style={{width:270,height:480,display:"block"}} />
          </div>
        </div>
        <p className="text-zinc-600 text-xs mt-4 text-center">1080x1920px — Instagram e TikTok</p>
      </div>
      <canvas ref={canvasRef} style={{display:"none"}} />
    </div>
  );
}
