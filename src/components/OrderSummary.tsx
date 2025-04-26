
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface OrderSummaryProps {
  shopName: string;
  orderItems: Array<{name: string, count: number, price: number}>;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ shopName, orderItems, total }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>طباعة الطلب - ${shopName}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .print-content { padding: 20px; }
            .shop-name { font-size: 22px; color: #10b981; margin-bottom: 10px; text-align: center; }
            .item { margin-bottom: 5px; }
            .total { margin-top: 15px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="print-content">
            <div class="shop-name">${shopName}</div>
            <div>تفاصيل الطلب:</div>
            ${orderItems.map(item => `
              <div class="item">
                ${item.name} × ${item.count} = ${item.price.toFixed(2)} ريال
              </div>
            `).join('')}
            <div class="total">الإجمالي: ${total.toFixed(2)} ريال</div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 shadow-lg">
      <div ref={printRef}>
        <div className="text-teal-400 text-xl font-bold mb-2">
          الإجمالي: {total.toFixed(2)} ريال
        </div>
        <div className="text-teal-400 text-xl font-bold mb-6">
          {shopName}
        </div>
        <div className="text-gray-300 mb-2">
          تفاصيل الطلب:
        </div>
        <div className="space-y-2">
          {orderItems.map((item, index) => (
            <div key={index} className="text-white">
              {item.name} × {item.count} = {item.price.toFixed(2)} ريال
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={handlePrint}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Printer className="mr-2 h-5 w-5" />
          طباعة
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
