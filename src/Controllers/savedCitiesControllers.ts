import express, { Response } from "express";
import {
  getAllSavedCities,
  getOneSavedCity,
  updateSavedCity,
  createSavedCity,
  deleteSavedCity,
} from "../Queries/saved_cities";

import { authRequired, AuthRequest } from "../Middleware/authRequest";
const SavedCity = express.Router();

SavedCity.get("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user!.id;
    const allSavedCities = await getAllSavedCities(user_id);
    res.status(200).json({ success: true, payload: allSavedCities });
  } catch (err) {
    console.error("Error internal:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

SavedCity.get("/:id", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;
    const oneSavedCity = await getOneSavedCity(Number(id), user_id);
    if (!oneSavedCity) {
      return res.status(404).json({ success: false, error: "City not found" });
    }

    res.status(200).json({ success: true, payload: oneSavedCity });
  } catch (err) {
    console.error("Error getting one saved city", err);
    res.status(500).json({ success: false, error: "internal error" });
  }
});

SavedCity.delete(
  "/:id",
  authRequired,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user_id = req.user!.id;
      const deletedSavedCity = await deleteSavedCity(Number(id), user_id);
      if (!deletedSavedCity) {
        return res
          .status(404)
          .json({ success: false, error: "City not found" });
      }
      return res.status(204).send();
    } catch (err) {
      console.error("Error deleting city", err);
      res.status(501).json({ success: false, error: "Internal server error" });
    }
  }
);

SavedCity.put("/:id", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const savedCityData = req.body;
    const { id } = req.params;
    const user_id = req.user!.id;
    const updatedSavedCity = await updateSavedCity(
      Number(id),
      user_id,
      savedCityData
    );
    if (!updatedSavedCity) {
      return res.status(404).json({ success: false, error: "City not found" });
    }
    res.status(200).json({ success: true, payload: updatedSavedCity });
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

SavedCity.post("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { city_name, country } = req.body;
    const user_id = req.user!.id;

    const createdCity = await createSavedCity({
      user_id,
      city_name,
      country,
    });
    return res.status(201).json({ success: true, payload: createdCity });
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default SavedCity;
