# 🛒 ShopIt - Modern E-commerce App

A modern, responsive React Native e-commerce application inspired by popular shopping platforms like Amazon, Flipkart, and Blinkit. Built with cutting-edge technologies and featuring a beautiful, intuitive user interface.

## ✨ Features

### 🏠 Home Screen
- **Product Grid Layout**: Clean, responsive grid displaying products with images, titles, prices, and ratings
- **Smart Search**: Real-time product search with instant filtering
- **Category Filter**: Horizontal scrollable category tabs for easy product discovery
- **Pull-to-Refresh**: Swipe down to refresh product listings
- **Add to Cart**: Quick add-to-cart functionality with quantity controls
- **Cart Badge**: Dynamic cart item count display on navigation

### 🛍️ Shopping Cart
- **Modern UI Design**: Clean, card-based layout with improved spacing
- **Quantity Controls**: Intuitive increment/decrement buttons for each product
- **Order Summary**: Collapsible price breakdown with subtotal, tax, and total
- **Empty State**: Friendly empty cart illustration and messaging
- **Smooth Navigation**: Seamless checkout flow integration

### 💳 Multi-Step Checkout
- **Step-by-Step Process**: Organized into Delivery, Payment, and Review steps
- **Address Management**: Delivery address selection and editing
- **Payment Gateway**: Dummy payment integration with realistic flow
- **Order Review**: Final order confirmation with complete details
- **Success Flow**: Order confirmation with animated success state

### 🧭 Navigation
- **Floating Tab Bar**: Modern animated bottom navigation with smooth transitions
- **Stack Navigation**: Seamless screen-to-screen navigation
- **Badge Integration**: Real-time cart count updates across navigation

### 🎨 UI/UX Enhancements
- **Responsive Design**: Optimized for various screen sizes
- **Custom Components**: Reusable components for consistent design
- **Loading States**: Elegant loading animations and placeholders
- **Error Handling**: User-friendly error messages and retry options
- **Toast Notifications**: Custom toast messages for user feedback

## 🚀 Tech Stack

- **Framework**: React Native 0.80.1
- **Navigation**: React Navigation 6.x with Bottom Tabs and Stack Navigation
- **State Management**: Redux Toolkit with Redux Persist
- **HTTP Client**: Axios for API calls
- **Animations**: React Native Reanimated 3.x
- **Icons**: React Native Vector Icons
- **Storage**: AsyncStorage for local data persistence

## 📱 Prerequisites

Before running this project, make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Required Tools:
- Node.js (v16 or higher)
- npm or Yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- JDK 17 (for Android)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blaze5333/shopit_assignment
   cd shopit_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # OR
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   # Install CocoaPods dependencies
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Android Setup**
   - Ensure Android Studio is installed and configured
   - Create an Android Virtual Device (AVD) or connect a physical device

## 🏃‍♂️ Running the App

### Start Metro Bundler
```bash
npm start
# OR
yarn start
```

### Run on Android
```bash
npm run android
# OR
yarn android
```

### Run on iOS (macOS only)
```bash
npm run ios
# OR
yarn ios
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# OR
yarn test
```

Run tests in watch mode:
```bash
npm test -- --watch
# OR
yarn test --watch
```

## 📁 Project Structure

```
ShopIt/
├── src/
│   ├── apis/           # API configuration and endpoints
│   ├── assets/         # Images, logos, and static assets
│   ├── components/     # Reusable UI components
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # App screens/pages
│   ├── store/          # Redux store and slices
│   └── utils/          # Helper functions and utilities
├── android/            # Android-specific code
├── ios/                # iOS-specific code
├── __tests__/          # Test files
└── ...config files
```

## 🎯 Key Components

### ProductCard
- Compact design with optimized layout
- Price and add-to-cart button on the same line
- Star ratings with review count
- Responsive image handling

### Header
- Custom header with search functionality
- Cart badge integration
- Consistent styling across screens

### BottomTabNavigation
- Floating animated tab bar
- Badge overlay for cart items
- Smooth transition animations

### CustomModal & Toast
- Reusable modal component
- Custom toast notifications
- Consistent styling and animations

## 🔄 State Management

The app uses Redux Toolkit for state management with the following structure:

- **userSlice**: Manages cart items, wishlist, and user preferences
- **Persistence**: Automatic state persistence using Redux Persist
- **Async Actions**: Handled with Redux Thunk middleware

## 🌐 API Integration

- Fake Store API for product data
- Axios configured with base URL and interceptors
- Error handling with user-friendly messages
- Loading states for better UX

## 🎨 Styling Approach

- **Consistent Design System**: Unified colors, typography, and spacing
- **Responsive Layout**: Flexible layouts that work on different screen sizes
- **Modern UI Patterns**: Card-based layouts, floating elements, and smooth animations
- **Accessibility**: Proper contrast ratios and accessible components

## 🚧 Troubleshooting

### Common Issues:

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build errors**
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

3. **iOS build errors**
   ```bash
   cd ios && rm -rf Pods Podfile.lock && bundle exec pod install && cd ..
   npm run ios
   ```

4. **Missing dependencies**
   ```bash
   npm install
   npx react-native link  # If needed for older versions
   ```

### Debug Menu Access:
- **Android**: Shake device or press `Ctrl + M` (Windows/Linux) / `Cmd + M` (macOS)
- **iOS**: Shake device or press `Cmd + D` in simulator


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [issues](https://github.com/Blaze5333/shopit_assignment)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) for the amazing framework
- [React Navigation](https://reactnavigation.org/) for navigation solutions
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Fake Store API](https://fakestoreapi.com/) for demo product data
- Design inspiration from leading e-commerce platforms

---

Built with ❤️ using React Native
