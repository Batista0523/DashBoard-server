import db from "../DB/db.config";

export interface DashboardUser {
  id?: number;
  full_name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date;
}

const getAllUsers = async (): Promise<DashboardUser[]> => {
  try {
    const allUsers = await db.any<DashboardUser>(
      "SELECT * FROM dashboards_users"
    );
    return allUsers;
  } catch (error) {
    throw new Error("Error fetching all users:" + error);
  }
};

const getOneUser = async (id: number): Promise<DashboardUser | null> => {
  try {
    const oneUser = await db.oneOrNone<DashboardUser>(
      "SELECT * FROM dashboards_users WHERE id = $1 ",
      [id]
    );
    return oneUser;
  } catch (error) {
    throw new Error("Error fetching one user:" + error);
  }
};

const createUser = async (
  user: DashboardUser
): Promise<DashboardUser | null> => {
  try {
    const createdUser = await db.oneOrNone<DashboardUser>(
      "INSERT INTO dashboards_users (full_name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *",
      [user.full_name, user.email, user.password, user.role || "user"]
    );
    return createdUser;
  } catch (error) {
    throw new Error("Error creating user:" + error);
  }
};

const updateUser = async (
  id: number,
  user: DashboardUser
): Promise<DashboardUser | null> => {
  try {
    const updatedUser = await db.oneOrNone<DashboardUser>(
      `UPDATE dashboards_users SET full_name = $1, email = $2, password = $3, role =$4 WHERE id = $5 RETURNING *`,
      [user.full_name, user.email, user.password, user.role || "user", id]
    );
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user:" + error);
  }
};

const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const deletedUser = await db.result<DashboardUser>(
      "DELETE FROM dashboards_users WHERE id= $1 RETURNING *",
      [id]
    );
    return deletedUser.rowCount > 0;
  } catch (error) {
    throw new Error("Error deleting user:" + error);
  }
};
const getUserByEmail = async (email: string): Promise<DashboardUser | null> => {
  try {
    const user = await db.oneOrNone<DashboardUser>(
      "SELECT * FROM dashboards_users WHERE email = $1",
      [email]
    );
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email: " + error);
  }
};
export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
