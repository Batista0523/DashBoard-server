# 🚀 Dashboard Backend API  
### A TypeScript + Node.js + PostgreSQL REST API with JWT Authentication

This project powers a customizable **user dashboard system**, allowing users to save and manage:

- 🌆 Cities  
- 🪙 Cryptocurrencies  
- 🎬 Movies  
- 🏆 Sports Teams  
- ⚙️ User Settings  

Built with a **modular, scalable architecture**, ideal for production environments and multi-dashboard frontends.



# 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend Runtime | **Node.js + TypeScript** |
| Framework | **Express.js** |
| Database | **PostgreSQL** |
| ORM / Query Layer | **pg-promise** |
| Security | **JWT Auth + Bcrypt Hashing** |
| Tools | ts-node-dev, dotenv |
| API Style | REST |

---

# 🏗️ Architecture Diagram (Mermaid.js)

```mermaid
flowchart TD
    Client[Frontend / Postman] --> API[Express Server]

    subgraph Server[Node + TypeScript App]
        API --> Auth[JWT Auth Middleware]
        API --> UsersCtrl[Users Controller]
        API --> CitiesCtrl[Saved Cities Controller]
        API --> CryptoCtrl[Saved Crypto Controller]
        API --> MoviesCtrl[Saved Movies Controller]
        API --> TeamsCtrl[Saved Sports Teams Controller]
        API --> SettingsCtrl[User Settings Controller]

        UsersCtrl --> UsersQuery[Users SQL Queries]
        CitiesCtrl --> CitiesQuery[Cities SQL Queries]
        CryptoCtrl --> CryptoQuery[Crypto SQL Queries]
        MoviesCtrl --> MoviesQuery[Movies SQL Queries]
        TeamsCtrl --> TeamsQuery[Teams SQL Queries]
        SettingsCtrl --> SettingsQuery[Settings SQL Queries]
    end

    subgraph DB[PostgreSQL Database]
        UsersTable[Table: dashboards_users]
        CitiesTable[Table: saved_cities]
        CryptoTable[Table: saved_cryptos]
        MoviesTable[Table: saved_movies]
        TeamsTable[Table: saved_sports_teams]
        SettingsTable[Table: user_settings]
    end

    UsersQuery --> UsersTable
    CitiesQuery --> CitiesTable
    CryptoQuery --> CryptoTable
    MoviesQuery --> MoviesTable
    TeamsQuery --> TeamsTable
    SettingsQuery --> SettingsTable
