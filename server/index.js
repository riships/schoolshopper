import { app } from './app.js'
const port = 3000 || 3001 || 3002 || 3003

app.listen(port, () => console.log(`Example app listening on port ${port}!`))