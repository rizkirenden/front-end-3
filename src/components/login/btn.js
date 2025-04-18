import PropTypes from "prop-types";

function Btn({
  bgColor = "",
  textColor = "#FFFFFF",
  borderColor = "#ffffff",
  btnWidth = "w-full",
  btnHeight = "h-12",
  rounded = "rounded-full",
  className = "",
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`${btnWidth} ${btnHeight} ${rounded} ${className} flex justify-center items-center`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
        borderWidth: borderColor ? "1px" : "0",
      }}
    >
      {children}
    </button>
  );
}

Btn.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  btnWidth: PropTypes.string,
  btnHeight: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
export default Btn;
