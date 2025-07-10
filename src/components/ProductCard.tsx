import {useState} from "react";
import imgAddToCard from "../../public/assets/images/icon-add-to-cart.svg";
import iconDecrement from "../../public/assets/images/icon-decrement-quantity.svg";
import iconIncrement from "../../public/assets/images/icon-increment-quantity.svg";
import type {Product} from "../type.ts";
import {useCart} from "../Contexts/CartContext.tsx";

interface ProductCardProps {
  product: Product;
}

function ProductCard({product}: ProductCardProps) {
  const {cartItems, addToCart, updateQuantity} = useCart();
  const [quantity, setQuantity] = useState(1);

  const isInCart = cartItems.some(item => item.product.id === product.id);
  const cartItem = cartItems.find(item => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleIncrement = () => {
    const newQuantity = (cartItem?.quantity || 0) + 1;
    updateQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = (cartItem?.quantity || 0) - 1;
    updateQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-8">
      <div
        className={`relative transition-all duration-[60] h-72 bg-cover bg-center rounded-lg ${isInCart ? 'border-3 border-[#C63B12]' : 'border3 border-transparent'}`}
        style={{backgroundImage: `url('${product.image.desktop}')`}}
      >
        {/* Show when product is not in cart */}
        {!isInCart && (
          <button
            className="absolute cursor-pointer transition-all -bottom-5 left-1/4 py-2 px-2 rounded-full bg-white border border-amber-800 flex justify-center-safe space-x-2 w-1/2"
            onClick={handleAddToCart}
          >
            <img src={imgAddToCard} alt="add to cart" className="w-5"/>
            <span className="font-semibold text-sm">Add to Cart</span>
          </button>
        )}

        {/* Show when product is in cart */}
        {isInCart && (
          <div
            className="absolute transition-all -bottom-5 left-1/4 py-2 px-2 rounded-full bg-[#C63B12] border border-[#C63B12] flex justify-between space-x-6 text-white w-1/2">
            <button
              className="cursor-pointer rounded-full border p-1 border-white"
              onClick={handleDecrement}
            >
              <img src={iconDecrement} alt="decrease quantity" className="w-3"/>
            </button>
            <span>{quantity}</span>
            <button
              className="cursor-pointer rounded-full border p-1 border-white"
              onClick={handleIncrement}
            >
              <img src={iconIncrement} alt="increase quantity" className="w-3"/>
            </button>
          </div>
        )}
      </div>

      <div>
        <span className="text-sm text-[#A88F92]">{product.category}</span>
        <h1 className="font-semibold">{product.name}</h1>
        <label className="font-semibold text-amber-700">{`$${product.price.toFixed(2)}`}</label>
      </div>
    </div>
  );
}

export default ProductCard;
