import React from "react";

interface TextInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`field ${className}`.trim()}>
      <label className="field-label">
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
      </label>
    </div>
  );
};

export default TextInput;
