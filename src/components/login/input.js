import PropTypes from "prop-types";
import { useState } from "react";

function Input({
  bgColor = "#181A1C",
  inputWidth,
  inputHeight,
  rounded = "rounded-full",
  placeholder = "",
  type = "text",
  value,
  onChange,
  className = "",
  label = "",
  isPassword = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle = {
    backgroundColor: `${bgColor}`,
    opacity: 0.7,
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-white mb-1 text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          style={inputStyle}
          className={`${inputWidth} ${inputHeight} ${rounded} px-4 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  bgColor: PropTypes.string,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  rounded: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Input;
