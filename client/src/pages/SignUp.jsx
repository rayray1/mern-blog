import { Link } from "react-router-dom";
import { Button, Label } from "flowbite-react";
import { TextInput } from "flowbite-react";

export default function SignUp() {
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
					<form className='flex flex-col gap-4'>
						<div>
							<Label value='Username' />
							<TextInput type='text' placeholder='Username' id='username' />
						</div>
						<div>
							<Label value='Email' />
							<TextInput type='text' placeholder='Email' id='email' />
						</div>
						<div>
							<Label value='Password' />
							<TextInput type='text' placeholder='Password' id='password' />
						</div>
						<Button gradientDuoTone='purpleToPink' type='submit'>
							Sign up
						</Button>
					</form>
					<div class='flex gap-2 text-sm mt-5'>
						<span>Have an account?</span>
						<Link to='/sign-in' className='text-blue-500 hover:underline'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
