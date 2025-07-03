
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthProps {
  password: string;
  onStrengthChange?: (strength: number, isStrong: boolean) => void;
}

const PasswordStrength = ({ password, onStrengthChange }: PasswordStrengthProps) => {
  const [strength, setStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const newRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setRequirements(newRequirements);

    const score = Object.values(newRequirements).filter(Boolean).length;
    const strengthPercentage = (score / 5) * 100;
    setStrength(strengthPercentage);

    const isStrong = score >= 4;
    onStrengthChange?.(strengthPercentage, isStrong);
  }, [password, onStrengthChange]);

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Password strength:</span>
        <span className={`font-medium ${strength < 40 ? 'text-red-600' : strength < 70 ? 'text-yellow-600' : 'text-green-600'}`}>
          {getStrengthText()}
        </span>
      </div>
      
      <Progress value={strength} className="h-2">
        <div className={`h-full transition-all ${getStrengthColor()}`} style={{ width: `${strength}%` }} />
      </Progress>

      <div className="space-y-1 text-xs text-gray-600">
        <div className={`flex items-center ${requirements.length ? 'text-green-600' : 'text-gray-400'}`}>
          <span className="mr-2">{requirements.length ? '✓' : '○'}</span>
          At least 8 characters
        </div>
        <div className={`flex items-center ${requirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
          <span className="mr-2">{requirements.uppercase ? '✓' : '○'}</span>
          One uppercase letter
        </div>
        <div className={`flex items-center ${requirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
          <span className="mr-2">{requirements.lowercase ? '✓' : '○'}</span>
          One lowercase letter
        </div>
        <div className={`flex items-center ${requirements.number ? 'text-green-600' : 'text-gray-400'}`}>
          <span className="mr-2">{requirements.number ? '✓' : '○'}</span>
          One number
        </div>
        <div className={`flex items-center ${requirements.special ? 'text-green-600' : 'text-gray-400'}`}>
          <span className="mr-2">{requirements.special ? '✓' : '○'}</span>
          One special character
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
