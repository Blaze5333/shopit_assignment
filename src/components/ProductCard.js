import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/helpers';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; 

const ProductCard = ({ product, onAddToCart, onPress, isInCart = false, cartQuantity = 0, onUpdateQuantity, onRemoveFromCart }) => {
  console.log('ProductCard data:', product?.title, product?.price); 

  const handleIncrement = () => {
    onUpdateQuantity(product.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    } else {
      onRemoveFromCart(product.id);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage}
            resizeMode="contain"
          />
          
          <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.8}>
            <Ionicons name="heart-outline" size={16} color="#666666" />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={12} color="#FFB800" />
                <Text style={styles.ratingText}>{product.rating?.rate || '0'}</Text>
                <Text style={styles.reviewCount}>({product.rating?.count || 0})</Text>
              </View>
            </View>
            
            {isInCart ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityBtn}
                  onPress={handleDecrement}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="remove" size={12} color="#FF6B35" />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{cartQuantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityBtn}
                  onPress={handleIncrement}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="add" size={12} color="#FF6B35" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addToCartBtn}
                onPress={() => onAddToCart(product)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="add-shopping-cart" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    marginBottom: 12,
    marginHorizontal: 4,
   
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderRadius: 10,
    elevation: 3
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cartIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIndicatorText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
    lineHeight: 16,
    marginBottom: 8,
    minHeight: 32,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
    marginLeft: 2,
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '400',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 70,
  },
  quantityBtn: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  quantityText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 8,
    textAlign: 'center',
    minWidth: 16,
  },
  addToCartBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    height: 36,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default ProductCard;
