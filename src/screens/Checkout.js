import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clearCart } from '../store/userSlice';
import { formatPrice } from '../utils/helpers';
import Toast from '../components/Toast';

export default function Checkout({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const cartItems = useSelector(state => state.user.cartItems);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    paymentMethod: 'card',
  });

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!deliveryInfo.fullName || !deliveryInfo.email || !deliveryInfo.phone || !deliveryInfo.address) {
        setToast({
          visible: true,
          message: 'Please fill all required fields',
          type: 'error'
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(clearCart());
      setToast({
        visible: true,
        message: 'Order placed successfully!',
        type: 'success'
      });
      
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    }, 3000);
  };

  const renderHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#1A1A1A" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Checkout</Text>
      <View style={styles.headerRight}>
        <Text style={styles.stepIndicator}>{currentStep}/3</Text>
      </View>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepWrapper}>
        <View style={styles.stepCircleContainer}>
          <View style={[
            styles.stepCircle,
            step <= currentStep && styles.stepCircleActive
          ]}>
            <Text style={[
              styles.stepNumber,
              step <= currentStep && styles.stepNumberActive
            ]}>
              {step}
            </Text>
          </View>
          <Text style={[
            styles.stepLabel,
            step <= currentStep && styles.stepLabelActive
          ]}>
            {step === 1 ? 'Delivery' : step === 2 ? 'Payment' : 'Review'}
          </Text>
          </View>
          {step < 3 && <View style={[
            styles.stepLine,
            step < currentStep && styles.stepLineActive
          ]} />}
        </View>
      ))}
    </View>
  );

  const renderDeliveryForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Delivery Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.textInput}
          value={deliveryInfo.fullName}
          onChangeText={(text) => setDeliveryInfo({...deliveryInfo, fullName: text})}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email *</Text>
        <TextInput
          style={styles.textInput}
          value={deliveryInfo.email}
          onChangeText={(text) => setDeliveryInfo({...deliveryInfo, email: text})}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput
          style={styles.textInput}
          value={deliveryInfo.phone}
          onChangeText={(text) => setDeliveryInfo({...deliveryInfo, phone: text})}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Address *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={deliveryInfo.address}
          onChangeText={(text) => setDeliveryInfo({...deliveryInfo, address: text})}
          placeholder="Enter your complete address"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.textInput}
            value={deliveryInfo.city}
            onChangeText={(text) => setDeliveryInfo({...deliveryInfo, city: text})}
            placeholder="City"
          />
        </View>

        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.inputLabel}>ZIP Code</Text>
          <TextInput
            style={styles.textInput}
            value={deliveryInfo.zipCode}
            onChangeText={(text) => setDeliveryInfo({...deliveryInfo, zipCode: text})}
            placeholder="ZIP"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  const renderPaymentForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      
      {/* Payment Method Selection */}
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentOption, paymentInfo.paymentMethod === 'card' && styles.paymentOptionActive]}
          onPress={() => setPaymentInfo({...paymentInfo, paymentMethod: 'card'})}
        >
          <MaterialIcons name="credit-card" size={24} color={paymentInfo.paymentMethod === 'card' ? '#FF6B35' : '#666666'} />
          <Text style={[styles.paymentText, paymentInfo.paymentMethod === 'card' && styles.paymentTextActive]}>
            Credit/Debit Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOption, paymentInfo.paymentMethod === 'upi' && styles.paymentOptionActive]}
          onPress={() => setPaymentInfo({...paymentInfo, paymentMethod: 'upi'})}
        >
          <MaterialIcons name="account-balance-wallet" size={24} color={paymentInfo.paymentMethod === 'upi' ? '#FF6B35' : '#666666'} />
          <Text style={[styles.paymentText, paymentInfo.paymentMethod === 'upi' && styles.paymentTextActive]}>
            UPI Payment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOption, paymentInfo.paymentMethod === 'cod' && styles.paymentOptionActive]}
          onPress={() => setPaymentInfo({...paymentInfo, paymentMethod: 'cod'})}
        >
          <MaterialIcons name="local-shipping" size={24} color={paymentInfo.paymentMethod === 'cod' ? '#FF6B35' : '#666666'} />
          <Text style={[styles.paymentText, paymentInfo.paymentMethod === 'cod' && styles.paymentTextActive]}>
            Cash on Delivery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Details Form */}
      {paymentInfo.paymentMethod === 'card' && (
        <View style={styles.cardForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.textInput}
              value={paymentInfo.cardNumber}
              onChangeText={(text) => setPaymentInfo({...paymentInfo, cardNumber: text})}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.textInput}
              value={paymentInfo.cardHolderName}
              onChangeText={(text) => setPaymentInfo({...paymentInfo, cardHolderName: text})}
              placeholder="Enter name on card"
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.textInput}
                value={paymentInfo.expiryDate}
                onChangeText={(text) => setPaymentInfo({...paymentInfo, expiryDate: text})}
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.textInput}
                value={paymentInfo.cvv}
                onChangeText={(text) => setPaymentInfo({...paymentInfo, cvv: text})}
                placeholder="123"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      )}

      {paymentInfo.paymentMethod === 'upi' && (
        <View style={styles.upiContainer}>
          <Text style={styles.upiText}>You will be redirected to your UPI app to complete the payment</Text>
          <View style={styles.upiApps}>
            <Text style={styles.upiLabel}>Supported Apps:</Text>
            <Text style={styles.upiAppsList}>GPay • PhonePe • Paytm • BHIM</Text>
          </View>
        </View>
      )}

      {paymentInfo.paymentMethod === 'cod' && (
        <View style={styles.codContainer}>
          <Text style={styles.codText}>Pay when your order is delivered to your doorstep</Text>
          <Text style={styles.codNote}>Note: Cash on Delivery charges may apply</Text>
        </View>
      )}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      
      {/* Items List */}
      <View style={styles.orderItems}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.itemDetails}>Qty: {item.quantity} × {formatPrice(item.price)}</Text>
            <Text style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
        ))}
      </View>

      {/* Delivery Information */}
      <View style={styles.deliverySection}>
        <Text style={styles.sectionSubtitle}>Delivery Address</Text>
        <Text style={styles.deliveryText}>{deliveryInfo.fullName}</Text>
        <Text style={styles.deliveryText}>{deliveryInfo.address}</Text>
        <Text style={styles.deliveryText}>{deliveryInfo.city} {deliveryInfo.zipCode}</Text>
        <Text style={styles.deliveryText}>{deliveryInfo.phone}</Text>
      </View>

      {/* Payment Method */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionSubtitle}>Payment Method</Text>
        <Text style={styles.paymentMethodText}>
          {paymentInfo.paymentMethod === 'card' ? 'Credit/Debit Card' : 
           paymentInfo.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
        </Text>
      </View>
    </View>
  );

  const renderPriceBreakdown = () => (
    <TouchableOpacity 
      style={styles.priceCard}
      onPress={() => setSummaryExpanded(!summaryExpanded)}
      activeOpacity={0.9}
    >
      <View style={styles.priceHeader}>
        <Text style={styles.totalLabel}>Total: {formatPrice(getTotalPrice())}</Text>
        <Icon 
          name={summaryExpanded ? "chevron-up" : "chevron-down"} 
          size={18} 
          color="#666666" 
        />
      </View>
      
      {summaryExpanded && (
        <View style={styles.priceDetails}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal ({getTotalItems()} items)</Text>
            <Text style={styles.priceValue}>{formatPrice(getTotalPrice())}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValueFree}>FREE</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>Included</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderBottomButton = () => (
    <View style={styles.bottomContainer}>
      {renderPriceBreakdown()}
      <TouchableOpacity
        style={[styles.actionButton, isProcessing && styles.actionButtonDisabled]}
        onPress={currentStep === 3 ? handlePlaceOrder : handleNext}
        disabled={isProcessing}
        activeOpacity={0.8}
      >
        {isProcessing ? (
          <Text style={styles.actionButtonText}>Processing...</Text>
        ) : (
          <>
            <Text style={styles.actionButtonText}>
              {currentStep === 3 ? 'Place Order' : 'Continue'}
            </Text>
            <Icon name="arrow-right" size={18} color="#FFFFFF" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderStepIndicator()}
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && renderDeliveryForm()}
        {currentStep === 2 && renderPaymentForm()}
        {currentStep === 3 && renderOrderSummary()}
      </ScrollView>

      {renderBottomButton()}

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
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    width:'100%'
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#FF6B35',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666666',
  },
  stepLabelActive: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginRight: 16,
  },
  stepLineActive: {
    backgroundColor: '#FF6B35',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom:60
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF7F0',
  },
  paymentText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
  },
  paymentTextActive: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  cardForm: {
    marginTop: 20,
  },
  upiContainer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginTop: 16,
  },
  upiText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  upiApps: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  upiAppsList: {
    fontSize: 14,
    color: '#666666',
  },
  codContainer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginTop: 16,
  },
  codText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  codNote: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  orderItems: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  itemDetails: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 8,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  deliverySection: {
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  deliveryText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  paymentSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666666',
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
    paddingTop: 16,
    paddingBottom: 32,
  },
  priceCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  priceValueFree: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  stepCircleContainer:{
    alignContent:'center',
    justifyContent:'center',
  }
});
