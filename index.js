const express = require('express')
const sequelize = require('./config/database');
const cors = require('cors');

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

const auth_route = require('./routes/auth');
const employer_route = require('./routes/employers');
const employer_role = require('./routes/role-employer')
const basePath = '/api/v1';

app.use(basePath,auth_route);
app.use(basePath,employer_route);
app.use(basePath,employer_role);
// อ่านไฟล์ทั้งหมดจากไดเรกทอรี routes และทำการ require
// fs.readdirSync(routesPath).forEach((file) => {
//     const route = require(path.join(routesPath, file));
//     app.use(basePath, route);
// });
 
app.listen(port, async () => {
    // await sequelize.sync();
    console.log(`Server running on http://localhost:${port}`);
});

