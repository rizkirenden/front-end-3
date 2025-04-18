import PropTypes from "prop-types";

export default function Btn({
  children,
  onClick,
  href,
  bgColor = "bg-[#0F1E93]",
  textColor = "text-white",
  rounded = "rounded-md",
  className = "",
  size = "md",
  ...props
}) {
  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
  };

  const commonClasses = `${sizeClasses[size]} ${bgColor} ${textColor} ${rounded} font-medium hover:opacity-90 transition ${className}`;

  return href ? (
    <a href={href} className={commonClasses} {...props}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={commonClasses} {...props}>
      {children}
    </button>
  );
}

Btn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
};
