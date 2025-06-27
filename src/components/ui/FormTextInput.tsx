import React from 'react';
import { koho } from '@/theme';

interface FormTextInputProps {
  field: string;
  value: string | undefined;
  label: string;
  isLong?: boolean;
  placeholder?: string;
  onChange: (field: string, value: string) => void;
  className?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  field,
  value,
  label,
  isLong = false,
  placeholder = "",
  onChange,
  className = ""
}) => {
  const handleChange = (newValue: string) => {
    onChange(field, newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-[12px] font-medium text-[#666F8D] mb-1.5">
        {label}
      </label>
      {isLong ? (
        <textarea
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full px-3 py-2 border border-[#E3E6EA] rounded-xl text-[14px] text-[#666F8D] min-h-[120px] resize-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm !rounded-xl leading-normal ${koho.className}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full px-3 py-2 border border-[#E3E6EA] rounded-xl text-[14px] text-[#666F8D] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm !rounded-xl leading-normal min-h-[32px] ${koho.className}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormTextInput; 