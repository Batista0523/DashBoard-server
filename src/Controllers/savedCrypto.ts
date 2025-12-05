import express, { Response } from "express";
import { authRequired, AuthRequest } from "../Middleware/authRequest";
import {
  getAllSavedCoin,
  getOneSavedCoin,
  deleteSavedCoin,
  createSavedCoin,
  updateSavedCoin,
} from "../Queries/saved_crypto";

const SavedCripto = express.Router();

SavedCripto.get("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user!.id;
    const allSavedCoin = await getAllSavedCoin(user_id);

    res.status(200).json({ success: true, payload: allSavedCoin });
  } catch (error) {
    console.error("Internal Error getting all coins", error);
    res.status(500).json({ success: false, error: "Error Internal" });
  }
});

SavedCripto.get(
  "/:id",
  authRequired,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user_id = req.user!.id;

      const oneSavedCoin = await getOneSavedCoin(Number(id), user_id);

      if (!oneSavedCoin) {
        return res
          .status(404)
          .json({ success: false, error: "Coin Not Found" });
      }

      res.status(200).json({ success: true, payload: oneSavedCoin });
    } catch (error) {
      console.error("Internal Error", error);
      res.status(500).json({ success: false, error: "Error internal" });
    }
  }
);

SavedCripto.post("/", authRequired, async (req: AuthRequest, res: Response) => {
  try {
    const { coin_id, coin_symbol, coin_name } = req.body;
    const user_id = req.user!.id;

    const createdSavedCoin = await createSavedCoin({
      user_id,
      coin_id,
      coin_symbol,
      coin_name,
    });

    return res.status(201).json({ success: true, payload: createdSavedCoin });
  } catch (error) {
    console.error("Internal Error", error);
    res.status(500).json({ success: false, error: "Error internal" });
  }
});

SavedCripto.delete(
  "/:id",
  authRequired,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user_id = req.user!.id;

      const deletedSavedCoin = await deleteSavedCoin(Number(id), user_id);

      if (!deletedSavedCoin) {
        return res
          .status(404)
          .json({ success: false, error: "Coin Not Found" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Internal Error", error);
      res.status(500).json({ success: false, error: "Error internal" });
    }
  }
);

SavedCripto.put(
  "/:id",
  authRequired,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user_id = req.user!.id;
      const coinData = req.body;

      const updatedCoin = await updateSavedCoin(Number(id), user_id, coinData);

      if (!updatedCoin) {
        return res
          .status(404)
          .json({ success: false, error: "Coin Not Found" });
      }
      res.status(200).json({ success: true, payload: updatedCoin });
    } catch (error) {
      console.error("Internal Error", error);
      res.status(500).json({ success: false, error: "Error internal" });
    }
  }
);

export default SavedCripto;
