# COMP490_SENR_DESGN

Professor Jeffrey A. Wiegley's Kanban Board Project

## Team Members

|       Name       | GitHub Username |         Role       |
|------------------|-----------------|--------------------|
| Mohammed Hussain |     hash2003    | Frontend Developer |
| Miguel Datoc     |     mdatoc0001  | Frontend Developer |
| Jaime Soto       |     jaimlich    | Backend Developer  |
| Henry Martinez   |     hnrymrtnz   | Backend Developer  |

## Installing Dependencies and Running the Applcation
- Install node.js (https://nodejs.org/en/download/package-manager/current)
- Run `node -v` to ensure install was successful
- Run `npm install express`
- Run `npm install dotenv`
- Run `npm install express-session`
- Run `npm install passport`
- Run `npm install passport-local`
- Run `npm install jsonwebtoken`
- Run `npm install axios`

- To run the server, run `node app.js`

## Installing Keycloak
- Follow this guide: https://medium.com/@henry.martinez.713/installing-keycloak-on-a-windows-machine-2993b96f2834
- ## Running The Project Locally (Backend, Frontend, SQL Setup)

### 1. Clone This Repo

```
git clone https://github.com/hash2003/COMP490_SENR_DESGN.git
```

---

### 2. MySQL Database Setup

#### A) Create the Database in MySQL Workbench

```
CREATE DATABASE matadorboard;
```

#### B) Import The SQL File

- Open MySQL Workbench
- Go to: Server → Data Import
- Import from Self-Contained File:
```
sql-backups/Dump20250414.sql
```
- Select the database: `matadorboard`
- Click Start Import

---

#### C) Change Database Credentials In Code

Go to:
```
backend/db.js
```

Update with your MySQL info:

```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'YOUR_MYSQL_USERNAME',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'matadorboard'
});
```

---

### 3. Running Backend (Express API)

Go into backend folder:

```
cd backend
```

Install node modules:

```
npm install
```

Run the backend server:

```
node app.js
```

Runs at:
```
http://localhost:5001
```

---

### 4. Running Frontend (React)

Go into frontend folder:

```
cd frontend
```

Install node modules:

```
npm install
```

Run frontend:

```
npm run dev
```

Runs at:
```
http://localhost:3000
```

---

### Notes:
- Backend → Node.js + Express + MySQL
- Frontend → React + Vite + Tailwind
- SQL Database → `matadorboard`
- Must run backend & frontend separately
- Must install node modules in both frontend & backend using `npm install`

