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
