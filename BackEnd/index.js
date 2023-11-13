import express from "express"
import cors from 'cors'

const port = 3000;

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send("Hello World")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
