export default function Navbar() {
return (
<header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">

<div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

<div className="flex items-center gap-4">

<div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-black font-black text-2xl shadow-lg">
B
</div>

<div>
<h1 className="text-2xl font-black tracking-tight">
Bella Achadinhos
</h1>

<p className="text-zinc-400 text-sm">
Achadinhos premium da Shopee
</p>
</div>

</div>

<nav className="hidden md:flex items-center gap-8 text-sm font-medium">
<a href="#" className="hover:text-orange-400 transition">Inicio</a>
<a href="#" className="hover:text-orange-400 transition">Categorias</a>
<a href="#" className="hover:text-orange-400 transition">Virais</a>
<a href="#" className="hover:text-orange-400 transition">Tecnologia</a>
</nav>

<a
href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1^&view=storefront"
target="_blank"
className="bg-orange-500 hover:bg-orange-400 transition text-black px-6 py-3 rounded-2xl font-bold shadow-xl"
>
Abrir Shopee
</a>

</div>

</header>
);
}
