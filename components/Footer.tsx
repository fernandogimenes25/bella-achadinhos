export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-12">

          <div>
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-black font-black text-2xl">
                B
              </div>

              <div>
                <h3 className="text-2xl font-black">
                  Bella Achadinhos
                </h3>

                <p className="text-zinc-500 text-sm">
                  Achadinhos premium
                </p>
              </div>

            </div>

            <p className="text-zinc-400 mt-6 leading-relaxed">
              Produtos virais, tecnologia, decoracao moderna e os melhores achadinhos da Shopee.
            </p>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">
              Categorias
            </h4>

            <div className="flex flex-col gap-3 text-zinc-400">
              <a href="#">Tecnologia</a>
              <a href="#">Decoracao</a>
              <a href="#">Casa Moderna</a>
              <a href="#">Virais</a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">
              Links
            </h4>

            <div className="flex flex-col gap-3 text-zinc-400">
              <a href="#">Inicio</a>
              <a href="#">Produtos</a>
              <a href="#">Shopee</a>
              <a href="#">Contato</a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">
              Bella Trends
            </h4>

            <p className="text-zinc-400 leading-relaxed">
              Descubra diariamente os produtos mais desejados da internet.
            </p>

            <a
              href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"
              target="_blank"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-400 transition text-black px-6 py-3 rounded-2xl font-black"
            >
              Abrir Shopee
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}