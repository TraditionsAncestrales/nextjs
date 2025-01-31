import { RecordsItems } from "@/components/records-items";
import { getProducts } from "@/lib/pocketbase";

// STATIC **********************************************************************************************************************************
export async function generateStaticParams() {
  return [{ knowledge: "traditions-ancestrales" }];
}

// MAIN ************************************************************************************************************************************
export default async function ShopPage() {
  const products = await getProducts();

  return (
    <RecordsItems title="Produit" items={products} border="all" intent="light">
      <p>Il n&apos;y a actuellement aucun produit dans la boutique.</p>
    </RecordsItems>
  );
}
