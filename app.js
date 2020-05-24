const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 5000

const path = require('path')
var dir = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(dir));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/my-blog', { useNewUrlParser: true }).
catch(error => handleError(error));
// Routers
const user = require('./routers/UserRouter');
const setting = require('./routers/SettingRouter');
const blog = require('./routers/BlogRouter');

// Route Lists
app.get('/', (req, res) => res.send('Backend!'))
app.use('/api/user', user);
app.use('/api/setting', setting);
app.use('/api/blogs', blog);

// if(process.env.NODE_ENV == "production"){
//     app.use(express.static('build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build' ,'index.html'))
//     })
// }


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
