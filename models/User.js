const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
const userSchema = new Schema({
  userName: String,
  password: String,
  favorites: Array
});

const User = mongoose.model("User", userSchema);

=======
const userSchema = new Schema(
  {
    username: String,
    password: String
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
>>>>>>> schemas
module.exports = User;
