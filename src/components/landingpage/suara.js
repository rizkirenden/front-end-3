import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Suara({
  isMuted,
  onToggle,
  className = "",
  size = "md",
}) {
  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
  };

  return (
    <button
      onClick={onToggle}
      className={`${sizeClasses[size]} rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition ${className}`}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <FaVolumeMute size={iconSizes[size]} />
      ) : (
        <FaVolumeUp size={iconSizes[size]} />
      )}
    </button>
  );
}

Suara.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
};
