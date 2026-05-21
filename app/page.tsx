import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {

const categories = [
"Casa Moderna",
"Decoracao",
"Tecnologia",
"Automacao",
"Piscina",
"Virais",
];

const products = [
{
title: "Projetor Smart 4K",
price: "R$ 599,90",
image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80^&w=1200^&auto=format^&fit=crop",
},
{
title: "Luminaria LED Premium",
price: "R$ 129,90",
image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80^&w=1200^&auto=format^&fit=crop",
},
{
title: "Painel Ripado Decorativo",
price: "R$ 249,90",
image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80^&w=1200^&auto=format^&fit=crop",
}
];

return (
<div className="min-h-screen bg-black text-white">

<Navbar />

<Hero />

<section className="max-w-7xl mx-auto px-6 py-8">

<div className="flex gap-4 overflow-x-auto pb-2">

{categories.map((category) => (
<button
key={category}
className="whitespace-nowrap px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-orange-500 transition"
>
{category}
</button>
))}

</div>

</section>

<section className="max-w-7xl mx-auto px-6 py-12">

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{products.map((product) => (
<ProductCard key={product.title} product={product} />
))}

</div>

      </section>

      <Footer />

    </div>
  );
}