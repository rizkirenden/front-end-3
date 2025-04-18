import { useState, useEffect } from "react";
import Header from "../components/landingpage/header";
import { Nav } from "../components/landingpage/nav";
import Profile from "../components/landingpage/profile";
import HeroSection from "../components/landingpage/herosection";
import { CardSlider } from "../components/landingpage/card";
import Footer from "../components/landingpage/footer";
import hero from "../assets/herosection.png";
import logoKecil from "../assets/logokecil.png";
import { navItems, profileData, cards, footerData } from "../data/movieData";

function Index() {
  const [isMuted, setIsMuted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [topRating, setTopRating] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [daftarSaya, setDaftarSaya] = useState([]);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    const savedMovies = JSON.parse(localStorage.getItem("movieData"));
    const savedDaftarSaya =
      JSON.parse(localStorage.getItem("daftarSaya")) || [];

    if (savedMovies) {
      setTopRating(savedMovies.topRating || []);
      setTrending(savedMovies.trending || []);
      setNewRelease(savedMovies.newRelease || []);
    }
    setDaftarSaya(savedDaftarSaya);
  }, []);

  useEffect(() => {
    localStorage.setItem("daftarSaya", JSON.stringify(daftarSaya));
  }, [daftarSaya]);

  const handleAddToDaftarSaya = (card) => {
    const isAlreadyAdded = daftarSaya.some((item) => item.id === card.id);

    if (!isAlreadyAdded) {
      const newDaftarSaya = [
        ...daftarSaya,
        {
          id: card.id,
          title: card.title,
          image: card.image,
          hoverImage: card.hoverImage,
          rating: card.rating,
          ageRating: card.ageRating,
          duration: card.duration,
          genre: card.genre,
        },
      ];

      setDaftarSaya(newDaftarSaya);
      localStorage.setItem("daftarSaya", JSON.stringify(newDaftarSaya));
      alert(`${card.title} telah ditambahkan ke Daftar Saya`);
    } else {
      alert(`${card.title} sudah ada di Daftar Saya`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#181A1C]">
      <Header
        logo={footerData.logo}
        logoMobile={logoKecil}
        altText="Logo"
        bgColor="bg-[#181A1C]"
        mobileHeight="70px"
        desktopHeight="94px"
        profileComponent={<Profile {...profileData} />}
        className="px-4 fixed top-0 left-0 right-0 z-50"
      >
        <Nav
          items={navItems}
          textColor="text-white"
          gap="gap-6 md:gap-8"
          mobileGap="gap-3"
          className="flex items-center"
        />
      </Header>

      <HeroSection
        title="Duty After School"
        subtitle="Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang."
        bgImage={hero}
        overlay={true}
        overlayColor="rgba(0,1,0,0.5)"
        textColor="text-white"
        titleSize="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        subtitleSize="text-xs sm:text-sm md:text-lg lg:text-xl"
        ctaText="Mulai"
        ctaLink="#"
        ctaBgColor="bg-[#0F1E93]"
        ctaRounded="rounded-full"
        containerHeight="min-h-[300px] md:h-[calc(100vh-94px)]"
        bgSize="cover"
        bgPosition="center"
        contentPosition="flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 lg:px-32"
        contentMaxWidth="max-w-4xl"
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        bgExtended={true}
      />

      <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#181A1C]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-left">
          Melanjutkan Nonton Film
        </h2>
        <div className="w-full overflow-hidden">
          <CardSlider
            cards={cards}
            showBadges={true}
            isContinueWatching={true}
            initialVisibleCards={4}
            visibleCards={5}
            onAddToDaftarSaya={handleAddToDaftarSaya}
          />
        </div>
      </section>

      <section className="py-6 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#181A1C]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Top Rating Film dan Series Hari Ini
          </h2>
          {isAdmin && (
            <a
              href="/admin/movies?tab=topRating"
              className="text-blue-500 hover:underline text-sm"
            >
              Manage
            </a>
          )}
        </div>
        <div className="w-full overflow-hidden">
          <CardSlider
            cards={topRating}
            cardClassName="max-w-[180px] sm:max-w-[280px]"
            showArrows={true}
            showBadges={true}
            imageHeight="400px"
            onAddToDaftarSaya={handleAddToDaftarSaya}
          />
        </div>
      </section>

      <section className="py-6 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#181A1C]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Film Trending
          </h2>
          {isAdmin && (
            <a
              href="/admin/movies?tab=trending"
              className="text-blue-500 hover:underline text-sm"
            >
              Manage
            </a>
          )}
        </div>
        <div className="w-full overflow-hidden">
          <CardSlider
            cards={trending}
            cardClassName="max-w-[180px] sm:max-w-[280px]"
            showArrows={true}
            showBadges={true}
            imageHeight="400px"
            onAddToDaftarSaya={handleAddToDaftarSaya}
          />
        </div>
      </section>

      <section className="py-6 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#181A1C]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Rilis Baru
          </h2>
          {isAdmin && (
            <a
              href="/admin/movies?tab=newRelease"
              className="text-blue-500 hover:underline text-sm"
            >
              Manage
            </a>
          )}
        </div>
        <div className="w-full overflow-hidden">
          <CardSlider
            cards={newRelease}
            cardClassName="max-w-[180px] sm:max-w-[280px]"
            showArrows={true}
            showBadges={true}
            imageHeight="400px"
            onAddToDaftarSaya={handleAddToDaftarSaya}
          />
        </div>
      </section>

      <Footer
        logo={footerData.logo}
        genres={footerData.genres}
        helpLinks={footerData.helpLinks}
      />
    </div>
  );
}

export default Index;
