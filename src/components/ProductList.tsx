import {useProducts} from "../Contexts/ProductContext.tsx";
import ProductCard from "./ProductCard.tsx";

function ProductList() {
  const { products } = useProducts();

  return (
    <div role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {products.map((product, index) => (
        <ProductCard key={`${product.id}-${index}`} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
