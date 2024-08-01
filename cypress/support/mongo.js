const { MongoClient } = require("mongodb")

const mongoUri = 'mongodb+srv://toniifernandez1:ninox@qa.vyl72n4.mongodb.net/markdb?retryWrites=true&w=majority&appName=QA'

const client = new MongoClient(mongoUri)

async function connect() {
    await client.connect()

    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect
}

module.exports = { connect, disconnect }