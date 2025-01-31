import { app } from './app.js'
const port = 5500

app.listen(port, (err) => {
    if (!err) {
        console.log(`Example app listening on port ${port}!`)
    }
})