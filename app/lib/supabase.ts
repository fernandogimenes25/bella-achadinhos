import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: string;
  category: string;
  url: string;
  badge?: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function addProduct(product: Product): Promise<boolean> {
  const { error } = await supabase.from("products").insert([product]);
  if (error) { console.error(error); return false; }
  return true;
}

export async function updateProduct(product: Product): Promise<boolean> {
  const { error } = await supabase.from("products").update(product).eq("id", product.id);
  if (error) { console.error(error); return false; }
  return true;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("position", { ascending: true });
  if (error) { console.error(error); return []; }
  return data?.map((c: { name: string }) => c.name) || [];
}

export async function addCategory(name: string, position: number): Promise<boolean> {
  const { error } = await supabase.from("categories").insert([{ name, position }]);
  if (error) { console.error(error); return false; }
  return true;
}

export async function updateCategory(oldName: string, newName: string): Promise<boolean> {
  const { error } = await supabase.from("categories").update({ name: newName }).eq("name", oldName);
  if (error) { console.error(error); return false; }
  return true;
}

export async function deleteCategory(name: string): Promise<boolean> {
  const { error } = await supabase.from("categories").delete().eq("name", name);
  if (error) { console.error(error); return false; }
  return true;
}

export async function reorderCategories(names: string[]): Promise<boolean> {
  await Promise.all(names.map((name, position) =>
    supabase.from("categories").update({ position }).eq("name", name)
  ));
  return true;
}
