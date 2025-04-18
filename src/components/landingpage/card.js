import PropTypes from "prop-types";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPlay,
  FaCheck,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

const CARD_STYLES = {
  base: "flex flex-col p-0 rounded-lg overflow-hidden shadow-md relative transition-all duration-300",
  hoverPanel: "w-full bg-[#181A1C] border-t border-[#2D2F31] p-2",
  newEpisodeBadge:
    "bg-[#0F1E93] text-white text-[6px] xs:text-[8px] sm:text-xs font-bold px-1 xs:px-1.5 sm:px-2 py-0.5 rounded-sm sm:rounded",
  top10Badge: "bg-red-600 text-white text-center leading-none p-0.5",
  ageRating: "bg-[#CDF1FF4D] rounded px-1 py-0.5",
  progressBar: "w-full bg-[#2D2F31] h-1 rounded-full",
  progressFill: "h-full bg-[#0F8FF3] rounded-full",
  actionButton:
    "bg-white text-black rounded-full p-1 sm:p-2 hover:bg-opacity-90",
};

const Card = ({
  title,
  image,
  hoverImage,
  alt,
  rating,
  imageWidth = "100%",
  imageHeight = "140px",
  bgColor = "bg-[#181A1C]",
  textColor = "text-white",
  titleSize = "text-lg",
  children,
  newEpisode = false,
  top10 = false,
  ageRating = "13+",
  episodeCount = null,
  duration = null,
  genre,
  isContinueWatching = false,
  progress = 0,
  timeRemaining = "2h 13m",
  position = "middle",
  onAddToDaftarSaya,
  onRemoveFromDaftarSaya,
  isDaftarSaya = false,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [naturalAspectRatio, setNaturalAspectRatio] = useState(16 / 9);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalAspectRatio(naturalWidth / naturalHeight);
  };

  const getTransformScale = () => {
    if (isContinueWatching) return 1.05;
    return isMobile ? 1.15 : 1.35;
  };

  const getTransformOrigin = () => {
    if (position === "left") return "left top";
    if (position === "right") return "right top";
    return "center top";
  };

  const getHoverMargin = () => {
    const scale = getTransformScale();
    const offsetPercentage = (scale - 1) * 50;

    if (position === "left") return `0 ${offsetPercentage}% 20px 0`;
    if (position === "right") return `0 0 20px ${offsetPercentage}% 20px 0`;
    return `0px ${offsetPercentage}% 10px ${offsetPercentage / 50}%`;
  };

  const getHoverHeight = () => {
    if (isContinueWatching) {
      return isMobile ? "180px" : "220px";
    }
    return `calc(${imageWidth} * ${naturalAspectRatio} * ${
      isMobile ? 1 : 1.15
    })`;
  };

  return (
    <div
      ref={cardRef}
      className={`${CARD_STYLES.base} ${bgColor} ${textColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: imageWidth,
        transform: isHovered ? `scale(${getTransformScale()})` : "scale(1)",
        transformOrigin: getTransformOrigin(),
        zIndex: isHovered ? 20 : 1,
        margin: isHovered ? getHoverMargin() : "0",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: isHovered
            ? getHoverHeight()
            : isMobile
            ? "170px"
            : imageHeight,
          transition: "height 0.3s ease",
        }}
      >
        <img
          src={image}
          alt={alt}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
            isHovered && hoverImage && !isContinueWatching
              ? "opacity-0"
              : "opacity-100"
          }`}
          onLoad={handleImageLoad}
        />

        {hoverImage && !isContinueWatching && (
          <img
            src={hoverImage}
            alt={alt}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {newEpisode && (
          <div
            className={`absolute top-1 left-1 ${CARD_STYLES.newEpisodeBadge}`}
          >
            Episode Baru
          </div>
        )}

        {top10 && (
          <div
            className={`absolute top-0 right-1 sm:right-2 ${CARD_STYLES.top10Badge}`}
          >
            <div className="text-[4px] xs:text-[5px] sm:text-[6px] font-bold uppercase tracking-tighter">
              TOP
            </div>
            <div className="text-[6px] xs:text-[7px] sm:text-xs font-bold">
              10
            </div>
          </div>
        )}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 w-full p-2 sm:p-3 bg-gradient-to-t from-black/80 to-transparent text-left">
            <div className="flex justify-between items-end">
              <h2 className={`font-bold text-xs sm:text-sm ${titleSize}`}>
                {title}
              </h2>
              {/* Tampilkan rating hanya untuk Continue Watching */}
              {isContinueWatching && (
                <div className="flex items-center">
                  <FaStar className="text-white mr-1 text-xs sm:text-sm" />
                  <span className="font-bold text-xs sm:text-sm">{rating}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isHovered && (
        <div className={CARD_STYLES.hoverPanel}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <button className={CARD_STYLES.actionButton}>
                <FaPlay className="text-xs sm:text-sm" />
              </button>
              {isDaftarSaya ? (
                <button
                  className={CARD_STYLES.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromDaftarSaya && onRemoveFromDaftarSaya(id);
                  }}
                >
                  <FaTimes className="text-xs sm:text-sm" />
                </button>
              ) : (
                <button
                  className={CARD_STYLES.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToDaftarSaya &&
                      onAddToDaftarSaya({
                        id,
                        title,
                        image,
                        hoverImage,
                        rating,
                        ageRating,
                        duration,
                        genre,
                      });
                  }}
                >
                  <FaCheck className="text-xs sm:text-sm" />
                </button>
              )}
            </div>
            <button className={CARD_STYLES.actionButton}>
              <FaChevronDown className="text-xs sm:text-sm" />
            </button>
          </div>

          <div className="flex text-[10px] sm:text-xs text-gray-300 gap-1 sm:gap-2 items-center mb-1">
            <span className={`font-bold ${CARD_STYLES.ageRating}`}>
              {ageRating}
            </span>
            {duration && <span>{duration}</span>}
            {episodeCount && <span>{episodeCount}</span>}
          </div>

          {isContinueWatching && (
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-300 mb-1">
              <div className={CARD_STYLES.progressBar}>
                <div
                  className={CARD_STYLES.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{timeRemaining}</span>
            </div>
          )}
          <div className="text-[4px] md:text-[12px] text-[#C1C2C4] truncate font-bold flex justify-center items-center w-full text-center">
            {genre}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

const CardSlider = ({
  cards,
  cardClassName = "",
  showArrows = true,
  showBadges = false,
  imageWidth = "100%",
  imageHeight = "100%",
  visibleCards = 5,
  isContinueWatching = false,
  initialVisibleCards = null,
  onAddToDaftarSaya,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const effectiveVisibleCards = isContinueWatching
    ? isMobile
      ? 1
      : 4
    : isMobile
    ? 3
    : initialVisibleCards !== null
    ? initialVisibleCards
    : visibleCards;

  const updateCardWidth = useCallback(() => {
    if (containerRef.current && sliderRef.current?.children[0]) {
      const containerWidth = containerRef.current.offsetWidth;
      const gap = isMobile ? 12 : 16;
      const sidePadding = isMobile ? 32 : 48;
      const availableWidth = containerWidth - sidePadding * 2;

      const width = isContinueWatching
        ? isMobile
          ? availableWidth * 0.85
          : Math.min((availableWidth - 3 * gap) / 4, 350)
        : isMobile
        ? Math.min(
            (availableWidth - (effectiveVisibleCards - 1) * gap) /
              effectiveVisibleCards,
            200
          )
        : Math.min(
            (availableWidth - (effectiveVisibleCards - 1) * gap) /
              effectiveVisibleCards,
            300
          );

      setCardWidth(width);

      Array.from(sliderRef.current.children).forEach((child) => {
        child.style.width = `${width}px`;
      });
    }
  }, [effectiveVisibleCards, isMobile, isContinueWatching]);

  const nextCards = () => {
    if (!sliderRef.current) return;

    const gap = isMobile ? 12 : 16;
    const scrollAmount =
      (cardWidth + gap) * (isContinueWatching ? 4 : effectiveVisibleCards);
    const newScrollLeft = sliderRef.current.scrollLeft + scrollAmount;
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

    if (newScrollLeft >= maxScrollLeft) {
      sliderRef.current.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      setCurrentIndex(cards.length - effectiveVisibleCards);
    } else {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setCurrentIndex((prev) =>
        Math.min(
          prev + effectiveVisibleCards,
          cards.length - effectiveVisibleCards
        )
      );
    }
  };

  const prevCards = () => {
    if (!sliderRef.current) return;

    const gap = isMobile ? 12 : 16;
    const scrollAmount =
      (cardWidth + gap) * (isContinueWatching ? 4 : effectiveVisibleCards);
    const newScrollLeft = sliderRef.current.scrollLeft - scrollAmount;

    if (newScrollLeft <= 0) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentIndex(0);
    } else {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(prev - effectiveVisibleCards, 0));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateCardWidth();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCardWidth]);

  useEffect(() => {
    updateCardWidth();
  }, [updateCardWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const gap = isMobile ? 12 : 16;
        const scrollPosition = sliderRef.current.scrollLeft;
        const cardWidthWithGap = cardWidth + gap;
        const newIndex = Math.round(scrollPosition / cardWidthWithGap);
        setCurrentIndex(newIndex);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [cardWidth, isMobile]);

  return (
    <div
      className="relative w-full overflow-visible px-[20px]"
      ref={containerRef}
    >
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto w-full py-4 scroll-smooth pl-0"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {cards.map((card, index) => {
          const isLastCard = index === cards.length - 1;
          const isContinueCard = card.isContinueWatching || isContinueWatching;

          return (
            <div
              key={index}
              className={`flex-shrink-0 ${cardClassName}`}
              style={{
                marginRight: isContinueCard
                  ? isLastCard
                    ? "0"
                    : "14px"
                  : "6px",
                transform: isContinueCard ? "translateX(-10px)" : "none",
              }}
            >
              <Card
                {...card}
                imageWidth={`${cardWidth}px`}
                imageHeight={isContinueCard ? undefined : imageHeight}
                newEpisode={showBadges ? card.newEpisode : false}
                top10={showBadges ? card.top10 : false}
                isContinueWatching={isContinueCard}
                position={
                  index === 0 ? "left" : isLastCard ? "right" : "middle"
                }
                onAddToDaftarSaya={onAddToDaftarSaya}
              />
            </div>
          );
        })}
      </div>

      {showArrows && !isMobile && (
        <>
          <button
            onClick={prevCards}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-[#181A1C] border-2 border-white text-white p-2 rounded-full z-[100] transition ${
              currentIndex === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-110"
            }`}
            style={{
              left: "0px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <button
            onClick={nextCards}
            disabled={currentIndex >= cards.length - effectiveVisibleCards}
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-[#181A1C] border-2 border-white text-white p-2 rounded-full z-[100] transition ${
              currentIndex >= cards.length - effectiveVisibleCards
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-110"
            }`}
            style={{
              right: "0px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChevronRight className="text-lg" />
          </button>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  hoverImage: PropTypes.string,
  alt: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  titleSize: PropTypes.string,
  children: PropTypes.node,
  newEpisode: PropTypes.bool,
  top10: PropTypes.bool,
  ageRating: PropTypes.string,
  episodeCount: PropTypes.string,
  duration: PropTypes.string,
  genre: PropTypes.string,
  isContinueWatching: PropTypes.bool,
  progress: PropTypes.number,
  timeRemaining: PropTypes.string,
  position: PropTypes.oneOf(["left", "middle", "right"]),
  onAddToDaftarSaya: PropTypes.func,
  onRemoveFromDaftarSaya: PropTypes.func,
  isDaftarSaya: PropTypes.bool,
  id: PropTypes.string,
};

CardSlider.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)).isRequired,
  cardClassName: PropTypes.string,
  showArrows: PropTypes.bool,
  showBadges: PropTypes.bool,
  visibleCards: PropTypes.number,
  isContinueWatching: PropTypes.bool,
  initialVisibleCards: PropTypes.number,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAddToDaftarSaya: PropTypes.func,
};
export { Card, CardSlider };
export default Card;
