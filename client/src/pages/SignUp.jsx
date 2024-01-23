import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value.trim()
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!formData.username || !formData.email || !formData.password) {
			return setErrorMessage("Please fill out all the fields");
		}

		try {
			setLoading(true);
			setErrorMessage(null);
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});
			const data = await response.json();
			if (data.success === false) {
				return setErrorMessage(data.message);
			}
			setLoading(false);
			if (response.ok) {
				navigate("/sign-in");
			}
		} catch (err) {
			setErrorMessage(err.message);
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen mt-20'>
			<div className='flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center'>
				{/* left side */}
				<div className='flex-1'>
					<Link to='/' className='text-4xl font-bold dark:text-white'>
						<span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
							Anonymous
						</span>
						Blog
					</Link>
					<p className='mt-5 text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
						aspernatur ducimus, dicta odit nobis asperiores dignissimos
						voluptates consequatur.
					</p>
				</div>
				<div className='flex-1'>
					{/* right side */}
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<div>
							<Label value='Username' />
							<TextInput
								type='text'
								placeholder='Username'
								id='username'
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label value='Email' />
							<TextInput
								type='email'
								placeholder='Email'
								id='email'
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label value='Password' />
							<TextInput
								type='password'
								placeholder='Password'
								id='password'
								onChange={handleChange}
							/>
						</div>
						<Button
							gradientDuoTone='purpleToPink'
							type='submit'
							disabled={loading}
						>
							{loading ? (
								<>
									<Spinner size='sm' />
									<span className='pl-2'>Loading...</span>
								</>
							) : (
								"Sign Up"
							)}
						</Button>
						<OAuth />
					</form>
					<div className='flex gap-2 mt-5 text-sm'>
						<span>Have an account?</span>
						<Link to='/sign-in' className='text-blue-500 hover:underline'>
							Login
						</Link>
					</div>

					{errorMessage && (
						<Alert className='mt-5' color='failure'>
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
}
