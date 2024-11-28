import { RecordsItems } from "@/components/records-items";
import { getProductRecords } from "@/lib/pocketbase/api";
import { itemFromProduct } from "@/lib/pocketbase/utils";

// MAIN ************************************************************************************************************************************
export default async function ShopPage() {
  const productRecords = await getProductRecords();
  const products = await Promise.all(productRecords.map(itemFromProduct));

  return (
    <RecordsItems title="Produit" items={products} border="all" intent="light">
      <p>Il n&apos;y a actuellement aucun produit dans la boutique.</p>
    </RecordsItems>
  );
}
