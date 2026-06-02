"use client";

import { useState, useEffect, useRef } from "react";

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

function loadProducts(): Product[] {
  try {
    const saved = localStorage.getItem("bella_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

const TEMPLATES = [
  { id: "viral", label: "🔥 Viral", bg: "#0a0a0a", accent: "#f97316" },
  { id: "luxury", label: "✨ Luxo", bg: "#0a0a0a", accent: "#d4a843" },
  { id: "promo", label: "💥 Promoção", bg: "#1a0a00", accent: "#f97316" },
  { id: "minimal", label: "⬛ Minimal", bg: "#111111", accent: "#ffffff" },
];

export default function StoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [customText, setCustomText] = useState("Achou, gostou, comprou! 🧡");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prods = loadProducts();
    setProducts(prods);
    if (prods.length > 0) setSelected(prods[0]);
  }, []);

  async function drawCard(canvas: HTMLCanvasElement, scale: number = 1) {
    if (!selected) return;
    const W = 1080 * scale;
    const H = 1920 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    // Fundo
    ctx.fillStyle = template.bg;
    ctx.fillRect(0, 0, W, H);

    // Gradiente topo
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    grad.addColorStop(0, template.accent + "22");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Gradiente rodapé
    const grad2 = ctx.createLinearGradient(0, H * 0.55, 0, H);
    grad2.addColorStop(0, "transparent");
    grad2.addColorStop(1, "#000000ee");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, W, H);

    // Imagem do produto
    if (selected.image) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
          img.src = selected.image;
        });
        // Centraliza imagem com crop
        const imgAspect = img.width / img.height;
        const targetW = W;
        const targetH = H * 0.65;
        let drawW = targetW;
        let drawH = drawW / imgAspect;
        if (drawH < targetH) { drawH = targetH; drawW = drawH * imgAspect; }
        const dx = (targetW - drawW) / 2;
        const dy = (targetH - drawH) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, targetH);
        ctx.clip();
        ctx.drawImage(img, dx, dy, drawW, drawH);
        ctx.restore();
      } catch {}
    }

    // Badge
    if (selected.badge) {
      ctx.fillStyle = template.accent;
      const bx = 60 * scale, by = 80 * scale;
      const bw = 180 * scale, bh = 60 * scale, br = 30 * scale;
      ctx.beginPath();
      ctx.moveTo(bx + br, by);
      ctx.lineTo(bx + bw - br, by);
      ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + br);
      ctx.lineTo(bx + bw, by + bh - br);
      ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - br, by + bh);
      ctx.lineTo(bx + br, by + bh);
      ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - br);
      ctx.lineTo(bx, by + br);
      ctx.quadraticCurveTo(bx, by, bx + br, by);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.font = `bold ${28 * scale}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(selected.badge.toUpperCase(), bx + bw / 2, by + bh * 0.68);
    }

    // Logo B
    const logoX = W - 120 * scale, logoY = 70 * scale;
    const logoR = 45 * scale;
    ctx.fillStyle = template.accent;
    ctx.beginPath();
    ctx.arc(logoX, logoY + logoR, logoR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = `900 ${50 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("B", logoX, logoY + logoR + 17 * scale);

    // Categoria
    ctx.fillStyle = template.accent + "cc";
    ctx.font = `${26 * scale}px Arial`;
    ctx.textAlign = "left";
    ctx.fillText(selected.category.toUpperCase(), 60 * scale, H * 0.70);

    // Titulo
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${72 * scale}px Arial`;
    ctx.textAlign = "left";
    // Quebra linha se necessário
    const words = selected.title.split(" ");
    let line = "";
    let lineY = H * 0.73;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > W - 120 * scale && line !== "") {
        ctx.fillText(line.trim(), 60 * scale, lineY);
        line = word + " ";
        lineY += 85 * scale;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 60 * scale, lineY);

    // Preço
    lineY += 110 * scale;
    ctx.fillStyle = template.accent;
    ctx.font = `900 ${110 * scale}px Arial`;
    ctx.textAlign = "left";
    ctx.fillText(selected.price, 60 * scale, lineY);

    // Estrelas
    lineY += 70 * scale;
    ctx.fillStyle = template.accent;
    ctx.font = `${40 * scale}px Arial`;
    ctx.fillText("★★★★★  " + selected.rating, 60 * scale, lineY);

    // Linha separadora
    lineY += 50 * scale;
    ctx.strokeStyle = template.accent + "44";
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(60 * scale, lineY);
    ctx.lineTo(W - 60 * scale, lineY);
    ctx.stroke();

    // Texto customizado
    lineY += 60 * scale;
    ctx.fillStyle = "#ffffff99";
    ctx.font = `${38 * scale}px Arial`;
    ctx.textAlign = "left";
    ctx.fillText(customText, 60 * scale, lineY);

    // URL Shopee
    lineY += 70 * scale;
    ctx.fillStyle = template.accent + "bb";
    ctx.font = `${30 * scale}px Arial`;
    ctx.fillText("🛒 Ver na Shopee → Link na bio", 60 * scale, lineY);

    // Nome da loja no rodapé
    ctx.fillStyle = "#ffffff44";
    ctx.font = `${28 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("Bella Achadinhos • Achou, gostou, comprou!", W / 2, H - 60 * scale);
  }

  async function updatePreview() {
    if (!previewRef.current || !selected) return;
    await drawCard(previewRef.current, 0.25);
  }

  useEffect(() => {
    updatePreview();
  }, [selected, template, customText]);

  async function handleDownload() {
    if (!canvasRef.current || !selected) return;
    setGenerating(true);
    setDone(false);
    await drawCard(canvasRef.current, 1);
    const link = document.createElement("a");
    link.download = `bella-stories-${selected.title.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    setGenerating(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-black text-xl">B</div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">Gerador de <span className="text-orange-500">Stories</span></h1>
              <p className="text-xs text-zinc-500">Cards prontos para Instagram e TikTok</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/10 px-4 py-2 rounded-full transition">← Loja</a>
            <a href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/10 px-4 py-2 rounded-full transition">Admin</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {products.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-2xl mb-2">Nenhum produto cadastrado</p>
            <p className="text-sm">Vá ao <a href="/admin" className="text-orange-400 underline">Admin</a> e cadastre produtos primeiro.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">

            {/* COLUNA ESQUERDA — CONTROLES */}
            <div className="space-y-6">

              {/* ESCOLHER PRODUTO */}
              <div>
                <h2 className="font-black text-lg mb-4">1. Escolha o produto</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {products.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition text-left ${selected?.id === p.id ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                    >
                      {p.image && <img src={p.image} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{p.title}</p>
                        <p className="text-orange-500 font-black text-sm">{p.price}</p>
                      </div>
                      {selected?.id === p.id && <span className="text-orange-500 text-lg flex-shrink-0">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* TEMPLATE */}
              <div>
                <h2 className="font-black text-lg mb-4">2. Escolha o estilo</h2>
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t)}
                      className={`px-4 py-3 rounded-2xl border text-sm font-bold transition ${template.id === t.id ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TEXTO CUSTOMIZADO */}
              <div>
                <h2 className="font-black text-lg mb-4">3. Texto do stories</h2>
                <input
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="Ex: Corre que é por tempo limitado!"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 text-sm"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Corre, acabando! 🔥", "Link na bio! 🛒", "Vi e comprei! ✨", "Presente perfeito! 🎁"].map(t => (
                    <button key={t} onClick={() => setCustomText(t)} className="text-xs bg-white/5 border border-white/10 text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition">
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* BAIXAR */}
              <button
                onClick={handleDownload}
                disabled={generating || !selected}
                className="w-full py-5 rounded-2xl font-black text-lg bg-orange-500 hover:bg-orange-400 text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Gerando...
                  </span>
                ) : done ? "✓ Baixado! Agora é só postar 🚀" : "⬇ Baixar Card para Stories"}
              </button>

              {done && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-5 py-4 rounded-2xl">
                  <p className="font-bold mb-1">Card gerado com sucesso!</p>
                  <p className="text-xs text-green-500">Tamanho: 1080x1920px — Pronto para Instagram Stories e TikTok. Lembre de colocar o link da loja na bio!</p>
                </div>
              )}

            </div>

            {/* COLUNA DIREITA — PREVIEW */}
            <div className="flex flex-col items-center">
              <h2 className="font-black text-lg mb-4 self-start">Preview</h2>
              <div className="relative">
                {/* Moldura de celular */}
                <div className="bg-zinc-900 border-4 border-zinc-700 rounded-[40px] p-2 shadow-2xl">
                  <div className="bg-black rounded-[32px] overflow-hidden" style={{ width: 270, height: 480 }}>
                    <canvas
                      ref={previewRef}
                      style={{ width: 270, height: 480, display: "block" }}
                    />
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3 bg-zinc-700 rounded-full" />
              </div>
              <p className="text-zinc-600 text-xs mt-4 text-center">Preview em tempo real • Download em 1080x1920px</p>
            </div>

          </div>
        )}

      </main>

      {/* Canvas oculto para download full res */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

    </div>
  );
}
