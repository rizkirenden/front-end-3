import { FIRESTORE_BASE_URL } from "./firebase";

// Helper function to format data for Firestore
const formatForFirestore = (data) => {
  const fields = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      fields[key] = { nullValue: null };
    } else if (typeof value === "string") {
      fields[key] = { stringValue: value };
    } else if (typeof value === "number") {
      fields[key] = { integerValue: value };
    } else if (typeof value === "boolean") {
      fields[key] = { booleanValue: value };
    } else if (Array.isArray(value)) {
      fields[key] = {
        arrayValue: {
          values: value.map((item) => formatForFirestore(item).fields),
        },
      };
    } else if (typeof value === "object") {
      fields[key] = { mapValue: { fields: formatForFirestore(value).fields } };
    }
  });
  return { fields };
};

// Helper function to parse data from Firestore
const parseFromFirestore = (document) => {
  const result = {};
  if (!document.fields) return result;

  Object.entries(document.fields).forEach(([key, value]) => {
    const type = Object.keys(value)[0];
    if (type === "mapValue") {
      result[key] = parseFromFirestore(value[type]);
    } else if (type === "arrayValue") {
      result[key] = (value[type].values || []).map((item) =>
        parseFromFirestore({ fields: item })
      );
    } else {
      result[key] = value[type];
    }
  });

  return {
    id: document.name.split("/").pop(),
    ...result,
  };
};

// Fungsi CRUD
const getMovies = async (collectionName) => {
  try {
    const response = await fetch(`${FIRESTORE_BASE_URL}/${collectionName}`);
    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    if (!data.documents) return [];

    return data.documents.map(parseFromFirestore);
  } catch (error) {
    console.error(`Error getting movies from ${collectionName}:`, error);
    throw error;
  }
};

const createMovie = async (collectionName, movieData) => {
  try {
    const response = await fetch(`${FIRESTORE_BASE_URL}/${collectionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatForFirestore(movieData)),
    });

    if (!response.ok) throw new Error("Failed to create movie");

    const data = await response.json();
    return parseFromFirestore(data);
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

const updateMovie = async (collectionName, docId, movieData) => {
  try {
    if (!docId) throw new Error("Document ID is required");

    // Create updateMask with all field paths
    const fieldPaths = Object.keys(movieData).filter(
      (key) => movieData[key] !== undefined
    );

    const response = await fetch(
      `${FIRESTORE_BASE_URL}/${collectionName}/${docId}?updateMask.fieldPaths=${fieldPaths.join(
        "&updateMask.fieldPaths="
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatForFirestore(movieData)),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update movie: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

const deleteMovie = async (collectionName, docId) => {
  try {
    const response = await fetch(
      `${FIRESTORE_BASE_URL}/${collectionName}/${docId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Failed to delete movie");
    return true;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Pilih SALAH SATU dari dua opsi ekspor berikut:

// Opsi 1: Named exports (direkomendasikan)
export { getMovies, createMovie, updateMovie, deleteMovie };

// Opsi 2: Default export (gunakan salah satu saja)
// const firestoreCrud = {
//   getMovies,
//   createMovie,
//   updateMovie,
//   deleteMovie
// };
// export default firestoreCrud;
