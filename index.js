const express = require("express")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerJSDocs = YAML.load("./api.yaml")
const fileUpload = require("express-fileupload")

const app = express()
app.use(fileUpload())
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

let users = [
  {
    id: 1,
    name: "Segun Emmanuel",
  },
  {
    id: 2,
    name: "Janet Adewumi",
  },
  {
    id: 3,
    name: "Janet Emmanuel",
  },
]

app.get("/string", (req, res) => {
  res.status(200).send("This is a string")
})

app.get("/user", (req, res) => {
  const userInfo = {
    id: 1,
    name: "Segun Emmanuel",
  }
  res.status(200).send(userInfo)
})

app.get("/users", (req, res) => {
  res.status(200).send(users)
})

app.get("/users/:id", (req, res) => {
  const obj = users.find((x) => x.id === parseInt(req.params.id))
  res.status(200).send(obj)
})

app.post("/create", (req, res) => {
  users = [req.body, ...users]
  res.send(users)
})

app.get("/usersQuery", (req, res) => {
  const obj = users.find((x) => x.id === parseInt(req.query.id))
  res.status(200).send(obj)
})

app.post("/upload", (req, res) => {
  const file = req.files.file
  let path = __dirname + "/upload/" + "file" + Date.now() + ".png"
  file.mv(path, (err) => {
    res.send("okay")
  })
})

app.listen(4000, () => {
  console.log("server is running now")
})
