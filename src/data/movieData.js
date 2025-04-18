import { FaCog, FaArrowUp, FaSignOutAlt } from "react-icons/fa";
import defaultProfile from "../assets/profile.png";
import logo from "../assets/Logo.png";
import cardImage1 from "../assets/image 233.png";
import cardImage2 from "../assets/image 223.png";
import cardImage3 from "../assets/image 224.png";
import cardImage4 from "../assets/image 219.png";
import cardImageHover1 from "../assets/Type=11.png";
import cardImageHover2 from "../assets/Type=21.png";

export const navItems = [
  { label: "Series", link: "#" },
  { label: "Film", link: "#" },
  { label: "Daftar Saya", link: "/daftarsaya" },
];

export const profileData = {
  profileImage: defaultProfile,
  dropdownItems: [
    { label: "Profile", action: "#", icon: <FaCog /> },
    { label: "Upgrade ke Premium", action: "#", icon: <FaArrowUp /> },
    { label: "Keluar", action: "#", icon: <FaSignOutAlt /> },
  ],
};

export const cards = [
  {
    title: "Dont Look Up",
    image: cardImage1,
    hoverImage: cardImageHover1,
    alt: "Stranger Things",
    rating: "4.8 / 5",
    newEpisode: false,
    top10: false,
    ageRating: "13+",
    episodeCount: "S2 E5",
    genre: "Sci-Fi • Horror • Drama",
    isContinueWatching: true,
    progress: 65,
    timeRemaining: "1h 22m",
    isSeries: true,
    bgColor: "bg-[#181A1C]",
    textColor: "text-white",
  },
  {
    title: "All Of Us Dead",
    image: cardImage2,
    hoverImage: cardImageHover2,
    alt: "Avengers: Endgame",
    rating: "4.9 / 5",
    newEpisode: false,
    top10: false,
    ageRating: "13+",
    duration: "3h 1m",
    genre: "Action • Adventure • Sci-Fi",
    isContinueWatching: true,
    progress: 45,
    timeRemaining: "1h 40m",
    isSeries: false,
    bgColor: "bg-[#181A1C]",
    textColor: "text-white",
  },
  {
    title: "A Man Called Otto",
    image: cardImage3,
    alt: "The Witcher",
    rating: "4.9 / 5",
    newEpisode: false,
    top10: false,
    ageRating: "PG-13",
    episodeCount: null,
    genre: "Comedy • Drama",
    isContinueWatching: false,
    progress: null,
    timeRemaining: "N/A",
    isSeries: false,
    bgColor: "bg-[#181A1C]",
    textColor: "text-white",
  },
  {
    title: "Blue Lock",
    image: cardImage4,
    alt: "The Witcher",
    rating: "4.9 / 5",
    newEpisode: true,
    top10: false,
    ageRating: "13+",
    episodeCount: "S1 E6",
    genre: "Sports • Action • Drama",
    isContinueWatching: true,
    progress: 50,
    timeRemaining: "22m",
    isSeries: true,
    bgColor: "bg-[#181A1C]",
    textColor: "text-white",
  },
];

export const footerData = {
  logo,
  genres: [
    { name: "Aksi", link: "#" },
    { name: "Anak-anak", link: "#" },
    { name: "Anime", link: "#" },
    { name: "Britania", link: "#" },
    { name: "Drama", link: "#" },
    { name: "Fantasi Ilmiah & Fantasi", link: "#" },
    { name: "Kejahatan", link: "#" },
    { name: "KDrama", link: "#" },
    { name: "Komedi", link: "#" },
    { name: "Petualangan", link: "#" },
    { name: "Perang", link: "#" },
    { name: "Romantis", link: "#" },
    { name: "Sains & Alam", link: "#" },
    { name: "Thriller", link: "#" },
  ],
  helpLinks: [
    { title: "FAQ", url: "#" },
    { title: "Kontak Kami", url: "#" },
    { title: "Privasi", url: "#" },
    { title: "Syarat & Ketentuan", url: "#" },
  ],
};
