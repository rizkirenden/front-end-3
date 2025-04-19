// src/pages/admin/MovieAdmin.js
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import ImageSelector from "../data/ImageSelector";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../service/api/firestoreCrud";

const initialFormState = {
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
};

const MovieAdmin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "topRating"
  );
  const [movies, setMovies] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [activeTab]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getMovies(activeTab);
      setMovies((prev) => ({ ...prev, [activeTab]: data }));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        imageWidth: img.width ? `${img.width}px` : "250px",
        imageHeight: img.height ? `${img.height}px` : "400px",
      }));
    };
    img.src = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debug log
    try {
      setLoading(true);
      if (editingId) {
        console.log("Updating movie with ID:", editingId); // Debug log
        await updateMovie(activeTab, editingId, formData);
      } else {
        console.log("Creating new movie"); // Debug log
        await createMovie(activeTab, formData);
      }
      await fetchMovies();
      setEditingId(null);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Failed to save movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setFormData({
      ...initialFormState, // Start with default values
      ...movie, // Override with movie data
    });
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        setLoading(true);
        await deleteMovie(activeTab, id);
        await fetchMovies();
      } catch (error) {
        console.error("Failed to delete movie:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const currentMovies = movies[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
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
          {["topRating", "trending", "newRelease"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "topRating"
                ? "Top Rating"
                : tab === "trending"
                ? "Trending"
                : "New Release"}
            </button>
          ))}
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

              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
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
                            <td className="py-2 px-4 border-b">
                              {movie.title}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {movie.genre}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {movie.ageRating}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                onClick={() => handleEdit(movie)}
                                className="text-blue-600 hover:text-blue-800 mr-2"
                                disabled={loading}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(movie.id)}
                                className="text-red-600 hover:text-red-800"
                                disabled={loading}
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
              )}
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
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                {[
                  ["Alt Text", "alt"],
                  ["Age Rating", "ageRating"],
                  ["Duration", "duration"],
                  ["Genre", "genre"],
                ].map(([label, name]) => (
                  <div className="mb-4" key={name}>
                    <label className="block text-gray-700 mb-2">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                ))}

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
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : editingId ? (
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
                      setFormData(initialFormState);
                    }}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    disabled={loading}
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
