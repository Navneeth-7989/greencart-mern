import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ---------------- GET CART ITEMS ----------------
  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (!product) continue;

      tempArray.push({
        ...product,
        quantity: cartItems[key],
      });
    }

    setCartArray(tempArray);
  };

  // ---------------- GET USER ADDRESS ----------------
  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");

      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }
    // order logic later
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16 gap-10">
      {/* ---------------- LEFT : CART ITEMS ---------------- */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-500 pt-4"
          >
            <div className="flex gap-4 items-center">
              <div
                onClick={() => {
                  navigate(`/Products/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="w-24 h-24 border rounded overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty:{" "}
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                    className="outline-none"
                  >
                    {Array(9)
                      .fill("")
                      .map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                </p>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 text-primary mt-8 font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="w-5"
          />
          Continue Shopping
        </button>
      </div>

      {/* ---------------- RIGHT : ORDER SUMMARY ---------------- */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* ADDRESS */}
        <p className="text-sm font-medium uppercase">Delivery Address</p>
        <div className="relative mt-2">
          <p className="text-gray-500 text-sm">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-primary text-sm mt-1"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute bg-white border w-full mt-2 z-10">
              {addresses.map((address) => (
                <p
                  key={address._id}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {address.street}, {address.city}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="p-2 text-primary text-center cursor-pointer hover:bg-primary/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <p className="text-sm font-medium uppercase mt-6">
          Payment Method
        </p>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 mt-2 bg-white outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-4" />

        {/* PRICE DETAILS */}
        <div className="text-gray-500 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-base font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentOption === "COD"
            ? "Place Order"
            : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
