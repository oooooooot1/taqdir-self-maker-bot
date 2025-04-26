
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Plus,
  Minus,
  Asterisk,
  Divide,
  Equal
} from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [total, setTotal] = useState(0);

  const handleDigit = (digit: string) => {
    setDisplay(prev => prev + digit);
  };

  const handleOperator = (operator: string) => {
    setDisplay(prev => prev + operator);
  };

  const calculate = () => {
    try {
      const result = eval(display);
      setDisplay(result.toString());
      setTotal(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('');
    setTotal(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Display */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-right text-2xl font-mono mb-2">
            {display || '0'}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={clear}>C</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator('(')}>(</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator(')')}>)</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator('/')}><Divide className="h-4 w-4" /></Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => handleDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator('*')}><Asterisk className="h-4 w-4" /></Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => handleDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator('-')}><Minus className="h-4 w-4" /></Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => handleDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleOperator('+')}><Plus className="h-4 w-4" /></Button>

          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleDigit('0')}>0</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleDigit('.')}>.</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={clear}>AC</Button>
          <Button variant="outline" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={calculate}><Equal className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
