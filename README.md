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

## How to Run Locally

### 1. Navigate into project folder
```
cd newest_kanban_demo3
```

---

### 2. Install Dependencies
```
npm install
```

---

### 3. Setup MySQL Database

- Open MySQL Workbench
- Create a database:
```
CREATE DATABASE matadorboard;
```

- Import the provided SQL backup:
```
sql-backups/matadorboard_backup_april14.sql
```

---

### 4. Configure Database Connection

Edit the file:
```
db.js
```

Update:
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'YOUR_MYSQL_USERNAME',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'matadorboard'
});
```

---

### 5. Run the Application
```
npm run dev
```

---

## 6. Access the Application

- Frontend (React/Vite):
```
http://localhost:5173/
```

- Backend API (Express/Node):
```
http://localhost:5001/
```

---

## Notes
- `.env` file not required
- If you run into any node module issues:
```
cd newest_kanban_demo3
rm -rf node_modules
npm install
```
