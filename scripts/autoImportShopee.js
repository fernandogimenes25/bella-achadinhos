"use client";

const products = [
  {
    title: "Projetor Galaxy LED",
    price: "R$ 89,90",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    link: "https://shopee.com.br",
  },

  {
    title: "Luminária Moderna",
    price: "R$ 129,90",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    link: "https://shopee.com.br",
  },

  {
    title: "Painel Ripado",
    price: "R$ 249,90",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    link: "https://shopee.com.br",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <header className="border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black text-orange-500">
              Bella Achadinhos
            </h1>

            <p className="text-zinc-400">
              Achadinhos premium da Shopee
            </p>
          </div>

          <button className="bg-orange-500 hover:bg-orange-400 transition text-black px-6 py-3 rounded-2xl font-bold">
            Abrir Shopee
          </button>

        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <div className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm mb-6">
              🔥 Produtos virais atualizados diariamente
            </div>

            <h2 className="text-6xl font-black leading-tight">
              Os achadinhos mais desejados da internet.
            </h2>

            <p className="text-zinc-400 text-lg mt-6">
              Decoração, tecnologia e produtos virais.
            </p>

            <div className="flex gap-4 mt-8">

              <button className="bg-orange-500 hover:bg-orange-400 transition px-8 py-4 rounded-2xl font-black text-black">
                Explorar Produtos
              </button>

              <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-bold">
                Bella Trends
              </button>

            </div>

          </div>

          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop"
            className="rounded-[32px]"
          />

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h3 className="text-4xl font-black mb-10">
          Produtos em destaque
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.title}
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all"
            >

              <img
                src={product.image}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">

                <h4 className="text-2xl font-bold">
                  {product.title}
                </h4>

                <p className="text-orange-400 text-3xl font-black mt-4">
                  {product.price}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  className="block w-full mt-6 bg-orange-500 hover:bg-orange-400 transition text-center text-black py-4 rounded-2xl font-bold"
                >
                  Ver Produto
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}