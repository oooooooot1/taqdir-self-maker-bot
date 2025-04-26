
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  count: number;
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shopName: string;
  setShopName: (name: string) => void;
  blackPaperPrice: number;
  setBlackPaperPrice: (price: number) => void;
  colorPaperPrice: number;
  setColorPaperPrice: (price: number) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  shopName,
  setShopName,
  blackPaperPrice,
  setBlackPaperPrice,
  colorPaperPrice,
  setColorPaperPrice,
  products,
  setProducts
}) => {
  const handleProductNameChange = (id: number, name: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, name } : p));
  };

  const handleProductPriceChange = (id: number, priceStr: string) => {
    const price = parseFloat(priceStr) || 0;
    setProducts(products.map(p => p.id === id ? { ...p, price } : p));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl bg-zinc-900 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-teal-400">الإعدادات</DialogTitle>
          <DialogDescription className="text-gray-300">
            قم بتعديل إعدادات التطبيق هنا
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="general" className="data-[state=active]:bg-teal-600">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-teal-600">المنتجات</TabsTrigger>
            <TabsTrigger value="papers" className="data-[state=active]:bg-teal-600">الأوراق</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-4">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="shopName" className="text-right">اسم المكتبة</Label>
                <Input 
                  id="shopName" 
                  value={shopName} 
                  onChange={(e) => setShopName(e.target.value)}
                  className="bg-zinc-800"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-zinc-800 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`product-name-${product.id}`} className="text-right">اسم المنتج</Label>
                        <Input 
                          id={`product-name-${product.id}`} 
                          value={product.name}
                          onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                          className="bg-zinc-700 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`product-price-${product.id}`} className="text-right">السعر (ريال)</Label>
                        <Input 
                          id={`product-price-${product.id}`} 
                          type="number" 
                          value={product.price}
                          onChange={(e) => handleProductPriceChange(product.id, e.target.value)}
                          className="bg-zinc-700 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="papers" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-4 rounded-md">
                  <Label htmlFor="blackPaperPrice" className="text-right">سعر الورق الأسود (ريال)</Label>
                  <Input 
                    id="blackPaperPrice" 
                    type="number" 
                    value={blackPaperPrice}
                    onChange={(e) => setBlackPaperPrice(parseFloat(e.target.value) || 0)}
                    className="bg-zinc-700 mt-1"
                  />
                </div>
                <div className="bg-zinc-800 p-4 rounded-md">
                  <Label htmlFor="colorPaperPrice" className="text-right">سعر الورق الملون (ريال)</Label>
                  <Input 
                    id="colorPaperPrice" 
                    type="number" 
                    value={colorPaperPrice}
                    onChange={(e) => setColorPaperPrice(parseFloat(e.target.value) || 0)}
                    className="bg-zinc-700 mt-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)} className="bg-teal-600 hover:bg-teal-700">
            حفظ التغييرات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
