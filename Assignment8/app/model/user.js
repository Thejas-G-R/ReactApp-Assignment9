const mongoose = require("mongoose");
// module.exports = mongoose.model("users", {
//     emailId: { type: String, default: "" },
//     passwordHash: { type: String, default: "" }
// })

var Schema = mongoose.Schema;

var User = new Schema({
    emailId: { type: String, unique: true },
    passwordHash: String

    // _id: mongoose.Schema.ObjectId
});

module.exports = mongoose.model('User', User);