"use client";

export default function Hero() {

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

      <div>

        <div className="inline-block border border-orange-500 text-orange-400 px-4 py-2 rounded-full mb-8">
          Atualizado automaticamente
        </div>

        <h2 className="text-7xl font-black leading-tight text-white mb-8">

          Os produtos
          <span className="text-orange-500">
            {" "}mais virais{" "}
          </span>
          da internet.

        </h2>

        <p className="text-zinc-400 text-xl mb-10">
          Produtos virais da Shopee,
          decoracao,
          tecnologia
          e tendencias.
        </p>

      </div>

      <img
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
        className="rounded-[40px] h-[600px] w-full object-cover border border-zinc-800"
      />

    </section>
  );
}