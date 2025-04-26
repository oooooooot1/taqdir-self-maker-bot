
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  price: number;
  count: number;
}

interface ProductsPanelProps {
  products: Product[];
  blackPaperCount: number;
  colorPaperCount: number;
  updateProductCount: (id: number, count: number) => void;
  updatePaperCount: (type: 'black' | 'color', count: number) => void;
}

const ProductsPanel: React.FC<ProductsPanelProps> = ({
  products,
  blackPaperCount,
  colorPaperCount,
  updateProductCount,
  updatePaperCount
}) => {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 shadow-lg">
      {/* Paper types section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-2">
            <div className="size-4 bg-white rounded-full"></div>
            <div className="text-white text-lg">ورق اسود</div>
            <div className="size-4 bg-white rounded-full"></div>
          </div>
          <Input
            type="number"
            min="0"
            value={blackPaperCount}
            onChange={(e) => updatePaperCount('black', parseInt(e.target.value) || 0)}
            className="mt-2 bg-zinc-700 text-white text-center"
          />
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-2">
            <div className="size-4 bg-white rounded-full"></div>
            <div className="text-white text-lg">ورق ملون</div>
            <div className="size-4 bg-white rounded-full"></div>
          </div>
          <Input
            type="number"
            min="0"
            value={colorPaperCount}
            onChange={(e) => updatePaperCount('color', parseInt(e.target.value) || 0)}
            className="mt-2 bg-zinc-700 text-white text-center"
          />
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-800 rounded-lg p-2">
            <div className="relative text-center mb-1">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full size-8 flex items-center justify-center">
                <span className="text-black font-bold">{product.count}</span>
              </div>
              <div className="text-white mt-4">{product.name}</div>
            </div>
            <Button
              onClick={() => updateProductCount(product.id, product.count + 1)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              {product.price} ريال
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPanel;
