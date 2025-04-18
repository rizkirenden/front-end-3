import { useState, useEffect } from "react";
import Header from "../components/landingpage/header";
import { Nav } from "../components/landingpage/nav";
import Profile from "../components/landingpage/profile";
import GridCard from "../components/daftarsaya/gridcard";
import logoKecil from "../assets/logokecil.png";
import Footer from "../components/landingpage/footer";
import { navItems, profileData, footerData } from "../data/movieData";

const DaftarSaya = () => {
  const [daftarSaya, setDaftarSaya] = useState([]);

  useEffect(() => {
    const savedDaftarSaya =
      JSON.parse(localStorage.getItem("daftarSaya")) || [];
    setDaftarSaya(savedDaftarSaya);
  }, []);

  const handleRemoveFromDaftarSaya = (cardId) => {
    const updatedDaftarSaya = daftarSaya.filter((item) => item.id !== cardId);
    setDaftarSaya(updatedDaftarSaya);
    localStorage.setItem("daftarSaya", JSON.stringify(updatedDaftarSaya));
    alert("Film telah dihapus dari Daftar Saya");
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

      <main className="mt-[94px] flex-grow">
        <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#181A1C]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-left">
            Daftar Saya
          </h2>
          {daftarSaya.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {daftarSaya.map((item) => (
                <GridCard
                  key={item.id}
                  {...item}
                  onRemoveFromDaftarSaya={handleRemoveFromDaftarSaya}
                />
              ))}
            </div>
          ) : (
            <p className="text-white text-center py-10">
              Belum ada film di Daftar Saya
            </p>
          )}
        </section>
      </main>

      <Footer
        logo={footerData.logo}
        genres={footerData.genres}
        helpLinks={footerData.helpLinks}
      />
    </div>
  );
};

export default DaftarSaya;
