// redis-client.js
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient(process.env.REDIS_URL || 'redis://cache');

client.on('connect', ()=>{
    console.log('Redis running on: '+process.env.REDIS_URL)});
client.on("error", (err) => {
    console.log("Error " + err)
});
module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  redis_client: client
};