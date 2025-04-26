
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, Asterisk, Divide } from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState('');
  
  const handleDigit = (digit: string) => {
    setDisplay(prev => prev + digit);
  };
  
  const handleOperator = (operator: string) => {
    setDisplay(prev => prev + operator);
  };
  
  const calculate = () => {
    try {
      const result = Function('"use strict";return (' + display + ')')();
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('خطأ');
    }
  };
  
  const clear = () => {
    setDisplay('');
  };
  
  return <div className="bg-zinc-900 rounded-lg p-4 shadow-lg">
      <div className="text-center mb-2 text-white text-xl">شاشة الآلة الحاسبة</div>
      
      {/* Clear button above the grid */}
      <div className="mb-2">
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white w-full h-14" onClick={clear}>C</Button>
      </div>

      {/* Display */}
      <div className="bg-black p-4 rounded-lg mb-4">
        <div className="text-right text-2xl font-mono text-white h-10">
          {display || '0'}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2">
        {/* First row */}
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('7')}>7</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('8')}>8</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('9')}>9</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleOperator('+')}><Plus className="h-6 w-6" /></Button>

        {/* Second row */}
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('4')}>4</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('5')}>5</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('6')}>6</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleOperator('-')}><Minus className="h-6 w-6" /></Button>

        {/* Third row */}
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('1')}>1</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('2')}>2</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('3')}>3</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleOperator('*')}><Asterisk className="h-6 w-6" /></Button>

        {/* Fourth row */}
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('0')}>0</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleDigit('.')}>.</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={calculate}>=</Button>
        <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white h-14" onClick={() => handleOperator('/')}><Divide className="h-6 w-6" /></Button>
      </div>
    </div>;
};
export default Calculator;
