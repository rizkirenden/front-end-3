import PropTypes from "prop-types";
import Suara from "./suara";
import Btn from "./btn";
import { FaInfoCircle } from "react-icons/fa";

function HeroSection({
  title = "Welcome to Our Site",
  subtitle = "",
  bgImage = "",
  textColor = "text-white",
  titleSize = "text-4xl",
  subtitleSize = "text-xl",
  containerHeight = "h-screen",
  children,
  ctaText = "Learn More",
  ctaLink = "#",
  overlayColor = "rgba(0,0,0,0.5)",
  overlay = false,
  isMuted,
  onToggleMute,
  bgSize = "cover",
  bgPosition = "center",
}) {
  return (
    <section
      className={`relative ${containerHeight} w-full`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
        backgroundRepeat: "no-repeat",
        aspectRatio: "16/9",
        height: "auto",
        minHeight: "300px",
      }}
    >
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-center items-start px-4 sm:px-6 h-full pt-12 md:pt-36">
        <div className="text-left mb-4 md:mb-8 w-full max-w-3xl">
          <h1 className={`${titleSize} ${textColor} font-bold mb-2 md:mb-4`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`${subtitleSize} ${textColor} mb-4 md:mb-8 w-full`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full flex flex-row items-center justify-between gap-2">
          {/* Group tombol kiri */}
          <div className="flex items-center gap-2">
            <Btn
              bgColor="bg-[#0F1E93]"
              rounded="rounded-full"
              href={ctaLink}
              className="px-4 py-1 text-sm md:px-6 md:py-2 md:text-base"
            >
              {ctaText}
            </Btn>
            <Btn
              bgColor="bg-[#181A1C]"
              rounded="rounded-full"
              href="#"
              className="flex items-center px-4 py-1 text-sm md:px-6 md:py-2 md:text-base"
            >
              <FaInfoCircle className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Selengkapnya</span>
              <span className="sm:hidden">Selengkapnya</span>
            </Btn>
            <div className="text-white bg-black bg-opacity-10 border-white border-2 px-2 py-1 rounded-full text-xs md:text-sm">
              18+
            </div>
          </div>

          <div className="border-2 border-white rounded-full p-1 md:p-2">
            <Suara
              isMuted={isMuted}
              onToggle={onToggleMute}
              size="sm"
              className="md:size-md"
            />
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  textColor: PropTypes.string,
  titleSize: PropTypes.string,
  subtitleSize: PropTypes.string,
  contentPosition: PropTypes.string,
  containerWidth: PropTypes.string,
  containerHeight: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaBgColor: PropTypes.string,
  ctaTextColor: PropTypes.string,
  ctaRounded: PropTypes.string,
  overlayColor: PropTypes.string,
  overlay: PropTypes.bool,
  isMuted: PropTypes.bool,
  onToggleMute: PropTypes.func,
  bgExtended: PropTypes.bool,
};

export default HeroSection;
