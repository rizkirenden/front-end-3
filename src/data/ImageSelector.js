import { useState } from "react";
import { FaImage } from "react-icons/fa";
import img1 from "../assets/Type=22.png";
import img2 from "../assets/Type=11.png";
import img3 from "../assets/Type=21.png";
import img4 from "../assets/image 242.png";
import img5 from "../assets/Number=14.png";
import img6 from "../assets/Number=25.png";
import img7 from "../assets/Number=29.png";
import img8 from "../assets/Number=9.png";
import img9 from "../assets/Number=12.png";
import img10 from "../assets/Number=7.png";
import img11 from "../assets/Number=16.png";
import img12 from "../assets/Number=30.png";
import img13 from "../assets/Number=10.png";
import img14 from "../assets/Number=6.png";
import img15 from "../assets/Number=26.png";
import img16 from "../assets/Number=31.png";
import img17 from "../assets/Number=23.png";
import img18 from "../assets/Number=27.png";
import img19 from "../assets/Number=13.png";
import img20 from "../assets/Type=11.png";
import img21 from "../assets/Type=21.png";
import img22 from "../assets/image 242.png";
import img23 from "../assets/image 223.png";
import img24 from "../assets/image 226.png";
import img25 from "../assets/Type=7.png";
import img26 from "../assets/image 230.png";
import img27 from "../assets/image 243.png";
import img28 from "../assets/image 224.png";
import img29 from "../assets/Type=6.png";
import img30 from "../assets/Type=14.png";
import img31 from "../assets/Type=24.png";
import img32 from "../assets/Type=30.png";
import img33 from "../assets/Type=22.png";
import img34 from "../assets/image 227.png";
import img35 from "../assets/Number=17.png";
import img36 from "../assets/Type=1.png";
const availableImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
];

const ImageSelector = ({ value, onChange, label }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Pilih gambar dari assets"
        />
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
        >
          <FaImage />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">Pilih Gambar</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableImages.map((imgPath, index) => (
                <div
                  key={index}
                  className={`border-2 rounded p-1 cursor-pointer ${
                    value === imgPath ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => {
                    onChange(imgPath);
                    setShowModal(false);
                  }}
                >
                  <img
                    src={imgPath}
                    alt="Preview"
                    className="object-contain"
                    style={{
                      width: "auto",
                      height: "150px",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                  <div className="text-xs truncate mt-1">{imgPath}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
