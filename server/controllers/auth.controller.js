import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// User signup
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		password === "" ||
		email === ""
	) {
		next(errorHandler(400, "All fields are required!"));
	}

	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword
	});

	try {
		await newUser.save();
		res.status(201).json({ message: "User created successfully!" });
	} catch (err) {
		next(err);
	}
};

// User login
export const signin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || email === "" || password === "") {
		next(errorHandler(400, "All fields are required!"));
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(errorHandler(404, "User not found!"));
		}

		const isMatch = bcryptjs.compareSync(password, user.password);
		if (!isMatch) {
			return next(errorHandler(400, "Invalid credentials!"));
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});

		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true
			})
			.json(user);
	} catch (err) {
		next(err);
	}
};

// google login
export const google = async (req, res, next) => {
	const { email, name, googlePhotoUrl } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECRET
			);
			const { password, ...rest } = user._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true
				})
				.json(rest);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email,
				password: hashedPassword,
				profilePicture: googlePhotoUrl
			});
			await newUser.save();
			const token = jwt.sign(
				{ id: newUser._id, isAdmin: newUser.isAdmin },
				process.env.JWT_SECRET
			);
			const { password, ...rest } = newUser._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true
				})
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};
