import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../store/userSlice';
import { getProducts } from '../apis/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { filterProducts } from '../utils/helpers';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.user.cartItems);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await getProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
      
      const uniqueCategories = ['All', ...new Set(response.data.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please check your internet connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filterProducts(filtered, searchQuery);
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setToast({
      visible: true,
      message: `${product.title} added to cart!`,
      type: 'success'
    });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleRemoveFromCart = (productId) => {
    const product = products.find(p => p.id === productId);
    dispatch(removeFromCart(productId));
    setToast({
      visible: true,
      message: `${product?.title || 'Item'} removed from cart!`,
      type: 'success'
    });
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSelectedCategory('All');
    setSearchQuery('');
    fetchProducts();
  };

  const handleRetry = () => {
    setLoading(true);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategorySelect(item)}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText
      ]}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const isInCart = !!existingCartItem;
    const cartQuantity = existingCartItem ? existingCartItem.quantity : 0;

    return (
      <ProductCard
        product={item}
        onAddToCart={handleAddToCart}
        onPress={() => handleProductPress(item)}
        isInCart={isInCart}
        cartQuantity={cartQuantity}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />
    );
  };

  if (loading) {
    return <LoadingComponent message="Loading products..." />;
  }

  if (error) {
    return <ErrorComponent message={error} onRetry={handleRetry} />;
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onClearSearch={handleClearSearch}
        />

        {/* Categories Filter */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {filteredProducts.length === 0 ? (
          <EmptyState
            message={searchQuery || selectedCategory !== 'All' ? 'No products found' : 'No products available'}
            subMessage={searchQuery || selectedCategory !== 'All' ? 'Try adjusting your filters' : 'Please try again later'}
          />
        ) : (
          <FlatList
            data={filteredProducts} 
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.productsList}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={styles.endSeparator} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#3B82F6']}
                tintColor="#3B82F6"
              />
            }
          />
        )}
        
      </View>
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategoryItem: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  productsList: {
    padding: 16,
    paddingTop: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  endSeparator: {
    height: 60,
    width: '100%',
  },
});