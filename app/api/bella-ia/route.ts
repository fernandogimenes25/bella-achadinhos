import { NextRequest, NextResponse } from "next/server";

const PRODUCT_DATABASE: Record<string, Array<{title: string, price: string, category: string, reason: string, badge: string, keyword: string}>> = {
  "viral": [
    { title: "Luminaria Neon Personalizada", price: "R$ 89,90", category: "Decoracao", reason: "Hit absoluto TikTok Brasil 2026", badge: "Viral", keyword: "luminaria+neon+personalizada" },
    { title: "Projetor Laser Mini 4K", price: "R$ 199,90", category: "Tecnologia", reason: "Mais vendido Shopee janeiro 2026", badge: "Viral", keyword: "projetor+laser+mini+4k" },
    { title: "Tapete Led Interativo", price: "R$ 149,90", category: "Decoracao", reason: "Viral decoracao quarto 2026", badge: "Viral", keyword: "tapete+led+interativo" },
    { title: "Carregador Solar Portatil", price: "R$ 79,90", category: "Tecnologia", reason: "Tendencia sustentabilidade 2026", badge: "Top", keyword: "carregador+solar+portatil" },
    { title: "Espelho Smart com LED", price: "R$ 259,90", category: "Casa Moderna", reason: "Viral banheiro moderno 2026", badge: "Viral", keyword: "espelho+smart+led" },
    { title: "Kit Organizador Modular", price: "R$ 59,90", category: "Casa Moderna", reason: "Hit organizacao 2026", badge: "Tendencia", keyword: "kit+organizador+modular" },
    { title: "Webcam AI 4K", price: "R$ 189,90", category: "Tecnologia", reason: "Boom home office 2026", badge: "Viral", keyword: "webcam+ai+4k" },
    { title: "Vaso Auto Irrigavel", price: "R$ 69,90", category: "Decoracao", reason: "Tendencia plantas 2026", badge: "Tendencia", keyword: "vaso+auto+irrigavel" },
  ],
  "decoracao": [
    { title: "Painel 3D Decorativo", price: "R$ 129,90", category: "Decoracao", reason: "Viral sala de estar 2026", badge: "Viral", keyword: "painel+3d+decorativo" },
    { title: "Espelho Organico Moderno", price: "R$ 189,90", category: "Decoracao", reason: "Tendencia decor 2026", badge: "Tendencia", keyword: "espelho+organico+moderno" },
    { title: "Luminaria Pendente Rattan", price: "R$ 149,90", category: "Decoracao", reason: "Hit boho chic 2026", badge: "Viral", keyword: "luminaria+pendente+rattan" },
    { title: "Quadro Neon Personalizado", price: "R$ 159,90", category: "Decoracao", reason: "Viral quarto e sala 2026", badge: "Viral", keyword: "quadro+neon+personalizado" },
    { title: "Cortina LED Cascata", price: "R$ 59,90", category: "Decoracao", reason: "Muito pedido festas e decor", badge: "Top", keyword: "cortina+led+cascata" },
    { title: "Planta Artificial Premium", price: "R$ 89,90", category: "Decoracao", reason: "Tendencia verde no decor 2026", badge: "Tendencia", keyword: "planta+artificial+premium" },
    { title: "Porta Temperos Magnetico", price: "R$ 79,90", category: "Decoracao", reason: "Hit cozinha organizada 2026", badge: "Top", keyword: "porta+temperos+magnetico" },
    { title: "Luminaria Nuvem LED", price: "R$ 119,90", category: "Decoracao", reason: "Viral quarto kids e decor", badge: "Viral", keyword: "luminaria+nuvem+led" },
  ],
  "tecnologia": [
    { title: "Fone ANC Pro 2026", price: "R$ 149,90", category: "Tecnologia", reason: "Cancelamento ruido viral 2026", badge: "Viral", keyword: "fone+anc+cancelamento+ruido" },
    { title: "Mini PC Stick 4K", price: "R$ 349,90", category: "Tecnologia", reason: "Tendencia home office 2026", badge: "Top", keyword: "mini+pc+stick+4k" },
    { title: "Teclado Mecanico Compacto", price: "R$ 189,90", category: "Tecnologia", reason: "Hit gamer e escritorio 2026", badge: "Viral", keyword: "teclado+mecanico+compacto" },
    { title: "Mouse Sem Fio Ergonomico", price: "R$ 79,90", category: "Tecnologia", reason: "Muito buscado home office", badge: "Top", keyword: "mouse+sem+fio+ergonomico" },
    { title: "Smartwatch Ultra 2026", price: "R$ 299,90", category: "Tecnologia", reason: "Top wearables 2026", badge: "Viral", keyword: "smartwatch+ultra+2026" },
    { title: "Caixa Som 360 Waterproof", price: "R$ 129,90", category: "Tecnologia", reason: "Hit verao e festas 2026", badge: "Viral", keyword: "caixa+som+360+waterproof" },
    { title: "Carregador GaN 100W", price: "R$ 99,90", category: "Tecnologia", reason: "Essencial gadgets 2026", badge: "Top", keyword: "carregador+gan+100w" },
    { title: "Lampada Projetora WiFi", price: "R$ 89,90", category: "Tecnologia", reason: "Viral smart home 2026", badge: "Viral", keyword: "lampada+projetora+wifi" },
  ],
  "fitness": [
    { title: "Esteira Dobravel Compacta", price: "R$ 899,90", category: "Fitness", reason: "Hit treino em casa 2026", badge: "Viral", keyword: "esteira+dobravel+compacta" },
    { title: "Rolo Massagem Eletrico", price: "R$ 129,90", category: "Fitness", reason: "Tendencia recuperacao 2026", badge: "Top", keyword: "rolo+massagem+eletrico" },
    { title: "Kit Halter Hexagonal", price: "R$ 149,90", category: "Fitness", reason: "Boom musculacao casa 2026", badge: "Viral", keyword: "kit+halter+hexagonal" },
    { title: "Colchonete Dobravel 10cm", price: "R$ 99,90", category: "Fitness", reason: "Top pilates e yoga 2026", badge: "Tendencia", keyword: "colchonete+dobravel+10cm" },
    { title: "Corda Pular Digital", price: "R$ 59,90", category: "Fitness", reason: "Viral treino funcional 2026", badge: "Viral", keyword: "corda+pular+digital" },
    { title: "Garrafa Termica 2L", price: "R$ 79,90", category: "Fitness", reason: "Hit hidratacao 2026", badge: "Top", keyword: "garrafa+termica+2l" },
    { title: "Faixa Gluteo Resistencia", price: "R$ 44,90", category: "Fitness", reason: "Viral treino feminino 2026", badge: "Viral", keyword: "faixa+gluteo+resistencia" },
    { title: "Tapete Acupuntura", price: "R$ 89,90", category: "Fitness", reason: "Tendencia bem-estar 2026", badge: "Tendencia", keyword: "tapete+acupuntura" },
  ],
  "piscina": [
    { title: "Flutuador Ilha Tropical", price: "R$ 129,90", category: "Piscina", reason: "Viral verao 2026", badge: "Viral", keyword: "flutuador+ilha+tropical" },
    { title: "Purificador Piscina UV", price: "R$ 299,90", category: "Piscina", reason: "Hit manutencao piscina 2026", badge: "Top", keyword: "purificador+piscina+uv" },
    { title: "Luz LED Piscina Subaquatica", price: "R$ 89,90", category: "Piscina", reason: "Viral festa e lazer 2026", badge: "Viral", keyword: "luz+led+piscina+subaquatica" },
    { title: "Capa Termica Piscina", price: "R$ 199,90", category: "Piscina", reason: "Tendencia economia energia", badge: "Tendencia", keyword: "capa+termica+piscina" },
    { title: "Boia Gigante Flamingo", price: "R$ 99,90", category: "Piscina", reason: "Hit Instagram verao 2026", badge: "Viral", keyword: "boia+gigante+flamingo" },
    { title: "Escada Piscina Inox", price: "R$ 349,90", category: "Piscina", reason: "Top acessorios piscina", badge: "Top", keyword: "escada+piscina+inox" },
    { title: "Aspirador Robo Piscina", price: "R$ 499,90", category: "Piscina", reason: "Viral automacao piscina 2026", badge: "Viral", keyword: "aspirador+robo+piscina" },
    { title: "Chuveiro Solar Externo", price: "R$ 259,90", category: "Piscina", reason: "Tendencia verao sustentavel", badge: "Tendencia", keyword: "chuveiro+solar+externo" },
  ],
  "automacao": [
    { title: "Hub Casa Inteligente WiFi6", price: "R$ 199,90", category: "Automacao", reason: "Top smart home 2026", badge: "Top", keyword: "hub+casa+inteligente+wifi6" },
    { title: "Cortina Motorizada WiFi", price: "R$ 349,90", category: "Automacao", reason: "Viral automacao 2026", badge: "Viral", keyword: "cortina+motorizada+wifi" },
    { title: "Fechadura Digital Facial", price: "R$ 599,90", category: "Automacao", reason: "Hit seguranca 2026", badge: "Top", keyword: "fechadura+digital+facial" },
    { title: "Tomada USB-C Inteligente", price: "R$ 69,90", category: "Automacao", reason: "Essencial smart home 2026", badge: "Tendencia", keyword: "tomada+usbc+inteligente" },
    { title: "Camera 360 Interna 4K", price: "R$ 229,90", category: "Automacao", reason: "Top seguranca residencial 2026", badge: "Top", keyword: "camera+360+interna+4k" },
    { title: "Sensor Abertura Porta WiFi", price: "R$ 49,90", category: "Automacao", reason: "Tendencia seguranca 2026", badge: "Tendencia", keyword: "sensor+abertura+porta+wifi" },
    { title: "Robo Aspirador Mop 2026", price: "R$ 799,90", category: "Automacao", reason: "Viral casa inteligente 2026", badge: "Viral", keyword: "robo+aspirador+mop+2026" },
    { title: "Interruptor Touch WiFi", price: "R$ 59,90", category: "Automacao", reason: "Hit iluminacao smart 2026", badge: "Top", keyword: "interruptor+touch+wifi" },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const { topic, categories } = await request.json();

    const topicLower = topic.toLowerCase();
    let key = "viral";
    if (topicLower.includes("decora")) key = "decoracao";
    else if (topicLower.includes("tecnolog") || topicLower.includes("gadget")) key = "tecnologia";
    else if (topicLower.includes("fitness") || topicLower.includes("academia")) key = "fitness";
    else if (topicLower.includes("piscina") || topicLower.includes("lazer")) key = "piscina";
    else if (topicLower.includes("automa") || topicLower.includes("inteligente")) key = "automacao";

    const base = PRODUCT_DATABASE[key] || PRODUCT_DATABASE["viral"];

    // Usa categorias do admin se disponíveis
    const availableCategories: string[] = categories && categories.length > 0
      ? categories
      : ["Tecnologia", "Decoracao", "Casa Moderna", "Fitness", "Piscina", "Automacao"];

    const products = base.map(p => ({
      title: p.title,
      price: p.price,
      category: availableCategories.includes(p.category) ? p.category : availableCategories[0],
      reason: p.reason,
      badge: p.badge,
      searchUrl: `https://shopee.com.br/search?keyword=${p.keyword}`,
    }));

    return NextResponse.json({ products });

  } catch (error) {
    console.error("Bella IA erro:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
