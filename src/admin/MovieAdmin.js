import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import ImageSelector from "../data/ImageSelector";

const MovieAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("topRating");
  const [movies, setMovies] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    hoverImage: "",
    alt: "",
    ageRating: "",
    duration: "",
    genre: "",
    newEpisode: false,
    top10: false,
    imageWidth: "100%",
    imageHeight: "190px",
    bgColor: "bg-[#181A1C]",
    textColor: "text-white",
    titleSize: "text-lg",
    cardClassName: "max-w-[180px] sm:max-w-[280px]",
  });

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movieData")) || {
      topRating: [],
      trending: [],
      newRelease: [],
    };
    setMovies(savedMovies);
  }, []);

  const currentMovies = movies[activeTab] || [];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (name, value) => {
    const img = new Image();
    img.onload = () => {
      setFormData({
        ...formData,
        [name]: value,
        imageWidth: img.width ? `${img.width}px` : "250px",
        imageHeight: img.height ? `${img.height}px` : "400px",
      });
    };
    img.src = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      ...formData,
      id: Date.now(),
      image: formData.image || "default_image_url",
      hoverImage: formData.hoverImage || "default_hover_image_url",
      imageWidth: formData.imageWidth || "250px",
      imageHeight: formData.imageHeight || "400px",
      cardClassName: "max-w-[180px] sm:max-w-[280px]",
    };

    if (editingId) {
      const updatedMovies = {
        ...movies,
        [activeTab]: currentMovies.map((movie) =>
          movie.id === editingId ? newMovie : movie
        ),
      };
      setMovies(updatedMovies);
      localStorage.setItem("movieData", JSON.stringify(updatedMovies));
      setEditingId(null);
    } else {
      const updatedMovies = {
        ...movies,
        [activeTab]: [...currentMovies, newMovie],
      };
      setMovies(updatedMovies);
      localStorage.setItem("movieData", JSON.stringify(updatedMovies));
    }

    setFormData({
      title: "",
      image: "",
      hoverImage: "",
      alt: "",
      ageRating: "",
      duration: "",
      genre: "",
      newEpisode: false,
      top10: false,
      imageWidth: "100%",
      imageHeight: "140px",
      bgColor: "bg-[#181A1C]",
      textColor: "text-white",
      titleSize: "text-lg",
      cardClassName: "max-w-[180px] sm:max-w-[280px]",
    });
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setFormData(movie);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const updatedMovies = {
        ...movies,
        [activeTab]: currentMovies.filter((movie) => movie.id !== id),
      };
      setMovies(updatedMovies);
      localStorage.setItem("movieData", JSON.stringify(updatedMovies));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold">Movie Management</h1>
        </div>
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "topRating"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("topRating")}
          >
            Top Rating
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "trending"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "newRelease"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("newRelease")}
          >
            New Release
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                {activeTab === "topRating"
                  ? "Top Rating Movies"
                  : activeTab === "trending"
                  ? "Trending Movies"
                  : "New Release Movies"}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Title</th>
                      <th className="py-2 px-4 border-b">Genre</th>
                      <th className="py-2 px-4 border-b">Rating</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMovies.length > 0 ? (
                      currentMovies.map((movie) => (
                        <tr key={movie.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{movie.title}</td>
                          <td className="py-2 px-4 border-b">{movie.genre}</td>
                          <td className="py-2 px-4 border-b">
                            {movie.ageRating}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleEdit(movie)}
                              className="text-blue-600 hover:text-blue-800 mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(movie.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-4 px-4 border-b text-center text-gray-500"
                        >
                          No movies found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit Movie" : "Add New Movie"}
              </h2>
              <form onSubmit={handleSubmit}>
                <ImageSelector
                  value={formData.image}
                  onChange={(value) => handleImageChange("image", value)}
                  label="Image URL"
                />
                <ImageSelector
                  value={formData.hoverImage}
                  onChange={(value) => handleImageChange("hoverImage", value)}
                  label="Hover Image URL"
                />
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    name="alt"
                    value={formData.alt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Age Rating</label>
                  <input
                    type="text"
                    name="ageRating"
                    value={formData.ageRating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    name="newEpisode"
                    checked={formData.newEpisode}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700">New Episode</label>
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    name="top10"
                    checked={formData.top10}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700">Top 10</label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                  {editingId ? (
                    <>
                      <FaEdit className="mr-2" /> Update Movie
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" /> Add Movie
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: "",
                        image: "",
                        hoverImage: "",
                        alt: "",
                        ageRating: "",
                        duration: "",
                        genre: "",
                        newEpisode: false,
                        top10: false,
                      });
                    }}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdmin;
