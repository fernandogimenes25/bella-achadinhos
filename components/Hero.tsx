export default function Hero() {
return (
<section className="relative overflow-hidden py-24 px-6">

<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

<div>

<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-300 text-sm mb-8">
Produtos virais atualizados diariamente
</div>

<h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none">
Os produtos
<span className="block text-orange-400">
mais desejados
</span>
da internet.
</h1>

<p className="text-zinc-400 text-xl leading-relaxed mt-8 max-w-xl">
Descubra produtos virais, decoracao moderna, tecnologia e achadinhos premium da Shopee.
</p>

<div className="flex flex-wrap gap-4 mt-10">

<a
href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1^&view=storefront"
target="_blank"
className="bg-orange-500 hover:bg-orange-400 transition px-8 py-5 rounded-2xl text-black font-black text-lg shadow-2xl"
>
Explorar Produtos
</a>

<button className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-8 py-5 rounded-2xl font-bold">
Bella Trends
</button>

</div>

</div>

<div className="relative">

<div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full" />

<img
src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80^&w=1400^&auto=format^&fit=crop"
alt="Bella Achadinhos"
className="relative rounded-[32px] border border-white/10 shadow-2xl"
/>

</div>

</div>

</section>
);
}
