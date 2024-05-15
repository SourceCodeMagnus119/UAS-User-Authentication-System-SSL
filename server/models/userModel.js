const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

module.exports.userSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password)
});

module.exports = mongoose.model("User", userSchema);