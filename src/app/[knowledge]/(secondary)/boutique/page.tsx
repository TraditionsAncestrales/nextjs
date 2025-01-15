import { RecordsItems } from "@/components/records-items";
import { getProducts } from "@/lib/pocketbase";
import { helpers } from "@/lib/pocketbase/sdk";

// STATIC **********************************************************************************************************************************
export async function generateStaticParams() {
  return [{ knowledge: "traditions-ancestrales" }];
}

// MAIN ************************************************************************************************************************************
export default async function ShopPage() {
  const products = await getProducts(helpers);

  return (
    <RecordsItems title="Produit" items={products} border="all" intent="light">
      <p>Il n&apos;y a actuellement aucun produit dans la boutique.</p>
    </RecordsItems>
  );
}
