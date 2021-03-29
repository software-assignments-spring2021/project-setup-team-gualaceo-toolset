#!/usr/bin/env node
const server = require("./app")

const port = 3001 //port to listen to for requests

const listener = server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}