import iconRemoveItem from "../../public/assets/images/icon-remove-item.svg";
import iconCarbonNeutral from "../../public/assets/images/icon-carbon-neutral.svg";
import imgEmptyCard from "../../public/assets/images/illustration-empty-cart.svg";
import {useCart} from "../Contexts/CartContext.tsx";
import {useState} from "react";
import OrderConfirmationModal from "./OrderConfirmationModal.tsx";

function MyCart() {
  const {
    cartItems,
    removeFromCart,
    totalItems,
    totalPrice
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-md bg-white w-full px-10 py-8 md:gap-4 md:space-y-7">
      <h1 className="font-bold text-amber-700 text-2xl">
        Your Cart ({totalItems})
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col text-center items-center space-y-3">
          <img src={imgEmptyCard} className="w-36" alt="empty cart" />
          <span className="font-semibold text-[#A88F92]">
            Your added items will appear here
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {cartItems.map((item, index) => (
            <div key={`${item.product.name}-${index}`} className="flex flex-row justify-between border-b border-gray-200 pb-4">
              <div className="space-y-2">
                <h2 className="text-[#4C4648] font-semibold">{item.product.name}</h2>
                <div className="flex gap-3">
                  <span className="font-semibold text-amber-700">{`${item.quantity}x`}</span>
                  <span className="text-[#A88F92] font-light">{`$${item.product.price.toFixed(2)}`}</span>
                  <span className="text-[#4C4648] font-normal">
                    {`$${(item.product.price * item.quantity).toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className="content-center">
                <button
                  onClick={() => removeFromCart(item.product.name)}
                  className="rounded-full transition-all border p-1 cursor-pointer border-[#A88F92] hover:border-[#4C4648]"
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  <img src={iconRemoveItem} alt="Remove item" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between py-5">
            <span className="content-center">Order Total</span>
            <span className="font-bold text-3xl">
              {`$${totalPrice.toFixed(2)}`}
            </span>
          </div>

          <div className="bg-[#FCF8F5] py-3 px-2 rounded-md flex align-middle justify-center space-x-2 content-center">
            <img src={iconCarbonNeutral} alt="carbon neutral" className="w-5" />
            <p>This is a <b>carbon-neutral</b> delivery</p>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="bg-amber-700 hover:bg-amber-800 rounded-full py-3 px-3 text-white font-semibold mt-4 cursor-pointer transition-all"
            disabled={cartItems.length === 0}
          >
            Confirm Order
          </button>
        </div>
      )}

      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default MyCart;
