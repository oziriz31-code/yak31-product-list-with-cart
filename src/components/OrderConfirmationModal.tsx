import {useCart} from "../Contexts/CartContext.tsx";
import iconOrderConfirmed from "../../public/assets/images/icon-order-confirmed.svg";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
  const { cartItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white rounded-t-xl md:rounded-xl p-8 max-w-lg w-full space-y-7">

        <img src={iconOrderConfirmed} alt="order confirmed" className="w-10 mb-4" />
        <h2 className="text-4xl font-bold text-[#1F0600] mb-4">Order Confirmed</h2>

        <div className="mb-6">
          <p className="mb-2 text-[#A88F92] font-semibold">Your order has been placed successfully.</p>
        </div>

        <div className="bg-[#FCF8F5] p-5 rounded-lg pt-4 space-y-5">
          <ul className="space-y-2 overflow-y-auto h-60 ">
            {cartItems.map((item) => (
              <li key={`${item.product.id}`} className="flex flex-row justify-between border-b border-[#F5F1EE] pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image.thumbnail} alt="product" className="w-16 h-16 rounded-md" />
                  <div className="space-y-2">
                    <h2 className="text-[#3C312D] font-semibold">{item.product.name}</h2>
                    <div className="flex gap-3">
                      <span className="font-semibold text-amber-700">{`${item.quantity}x`}</span>
                      <span className="text-[#A88F92] font-light">{`$${item.product.price.toFixed(2)}`}</span>
                      <span className="text-[#4C4648] font-normal">
                  </span>
                    </div>
                  </div>
                </div>
                <div className="content-center font-bold">
                  {`$${(item.product.price * item.quantity).toFixed(2)}`}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between">
            <span className="content-center">Order Total</span>
            <span className="font-bold text-2xl">
              {`$${totalPrice.toFixed(2)}`}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            clearCart();
            onClose();
          }}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-full font-semibold transition-all"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;
