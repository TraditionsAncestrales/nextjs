import RecordsItems from "@/components/records-items";
import { getShopPage } from "@/lib/api";

// MAIN ************************************************************************************************************************************
export default async function ShopPage() {
  const { products } = await getShopPage();

  return (
    <RecordsItems title="Produit" items={products} border="all" intent="light">
      <p>Il n'y a actuellement aucun produit dans la boutique.</p>
    </RecordsItems>
  );
}
