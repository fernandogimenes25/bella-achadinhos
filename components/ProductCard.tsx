"use client";

export default function ProductCard({ product }: any) {

  return (

    <a
      href={product.shopee_link}
      target="_blank"
      className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition hover:-translate-y-2"
    >

      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      <div className="p-5">

        <h2 className="font-bold text-white line-clamp-2 min-h-[55px] mb-5">
          {product.title}
        </h2>

        <div className="text-orange-400 font-black text-3xl">
          {product.price}
        </div>

      </div>

    </a>

  );
}