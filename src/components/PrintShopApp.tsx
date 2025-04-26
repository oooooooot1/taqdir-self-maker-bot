
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Calculator from './Calculator';
import ProductsPanel from './ProductsPanel';
import OrderSummary from './OrderSummary';
import DateTimeDisplay from './DateTimeDisplay';
import SettingsButton from './SettingsButton';
import SettingsDialog from './SettingsDialog';

const PrintShopApp = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shopName, setShopName] = useLocalStorage('shopName', 'اسم المكتبة');
  const [blackPaperPrice, setBlackPaperPrice] = useLocalStorage('blackPaperPrice', 0.5);
  const [colorPaperPrice, setColorPaperPrice] = useLocalStorage('colorPaperPrice', 1.0);
  
  // Product settings with default values
  const [products, setProducts] = useLocalStorage('products', [
    { id: 1, name: 'زر', price: 5, count: 0 },
    { id: 2, name: 'زر', price: 5, count: 0 },
    { id: 3, name: 'زر', price: 5, count: 0 },
    { id: 4, name: 'زر', price: 5, count: 0 },
    { id: 5, name: 'زر', price: 5, count: 0 },
    { id: 6, name: 'زر', price: 5, count: 0 },
    { id: 7, name: 'زر', price: 5, count: 0 },
    { id: 8, name: 'زر', price: 5, count: 0 },
    { id: 9, name: 'زر', price: 5, count: 0 },
    { id: 10, name: 'زر', price: 5, count: 0 },
  ]);

  const [blackPaperCount, setBlackPaperCount] = useState(0);
  const [colorPaperCount, setColorPaperCount] = useState(0);
  const [orderItems, setOrderItems] = useState<Array<{name: string, count: number, price: number}>>([]);
  const [total, setTotal] = useState(0);

  // Update order and total when products or paper counts change
  useEffect(() => {
    const newOrderItems = [];
    let newTotal = 0;
    
    // Add paper items if they have counts
    if (blackPaperCount > 0) {
      const blackPaperTotal = blackPaperCount * blackPaperPrice;
      newOrderItems.push({ name: 'ورق اسود', count: blackPaperCount, price: blackPaperTotal });
      newTotal += blackPaperTotal;
    }
    
    if (colorPaperCount > 0) {
      const colorPaperTotal = colorPaperCount * colorPaperPrice;
      newOrderItems.push({ name: 'ورق ملون', count: colorPaperCount, price: colorPaperTotal });
      newTotal += colorPaperTotal;
    }
    
    // Add product items if they have counts
    products.forEach(product => {
      if (product.count > 0) {
        const productTotal = product.count * product.price;
        newOrderItems.push({ name: product.name, count: product.count, price: productTotal });
        newTotal += productTotal;
      }
    });
    
    setOrderItems(newOrderItems);
    setTotal(newTotal);
  }, [products, blackPaperCount, colorPaperCount, blackPaperPrice, colorPaperPrice]);

  // Handle product count updates
  const updateProductCount = (id: number, count: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, count } : product
    ));
  };
  
  // Handle paper count updates
  const updatePaperCount = (type: 'black' | 'color', count: number) => {
    if (type === 'black') {
      setBlackPaperCount(count);
    } else {
      setColorPaperCount(count);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4" dir="rtl">
      <div className="container mx-auto">
        {/* Top row with settings button and date/time */}
        <div className="flex justify-between items-start mb-6">
          <DateTimeDisplay />
          <SettingsButton onClick={() => setSettingsOpen(true)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order summary section */}
          <div className="lg:col-span-1">
            <OrderSummary 
              shopName={shopName}
              orderItems={orderItems}
              total={total}
            />
          </div>

          {/* Calculator section */}
          <div className="lg:col-span-1">
            <Calculator />
          </div>

          {/* Products panel */}
          <div className="lg:col-span-1">
            <ProductsPanel 
              products={products}
              blackPaperCount={blackPaperCount}
              colorPaperCount={colorPaperCount}
              updateProductCount={updateProductCount}
              updatePaperCount={updatePaperCount}
            />
          </div>
        </div>

        {/* Settings Dialog */}
        <SettingsDialog 
          open={settingsOpen} 
          onOpenChange={setSettingsOpen}
          shopName={shopName}
          setShopName={setShopName}
          blackPaperPrice={blackPaperPrice}
          setBlackPaperPrice={setBlackPaperPrice}
          colorPaperPrice={colorPaperPrice}
          setColorPaperPrice={setColorPaperPrice}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
};

export default PrintShopApp;
