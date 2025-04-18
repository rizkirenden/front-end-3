import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCog, FaArrowUp, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

function Profile({
  profileImage = "/src/assets/profile.png",
  dropdownItems = [],
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultItems = [
    { label: "Profile", action: "#", icon: <FaCog className="text-sm" /> },
    {
      label: "Upgrade ke Premium",
      action: "#",
      icon: <FaArrowUp className="text-sm" />,
    },
    {
      label: "Keluar",
      action: "#",
      icon: <FaSignOutAlt className="text-sm" />,
    },
  ];

  const items = dropdownItems.length > 0 ? dropdownItems : defaultItems;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative flex items-center ${className}`}
      ref={dropdownRef}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white">
        <img
          src={profileImage}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center focus:outline-none ml-2"
        aria-label="Toggle profile menu"
      >
        <FaChevronDown
          className={`text-white text-sm transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 md:w-56 bg-[#181A1C] rounded-md shadow-lg py-1 z-50">
          {items.map((item, index) => (
            <div key={index}>
              {item.isDivider && (
                <div className="border-t border-gray-200 my-1"></div>
              )}
              <a
                href={item.action}
                className={`block px-3 py-2 text-xs md:text-sm flex items-center gap-2 ${
                  item.isDanger ? "text-red-600" : "text-white"
                } hover:text-[#3254FF]`}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {item.icon && (
                  <span className="text-xs md:text-sm">{item.icon}</span>
                )}
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  profileImage: PropTypes.string,
  dropdownItems: PropTypes.array,
  className: PropTypes.string,
};

export default Profile;
