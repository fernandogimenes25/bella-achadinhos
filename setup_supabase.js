const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://egvdnmyclemijwwqbaar.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndmRubXljbGVtaWp3d3FiYWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzQ0NTgsImV4cCI6MjA5NDk1MDQ1OH0.WVJnxXJki80IeGWikrkLrHVIGPgrIluQVZHnH4uysbs"
);

async function setup() {
  console.log("Testando conexao Supabase...");

  const { data: p, error: e1 } = await supabase.from("products").select("*").limit(1);
  if (e1) {
    console.log("ERRO products:", e1.message);
  } else {
    console.log("OK - Tabela products acessivel! Registros:", p.length);
  }

  const { data: c, error: e2 } = await supabase.from("categories").select("*").limit(10);
  if (e2) {
    console.log("ERRO categories:", e2.message);
  } else {
    console.log("OK - Tabela categories acessivel! Categorias:", c.map(x => x.name).join(", "));
  }
}

setup();
