import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronDown, FaPlay, FaTimes } from "react-icons/fa";

const CARD_STYLES = {
  base: "flex flex-col p-0 rounded-lg overflow-hidden shadow-md relative transition-all duration-300 bg-[#181A1C] text-white",
  hoverPanel:
    "w-full bg-[#181A1C] border-t border-[#2D2F31] p-2 transition-opacity duration-300",
  newEpisodeBadge:
    "bg-[#0F1E93] text-white text-xs font-bold px-2 py-0.5 rounded",
  actionButton: "bg-white text-black rounded-full p-2 hover:bg-opacity-90",
  removeButton: "bg-red-500 text-white rounded-full p-2 hover:bg-opacity-90",
  ageRating: "bg-[#CDF1FF4D] rounded px-1 py-0.5",
};

const GridCard = ({
  image,
  alt,
  ageRating,
  duration,
  genre,
  id,
  onRemoveFromDaftarSaya,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={CARD_STYLES.base}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-80 group">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className={`${CARD_STYLES.actionButton} transform scale-125`}
            >
              <FaPlay className="text-lg" />
            </button>
          </div>
        )}
      </div>
      <div
        className={`${CARD_STYLES.hoverPanel} ${
          isHovered ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <div className="flex gap-1 items-center mb-2">
          <button
            className={CARD_STYLES.removeButton}
            onClick={() => onRemoveFromDaftarSaya(id)}
          >
            <FaTimes className="text-sm" />
          </button>
          <button className={`${CARD_STYLES.actionButton} ml-auto`}>
            <FaChevronDown className="text-xs sm:text-sm" />
          </button>
        </div>
        <div className="flex text-xs text-gray-300 gap-2 items-center mb-1">
          <span className={`font-bold ${CARD_STYLES.ageRating}`}>
            {ageRating}
          </span>
          {duration && <span>{duration}</span>}
        </div>
        <div className="text-xs text-[#C1C2C4] font-bold text-center">
          {genre}
        </div>
      </div>
    </div>
  );
};

GridCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ageRating: PropTypes.string,
  duration: PropTypes.string,
  genre: PropTypes.string,
  id: PropTypes.string,
  onRemoveFromDaftarSaya: PropTypes.func,
};

export default GridCard;
