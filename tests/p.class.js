const enc = require('bcrypt');

// enc.hash('thisisanoppass', 10, function(err, hash) {
//     console.log(hash)
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });


const hash = '$2b$10$hp9OwfBlerH2xiECACwPMu9s8eQ4ulW0FKM.QNqVqeQWB/PvFphDW'

enc.compare('thisisanoppass', hash, (err, res) => console.log(res))
enc.hash('thisisanoppass', 10, (err, hash) => console.log(hash));