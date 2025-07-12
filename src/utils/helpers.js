export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const truncateText = (text, maxLength = 40) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const filterProducts = (products, searchQuery) => {
  if (!searchQuery.trim()) {
    return products;
  }
  
  const query = searchQuery.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
};
