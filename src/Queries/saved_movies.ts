import db from "../DB/db.config";

export interface savedMovies {
  id?: number;
  user_id?: number;
  movie_id?: number;
  title?: string;
  poster_path?: string;
  created_at?: Date;
}
const getAllSavedMovies = async (user_id: number): Promise<savedMovies[]> => {
  try {
    const allSavedMovies = await db.any<savedMovies>(
      "SELECT * FROM saved_movies WHERE user_id = $1",
      [user_id]
    );
    return allSavedMovies;
  } catch (error) {
    throw new Error("Error fetching all saved movies:" + error);
  }
};

const getOneSavedMovie = async (
  id: number,
  user_id: number
): Promise<savedMovies | null> => {
  try {
    const oneSavedMovie = await db.oneOrNone<savedMovies>(
      "SELECT * FROM saved_movies WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    return oneSavedMovie;
  } catch (error) {
    throw new Error("Error fetching one saved movie:" + error);
  }
};

const updateSaveMovie = async (
  id: number,
  user_id: number,
  movie: savedMovies
): Promise<savedMovies | null> => {
  try {
    const updatedSavedMovie = await db.oneOrNone<savedMovies>(
      `UPDATE saved_movies SET movie_id = $1, title = $2, poster_path = $3 WHERE id =$4 AND user_id =$5 RETURNING *`,
      [
        movie.movie_id,
        movie.title ?? null,
        movie.poster_path ?? null,
        id,
        user_id,
      ]
    );
    return updatedSavedMovie;
  } catch (error) {
    throw new Error("Error updating saved movie:" + error);
  }
};
const createSavedMovie = async (
  movie: savedMovies
): Promise<savedMovies | null> => {
  try {
    const createdSavedMovie = await db.oneOrNone<savedMovies>(
      `INSERT INTO saved_movies (user_id, movie_id, title, poster_path)
       VALUES($1, $2, $3, $4) RETURNING *`,
      [
        movie.user_id,
        movie.movie_id,
        movie.title ?? null,
        movie.poster_path ?? null,
      ]
    );
    return createdSavedMovie;
  } catch (error) {
    throw new Error("Error creating saved movie:" + error);
  }
};

const deleteSavedMovie = async (
  id: number,
  user_id: number
): Promise<boolean> => {
  try {
    const deletedSavedMovie = await db.result<savedMovies>(
      "DELETE FROM saved_movies WHERE id =$1 AND user_id =$2",
      [id, user_id]
    );
    return deletedSavedMovie.rowCount > 0;
  } catch (error) {
    throw new Error("Error deleting saved movie:" + error);
  }
};

export {
  getAllSavedMovies,
  getOneSavedMovie,
  deleteSavedMovie,
  createSavedMovie,
  updateSaveMovie,
};
