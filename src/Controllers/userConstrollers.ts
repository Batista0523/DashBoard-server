import express, { Request, Response } from "express";
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from "../Queries/dashboards_users";

const Users = express.Router();

Users.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      success: true,
      payload: users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

Users.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getOneUser(Number(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: user,
    });
  } catch (error) {
    console.error("Error fetching one user:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

Users.post("/", async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const createdUser = await createUser(userData);

    return res.status(201).json({
      success: true,
      payload: createdUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

Users.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await updateUser(Number(id), userData);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

Users.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(Number(id));
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default Users;
