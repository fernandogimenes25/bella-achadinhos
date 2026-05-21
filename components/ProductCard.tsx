"use client";

import { motion } from "framer-motion";

export default function ProductCard({ product }: any) {
  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-orange-500/40 transition-all duration-300 shadow-2xl"
    >

      <div className="relative overflow-hidden">

        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-cover"
        />

        <div className="absolute top-4 left-4 bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-black shadow-xl">
          Viral
        </div>

      </div>

      <div className="p-6">

        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-zinc-400 text-sm">4.9</span>
        </div>

        <h3 className="text-2xl font-black leading-snug">
          {product.title}
        </h3>

        <p className="text-orange-400 text-3xl font-black mt-4">
          {product.price}
        </p>

        <a
          href="https://collshp.com/n/fernandogimenes891585?share_channel_code=1&view=storefront"
          target="_blank"
          className="block mt-6 text-center bg-orange-500 hover:bg-orange-400 transition text-black py-4 rounded-2xl font-black shadow-xl"
        >
          Ver Produto
        </a>

      </div>

    </motion.div>
  );
}