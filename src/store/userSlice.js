import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: product.quantity || 1
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cartItems.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems
} = userSlice.actions;

export default userSlice.reducer;