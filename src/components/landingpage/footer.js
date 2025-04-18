import PropTypes from "prop-types";
import { useState } from "react";

function Footer({ logo, altText, genres, helpLinks }) {
  const [mobileOpen, setMobileOpen] = useState({
    genre: false,
    help: false,
  });

  const toggleMobileMenu = (menu) => {
    setMobileOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <footer className="bg-[#181A1C] text-white py-8 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex flex-col items-start">
              {logo && <img src={logo} alt={altText} className="h-7 mb-5" />}
              <span className="text-sm opacity-75">
                ©2023 Chill All Rights Reserved
              </span>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            {/* Desktop View */}
            <h3 className="hidden md:block text-lg font-semibold mb-3">
              Genre
            </h3>
            <div className="hidden md:grid grid-cols-3 sm:grid-cols-4 gap-3">
              {genres.map((genre, index) => (
                <a
                  key={index}
                  href={genre.link}
                  className="text-sm opacity-75 hover:opacity-100 hover:text-blue-400 transition"
                >
                  {genre.name}
                </a>
              ))}
            </div>

            <div className="md:hidden">
              <button
                className="flex justify-between items-center w-full mb-3"
                onClick={() => toggleMobileMenu("genre")}
              >
                <h3 className="text-lg font-semibold">Genre</h3>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    mobileOpen.genre ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  mobileOpen.genre ? "block" : "hidden"
                } grid grid-cols-3 gap-3`}
              >
                {genres.map((genre, index) => (
                  <a
                    key={index}
                    href={genre.link}
                    className="text-sm opacity-75 hover:opacity-100 hover:text-blue-400 transition"
                  >
                    {genre.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Desktop View */}
            <h3 className="hidden md:block text-lg font-semibold mb-3">
              Bantuan
            </h3>
            <div className="hidden md:flex flex-col gap-2">
              {helpLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-sm opacity-75 hover:opacity-100 hover:text-blue-400 transition"
                >
                  {link.title}
                </a>
              ))}
            </div>

            <div className="md:hidden">
              <button
                className="flex justify-between items-center w-full mb-3"
                onClick={() => toggleMobileMenu("help")}
              >
                <h3 className="text-lg font-semibold">Bantuan</h3>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    mobileOpen.help ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  mobileOpen.help ? "block" : "hidden"
                } flex flex-col gap-2`}
              >
                {helpLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-sm opacity-75 hover:opacity-100 hover:text-blue-400 transition"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  logo: PropTypes.string,
  altText: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  helpLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Footer.defaultProps = {
  altText: "Logo Chill",
};

export default Footer;
