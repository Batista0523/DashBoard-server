import db from "../DB/db.config";
export interface SavedCities {
  id?: number;
  user_id?: number;
  city_name?: string;
  country?: string;
  created_at?: Date;
}

const getAllSavedCities = async (user_id: number): Promise<SavedCities[]> => {
  try {
    const allSavedCities = await db.any<SavedCities>(
      "SELECT * FROM saved_cities WHERE user_id = $1",
      [user_id]
    );
    return allSavedCities;
  } catch (error) {
    throw new Error("Error fetching all saved cities:" + error);
  }
};

const getOneSavedCity = async (
  id: number,
  user_id: number
): Promise<SavedCities | null> => {
  try {
    const oneSavedCity = await db.oneOrNone<SavedCities>(
      "SELECT * FROM saved_cities WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    return oneSavedCity;
  } catch (error) {
    throw new Error("Error fetching one saved city:" + error);
  }
};

const createSavedCity = async (
  savedCity: SavedCities
): Promise<SavedCities | null> => {
  try {
    const createdSavedCity = await db.oneOrNone<SavedCities>(
      "INSERT INTO saved_cities (user_id,city_name,country) VALUES ($1,$2,$3)RETURNING *",
      [savedCity.user_id, savedCity.city_name, savedCity.country ?? null]
    );
    return createdSavedCity;
  } catch (error) {
    throw new Error("Error creating city:" + error);
  }
};

const updateSavedCity = async (
  id: number,
  user_id: number,
  saved_cities: SavedCities
): Promise<SavedCities | null> => {
  try {
    const updatedSavedCity = await db.oneOrNone<SavedCities>(
      `UPDATE saved_cities SET city_name=$1, country=$2 WHERE id = $3 AND user_id=$4 RETURNING *`,
      [saved_cities.city_name, saved_cities.country ?? null, id, user_id]
    );
    return updatedSavedCity;
  } catch (error) {
    throw new Error("Error updating city:" + error);
  }
};

const deleteSavedCity = async (
  id: number,
  user_id: number
): Promise<boolean> => {
  try {
    const deletedSaveCity = await db.result<SavedCities>(
      `DELETE FROM saved_cities WHERE id = $1 AND user_id=$2 RETURNING *`,
      [id, user_id]
    );
    return deletedSaveCity.rowCount > 0;
  } catch (error) {
    throw new Error("Error deleting that city:" + error);
  }
};

export {
  getAllSavedCities,
  getOneSavedCity,
  updateSavedCity,
  createSavedCity,
  deleteSavedCity,
};
