import express, { Response } from "express";
import { AuthRequest, authRequired } from "../Middleware/authRequest";

import {
  getAllSavedMovies,
  getOneSavedMovie,
  deleteSavedMovie,
  createSavedMovie,
  updateSaveMovie,
} from "../Queries/saved_movies";

const SavedMovie = express.Router();

SavedMovie.get("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user!.id;
    const allSavedMovie = await getAllSavedMovies(user_id);
    res.status(200).json({ success: true, payload: allSavedMovie });
  } catch (error) {
    console.error("Error internal", error);
    res.status(500).json({ success: false, error: "Error internal" });
  }
});


SavedMovie.get("/:id", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;

    const oneSavedMovie = await getOneSavedMovie(Number(id), user_id);

    if (!oneSavedMovie) {
      return res.status(404).json({ success: false, error: "Movie Not Found" });
    }

    res.status(200).json({ success: true, payload: oneSavedMovie });
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


SavedMovie.post("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { movie_id, title, poster_path } = req.body;
    const user_id = req.user!.id;

    const createdSavedMovie = await createSavedMovie({
      user_id,
      movie_id,
      title,
      poster_path,
    });

    return res.status(201).json({ success: true, payload: createdSavedMovie });

  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

SavedMovie.put("/:id", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;
    const movieData = req.body;

    const updatedSavedMovie = await updateSaveMovie(
      Number(id),
      user_id,
      movieData
    );

    if (!updatedSavedMovie) {
      return res.status(404).json({ success: false, error: "Movie Not Found" });
    }

    return res.status(200).json({ success: true, payload: updatedSavedMovie });

  } catch (error) {
    console.error("Internal Server Error", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});


SavedMovie.delete("/:id", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;

    const deletedSavedMovie = await deleteSavedMovie(Number(id), user_id);

    if (!deletedSavedMovie) {
      return res.status(404).json({ success: false, error: "Movie Not Found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Internal Server Error");
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default SavedMovie;
