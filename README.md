[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/c2TqJtWC)

![](http://images.restapi.co.za/pvt/Noroff-64.png)
# Noroff
# Back-end Development Year 1
### Databases - Course Assignment 1 <sup>V4</sup>

Animal adoption system with MySQL database, authentication, and CRUD operations.

---

# Application Installation and Usage Instructions

1. Install dependencies:
```bash
npm install
```

2. Create database tables:
```bash
node config/sync_db.js
```

3. Start application:
```bash
npm start
```
Or for development:
```bash
npm run dev
```

4. Navigate to `http://localhost:3000`
5. Click "Populate Database" button
6. Login with:
   - Member: `User` / `user1234`
   - Admin: `Admin` / `admin1234`

# Environment Variables

- `PORT` - Server port (default: 3000)

# Additional Libraries/Packages

- `express` - Web framework
- `sequelize` - ORM for MySQL
- `mysql2` - MySQL driver
- `passport` / `passport-local` - Authentication
- `express-session` - Session management
- `ejs` - Templating engine
- `nodemon` - Dev auto-restart (devDependency)

# NodeJS Version Used

v22.20.0

# DATABASE
```sql
CREATE DATABASE adoptiondb;
```

## Database Schema

Entity-Relationship diagram showing table structure and relationships:

![Database Diagram](public/img/database_diagram.png)

The database follows 3rd Normal Form (3NF) with the following tables:
- `animals` - Animal information
- `species` - Animal species (1:N with animals)
- `sizes` - Size categories (1:N with animals)
- `temperaments` - Temperament types (M:N with animals)
- `animal_temperaments` - Junction table for animals and temperaments
- `users` - User accounts with roles (admin/member)
- `adoptions` - Adoption records (1:1 with animals, N:1 with users)


# DATABASEACCESS
```sql
CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';
GRANT ALL PRIVILEGES ON adoptiondb.* TO 'dabcaowner'@'localhost';
FLUSH PRIVILEGES;
```