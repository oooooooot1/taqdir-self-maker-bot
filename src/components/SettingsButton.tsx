
import React from 'react';
import { Button } from "@/components/ui/button";

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick} 
      className="bg-teal-600 hover:bg-teal-700 text-white px-6"
    >
      الإعدادات
    </Button>
  );
};

export default SettingsButton;
