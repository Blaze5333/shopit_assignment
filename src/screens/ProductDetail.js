import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { formatPrice } from '../utils/helpers';
import { addToCart } from '../store/userSlice';
import Toast from '../components/Toast';
import CustomModal from '../components/CustomModal';

const { height } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [modal, setModal] = useState({ visible: false, title: '', message: '' });

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setToast({
      visible: true,
      message: `${quantity} x ${product.title} added to cart!`,
      type: 'success'
    });
  };

  const handleBuyNow = () => {
    setModal({
      visible: true,
      title: 'Buy Now',
      message: `Proceeding to checkout with ${quantity} x ${product.title}`
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {[...Array(fullStars)].map((_, i) => (
            <Icon key={`full-${i}`} name="star" size={16} color="#F59E0B" />
          ))}
          {hasHalfStar && (
            <Icon name="star" size={16} color="#D1D5DB" />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Icon key={`empty-${i}`} name="star" size={16} color="#D1D5DB" />
          ))}
        </View>
        <Text style={styles.ratingText}>({rating})</Text>
        <Text style={styles.reviewCount}>{product.rating.count} reviews</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          activeOpacity={0.7}
        >
          <Icon 
            name={isFavorite ? "heart" : "heart"} 
            size={24} 
            color={isFavorite ? "#EF4444" : "#9CA3AF"}
            fill={isFavorite ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          {renderRating(product.rating.rate)}

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <View style={styles.stockContainer}>
              <Icon name="check-circle" size={16} color="#10B981" />
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
                onPress={decrementQuantity}
                disabled={quantity === 1}
                activeOpacity={0.7}
              >
                <Icon name="minus" size={18} color={quantity === 1 ? "#D1D5DB" : "#6B7280"} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={incrementQuantity}
                activeOpacity={0.7}
              >
                <Icon name="plus" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatPrice(product.price * quantity)}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Icon name="shopping-cart" size={18} color="#FF6B35" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buyNowButton}
            onPress={handleBuyNow}
            activeOpacity={0.8}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
      
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type="info"
        onConfirm={() => setModal({ visible: false, title: '', message: '' })}
        onCancel={() => setModal({ visible: false, title: '', message: '' })}
        confirmText="Continue"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  categoryContainer: {
    borderColor:'#FF6B35',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 12,
  
  },
  category: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 32,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 12,
  },
  reviewCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#059669',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 4,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#F9FAFB',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ProductDetail;
