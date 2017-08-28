const ws = require("nodejs-websocket")
const PORT = 8001
let clientCount = 0

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(function (conn) {
  console.log("New connection")
  clientCount += 1
  let msg = {
    type: 'enter',
    user: `user${clientCount}`,
    text: `user${clientCount} comes in`
  }
  broadcast(JSON.stringify(msg))

  conn.on("text", function (str) {
    console.log("Received " + str)
    let msg = {
      type: 'message',
      user: `user${clientCount}`,
      text: `user${clientCount} says: ${str}`
    }
    broadcast(JSON.stringify(msg))
  })

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
    let msg = {
      type: 'leave',
      user: `user${clientCount}`,
      text: `user${clientCount} leave`
    }
    broadcast(JSON.stringify(msg))
  })

  conn.on("error", function (err) {
    console.log("handle err")
    console.log(err)
  })
})

server.listen(PORT)
console.log(`webSocket server listening at port ${PORT}`)

function broadcast(str) {
  server.connections.forEach(conn => conn.sendText(str))
}
