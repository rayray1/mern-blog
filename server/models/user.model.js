import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { required: true, type: String, unique: true },
		password: { required: true, type: String },
		profilePicture: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
		},
		email: { required: true, type: String, unique: true }
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
