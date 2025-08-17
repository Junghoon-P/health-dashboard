interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  transform?: (value: string) => string;
  className?: string;
}

const InputField = ({
  value,
  onChange,
  placeholder,
  maxLength,
  transform,
  className = "",
}: InputFieldProps) => {
  return (
    <input
      type="text"
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      value={value}
      onChange={(e) => {
        const inputValue = e.target.value;
        const transformedValue = transform ? transform(inputValue) : inputValue;
        onChange(transformedValue);
      }}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default InputField;
