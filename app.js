const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 8000

//Image Upload Path
const path = require('path')
var dir = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(dir));

// Body Parameter json type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// Routers
const user = require('./routers/UserRouter');
const setting = require('./routers/SettingRouter');
const blog = require('./routers/BlogRouter');
const { dbInit } = require('./config/db.config')

// Route Lists
app.get('/', (req, res) => res.send('Welcome to Node js Backend!'))
app.use('/api/user', user);
app.use('/api/setting', setting);
app.use('/api/blogs', blog);

app.listen(port, () => {
    dbInit();
    console.log(`Example app listening at http://localhost:${port}`)
})
