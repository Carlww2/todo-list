// Main packages
const chalk = require('chalk')
const express = require('express')
const cors = require('cors')

// DB connection
require('./db/connection')

// Routers
const taskRouter = require('./routers/task')

// Express config
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', taskRouter)

// Handle production 
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public'))

    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}

const port = process.env.PORT

app.listen(port, () => console.log(chalk.blue(`> Starting server on port ${port}!`)))