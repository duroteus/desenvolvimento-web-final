import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Input = ({ label, name, value, onChange, ...props }: InputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      <input
        {...props}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
