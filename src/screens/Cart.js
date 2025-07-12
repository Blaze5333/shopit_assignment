import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomModal from '../components/CustomModal';
import Toast from '../components/Toast';
import { removeFromCart, updateQuantity, clearCart } from '../store/userSlice';
import { formatPrice } from '../utils/helpers';

const CartFooter = () => <View style={styles.bottomSpacing} />;

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const incrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
        
        <View style={styles.itemActions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, item.quantity === 1 && styles.quantityButtonDisabled]}
              onPress={decrementQuantity}
              disabled={item.quantity === 1}
              activeOpacity={0.7}
            >
              <Icon name="minus" size={14} color={item.quantity === 1 ? "#D1D5DB" : "#6B7280"} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
              activeOpacity={0.7}
            >
              <Icon name="plus" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => onRemove(item)}
            activeOpacity={0.7}
          >
            <Icon name="trash-2" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</Text>
    </View>
  );
};

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.user.cartItems);
  const insets = useSafeAreaInsets();
  const [modal, setModal] = useState({ visible: false, type: '', item: null });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (item) => {
    setModal({
      visible: true,
      type: 'delete',
      item: item,
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?'
    });
  };

  const handleClearCart = () => {
    setModal({
      visible: true,
      type: 'delete',
      item: null,
      title: 'Clear Cart',
      message: 'Are you sure you want to remove all items from your cart?'
    });
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const handleModalConfirm = () => {
    if (modal.item) {
      dispatch(removeFromCart(modal.item.id));
      setToast({
        visible: true,
        message: 'Item removed from cart',
        type: 'success'
      });
    } else {
      dispatch(clearCart());
      setToast({
        visible: true,
        message: 'Cart cleared successfully',
        type: 'success'
      });
    }
    setModal({ visible: false, type: '', item: null });
  };

  const handleModalCancel = () => {
    setModal({ visible: false, type: '', item: null });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCartItem = ({ item }) => (
    <CartItem 
      item={item}
      onUpdateQuantity={handleUpdateQuantity}
      onRemove={handleRemoveItem}
    />
  );

  const renderHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.length > 0 && (
          <Text style={styles.headerSubtitle}>{getTotalItems()} items</Text>
        )}
      </View>
      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearCart}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.wrapper}>
        {renderHeader()}
        <View style={styles.container}>
          <View style={styles.emptyContainer}>
            <MaterialIcons name="shopping-cart" size={80} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyMessage}>Add some products to get started</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {renderHeader()}
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={CartFooter}
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.summaryCard}
          onPress={() => setSummaryExpanded(!summaryExpanded)}
          activeOpacity={0.9}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>
              {getTotalItems()} items • {formatPrice(getTotalPrice())}
            </Text>
            <Icon 
              name={summaryExpanded ? "chevron-up" : "chevron-down"} 
              size={18} 
              color="#666666" 
            />
          </View>
          
          {summaryExpanded && (
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(getTotalPrice())}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValueFree}>FREE</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
      
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        confirmText={modal.item ? 'Remove' : 'Clear All'}
        cancelText="Cancel"
      />
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  cartList: {
    padding: 16,
  },
  bottomSpacing: {
    height: 200,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#F9FAFB',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 12,
    minWidth: 16,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
    marginLeft: 12,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    textAlign: 'right',
    minWidth: 60,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  summaryContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  summaryValueFree: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
