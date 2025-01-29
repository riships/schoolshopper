import { app } from './app.js'
const port = 3000 || 3001 || 3002 || 3003

app.listen(port, (err) => {
    if (!err) {
        console.log(`Example app listening on port ${port}!`)
    }
})