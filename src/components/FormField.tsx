interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField = ({ label, required = false, children }: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <label className="text-sm font-medium text-gray-700 min-w-[120px]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex-1 max-w-[300px]">{children}</div>
    </div>
  );
};

export default FormField;
