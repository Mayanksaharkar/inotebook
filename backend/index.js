const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
connectToMongo();

const app = express()
const corsOptions = {
    origin: "https://inotebook-frontend-h86b.onrender.com/" // frontend URI (ReactJS)
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("hello");
})
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const PORT = 5000;
app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT ", PORT)
})
