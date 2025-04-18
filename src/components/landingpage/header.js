import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Header({
  logo,
  logoMobile,
  altText = "Logo",
  logoWidth = 100,
  logoHeight = 100,
  mobileLogoWidth = 24,
  mobileLogoHeight = 24,
  bgColor = "#181A1C",
  mobileHeight = "70px",
  desktopHeight = "94px",
  mobilePaddingX = "16px",
  desktopPaddingX = "40px",
  paddingY = "16px",
  children,
  profileComponent,
  className = "",
  isAdmin = false, // Tambahkan prop isAdmin
}) {
  const bgColorClass =
    {
      "#181A1C": "bg-[#181A1C]",
      "#ffffff": "bg-white",
      "#000000": "bg-black",
    }[bgColor] || "bg-[#181A1C]";

  return (
    <header
      className={`${bgColorClass} w-full h-[${mobileHeight}] md:h-[${desktopHeight}] px-[${mobilePaddingX}] md:px-[${desktopPaddingX}] py-[${paddingY}] ${className}`}
      style={{
        height: mobileHeight,
        paddingLeft: mobilePaddingX,
        paddingRight: mobilePaddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10 md:pl-12">
          <div className="flex-shrink-0">
            <img
              src={logoMobile || logo}
              alt={altText}
              width={mobileLogoWidth}
              height={mobileLogoHeight}
              className="object-contain md:hidden"
            />
            <img
              src={logo}
              alt={altText}
              width={logoWidth}
              height={logoHeight}
              className="object-contain hidden md:block"
            />
          </div>
          {children}
        </div>

        <div className="flex items-center gap-4">
          {/* Tambahkan Admin Link jika user adalah admin */}
          {isAdmin && (
            <Link
              to="/admin/movies"
              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Admin
            </Link>
          )}
          <div className="flex-shrink-0 md:pr-12">{profileComponent}</div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  logoMobile: PropTypes.string,
  altText: PropTypes.string,
  logoWidth: PropTypes.number,
  logoHeight: PropTypes.number,
  mobileLogoWidth: PropTypes.number,
  mobileLogoHeight: PropTypes.number,
  bgColor: PropTypes.string,
  mobileHeight: PropTypes.string,
  desktopHeight: PropTypes.string,
  mobilePaddingX: PropTypes.string,
  desktopPaddingX: PropTypes.string,
  paddingY: PropTypes.string,
  children: PropTypes.node,
  profileComponent: PropTypes.node,
  isAdmin: PropTypes.bool, // Tambahkan prop type untuk isAdmin
};

Header.defaultProps = {
  logoMobile: null,
  mobileLogoWidth: 40,
  mobileLogoHeight: 40,
  isAdmin: false, // Default false
};

export default Header;
