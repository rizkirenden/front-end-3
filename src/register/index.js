import { useState } from "react";
import Card from "../components/login/card";
import Btn from "../components/login/btn";
import image from "../assets/Logo.png";
import Input from "../components/login/input";
import backgroundImage from "../assets/register.jpeg";
import google from "../assets/google.png";

function Index() {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleLogin = () => {
    console.log("Login attempt with:", inputValue, passwordValue);
    if (passwordValue !== confirmPasswordValue) {
      console.log("Passwords don't match!");
      return;
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div
      className="w-screen h-screen p-4 flex justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        image={image}
        imagePosition="flex flex-col justify-start items-center pt-4 md:pt-8"
        bgColor=""
        imageWidth={100}
        imageHeight={100}
        cardWidth="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3"
        cardHeight="h-auto"
        rounded="rounded-xl"
        className="backdrop-blur-sm bg-[#181A1C] bg-opacity-60 p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col justify-center items-center mb-3">
          <h5 className="pt-4 md:pt-8 text-2xl sm:text-3xl text-white">
            Daftar
          </h5>
          <p className="pt-1 text-sm sm:text-base text-white">
            Selamat Datang Kembali !
          </p>
        </div>

        <div className="w-full px-2 sm:px-4">
          <Input
            label="Username"
            bgColor=""
            inputWidth="w-full"
            inputHeight="h-10 sm:h-12"
            placeholder="Masukan User Name"
            value={inputValue}
            onChange={handleInputChange}
            className="text-sm sm:text-base text-white bg-[#181A1C] bg-opacity-60 mb-3"
          />
          <Input
            label="Password"
            inputWidth="w-full"
            placeholder="Masukan Kata Sandi"
            inputHeight="h-10 sm:h-12"
            isPassword={true}
            value={passwordValue}
            onChange={handlePasswordChange}
            className="text-sm sm:text-base text-white bg-[#181A1C] bg-opacity-60 mb-3"
          />
          <Input
            label="Konfirmasi Password"
            inputWidth="w-full"
            placeholder="Konfirmasi Kata Sandi"
            inputHeight="h-10 sm:h-12"
            isPassword={true}
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
            className="text-sm sm:text-base text-white bg-[#181A1C] bg-opacity-60"
          />
        </div>
        <div className="w-full grid grid-cols-2 items-center mt-4 text-xs sm:text-sm mb-4 sm:mb-6 px-2 sm:px-4">
          <a href="/register" className="text-[#C1C2C4] whitespace-nowrap">
            Sudah punya akun?{" "}
            <span className="text-white hover:underline">Masuk</span>
          </a>
          <div></div>
        </div>
        <div className="w-full px-2 sm:px-4">
          <Btn
            bgColor="#3D4142"
            textColor="#FFFFFF"
            btnWidth="w-full"
            btnHeight="h-10 sm:h-12"
            rounded="rounded-full"
            className="text-sm sm:text-base mb-3 sm:mb-4 transition duration-300"
            onClick={handleLogin}
          >
            Masuk
          </Btn>
          <p className="text-xs sm:text-sm text-white justify-center items-center flex mb-3 sm:mb-4">
            Atau
          </p>
          <Btn
            bgColor="transparent"
            textColor="#FFFFFF"
            borderColor="#747775"
            btnWidth="w-full"
            btnHeight="h-10 sm:h-12"
            rounded="rounded-full"
            className="text-sm sm:text-base hover:bg-gray-800 transition duration-300"
            onClick={handleGoogleLogin}
          >
            <img
              src={google}
              alt="Google logo"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            />
            Masuk dengan Google
          </Btn>
        </div>
      </Card>
    </div>
  );
}

export default Index;
