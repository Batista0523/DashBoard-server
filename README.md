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

    subgraph Server[Node + TypeScript Application]
        API --> Auth[JWT Auth Middleware]

        API --> UsersCtrl[Users Controller]
        API --> CitiesCtrl[Saved Cities Controller]
        API --> CryptoCtrl[Saved Cryptos Controller]
        API --> MoviesCtrl[Saved Movies Controller]
        API --> TeamsCtrl[Sports Teams Controller]
        API --> SettingsCtrl[User Settings Controller]

        UsersCtrl --> UsersQuery[Users DB Queries]
        CitiesCtrl --> CitiesQuery[Cities DB Queries]
        CryptoCtrl --> CryptoQuery[Cryptos DB Queries]
        MoviesCtrl --> MoviesQuery[Movies DB Queries]
        TeamsCtrl --> TeamsQuery[Teams DB Queries]
        SettingsCtrl --> SettingsQuery[Settings DB Queries]
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

sequenceDiagram
    participant C as Client
    participant A as Auth Controller
    participant DB as PostgreSQL
    participant JWT as Token Service

    C->>A: POST /auth/login (email + password)
    A->>DB: Verify user exists
    DB-->>A: User record
    A->>A: Compare bcrypt password
    A->>JWT: Generate signed token
    JWT-->>A: JWT Token
    A-->>C: 200 OK (token + user)
    
    C->>API: Any protected route with Authorization: Bearer <token>
    API->>JWT: Validate Token
    JWT-->>API: Payload (user_id, role)
    API-->>C: Protected Data

erDiagram

    dashboards_users {
        int id PK
        text full_name
        text email
        text password
        text role
        timestamp created_at
    }

    saved_cities {
        int id PK
        int user_id FK
        text city_name
        text country
        timestamp created_at
    }

    saved_cryptos {
        int id PK
        int user_id FK
        text coin_id
        text coin_symbol
        text coin_name
        timestamp created_at
    }

    saved_movies {
        int id PK
        int user_id FK
        int movie_id
        text title
        text poster_path
        timestamp created_at
    }

    saved_sports_teams {
        int id PK
        int user_id FK
        text team_id
        text team_name
        text league
        timestamp created_at
    }

    user_settings {
        int id PK
        int user_id FK
        text theme
        text language
        text default_dashboard
        timestamp created_at
    }

    dashboards_users ||--o{ saved_cities : has
    dashboards_users ||--o{ saved_cryptos : has
    dashboards_users ||--o{ saved_movies : has
    dashboards_users ||--o{ saved_sports_teams : has
    dashboards_users ||--o{ user_settings : has
