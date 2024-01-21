import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { required: true, type: String, unique: true },
		password: { required: true, type: String },
		email: { required: true, type: String, unique: true }
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
