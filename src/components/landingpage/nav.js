import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function Nav({
  items,
  textColor = "text-white",
  gap = "gap-6",
  mobileGap = "gap-3",
  className = "",
}) {
  const location = useLocation();
  return (
    <nav className={`flex items-center ${className} ${mobileGap} md:${gap}`}>
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;

        return (
          <a
            key={index}
            href={item.link}
            className={`${textColor} 
              text-[10px] md:text-sm 
              ${isActive ? "text-lg md:text-xl" : "hover:opacity-80"} 
              transition-opacity px-1 md:px-0`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  textColor: PropTypes.string,
  gap: PropTypes.string,
  mobileGap: PropTypes.string,
  className: PropTypes.string,
};

export { Nav };
