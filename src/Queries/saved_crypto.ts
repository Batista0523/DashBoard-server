import db from "../DB/db.config";

export interface SavedCripto {
  id?: number;
  user_id?: number;
  coin_id?: string;
  coin_symbol?: string;
  coin_name?: string;
  created_at?: Date;
}

const getAllSavedCoin = async (user_id: number): Promise<SavedCripto[]> => {
  try {
    const allSavedCoin = await db.any<SavedCripto>(
      "SELECT * FROM saved_cryptos WHERE user_id = $1",
      [user_id]
    );
    return allSavedCoin;
  } catch (error) {
    throw new Error("Error fetching all coins:" + error);
  }
};

const getOneSavedCoin = async (
  id: number,
  user_id: number
): Promise<SavedCripto | null> => {
  try {
    const oneSavedCoin = await db.oneOrNone<SavedCripto>(
      "SELECT * FROM saved_cryptos WHERE id = $1 AND user_id = $2 ",
      [id, user_id]
    );
    return oneSavedCoin;
  } catch (error) {
    throw new Error("Error fetching one saved coin:" + error);
  }
};

const deleteSavedCoin = async (
  id: number,
  user_id: number
): Promise<boolean> => {
  try {
    const deletedSavedCoin = await db.result<SavedCripto>(
      "DELETE FROM saved_cryptos WHERE id =$1 AND user_id = $2",
      [id, user_id]
    );
    return deletedSavedCoin.rowCount > 0;
  } catch (error) {
    throw new Error("Error deleting saved coin:" + error);
  }
};

const updateSavedCoin = async (
  id: number,
  user_id: number,
  coin: SavedCripto
): Promise<SavedCripto | null> => {
  try {
    const updatedCoin = await db.oneOrNone<SavedCripto>(
      `UPDATE saved_cryptos SET coin_id=$1,coin_symbol =$2,coin_name=$3 WHERE id=$4 AND user_id = $5 RETURNING *`,
      [
        coin.coin_id,
        coin.coin_symbol ?? null,
        coin.coin_name ?? null,
        id,
        user_id,
      ]
    );
    return updatedCoin;
  } catch (error) {
    throw new Error("Error updating coin:" + error);
  }
};

const createSavedCoin = async (
  coin: SavedCripto
): Promise<SavedCripto | null> => {
  try {
    const createdSavedCoin = await db.oneOrNone<SavedCripto>(
      `INSERT INTO saved_cryptos (user_id, coin_id, coin_symbol, coin_name)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [
        coin.user_id,
        coin.coin_id,
        coin.coin_symbol ?? null,
        coin.coin_name ?? null,
      ]
    );

    return createdSavedCoin;
  } catch (error) {
    throw new Error("Error creating saved coin: " + error);
  }
};

export  {
  getAllSavedCoin,
  getOneSavedCoin,
  deleteSavedCoin,
  createSavedCoin,
  updateSavedCoin,
};
