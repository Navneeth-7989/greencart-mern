import User from "../models/User.js";

// update user cart data : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(
      req.userId,        // ✅ comes from authUser middleware
      { cartItems },
      { new: true }
    );

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
