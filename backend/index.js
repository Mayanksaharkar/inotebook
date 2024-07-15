const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
connectToMongo();

const app = express();
app.use(cors())
// app.get('/' , (req ,res)=>{
//     res.send("hello");
// })
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const PORT = 5000;
app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT ", PORT)
})
