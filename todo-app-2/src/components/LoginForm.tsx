// react imports
import { useRef } from 'react';

// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { logInUsers } from '../utilities/firebaseUtilities';

const LoginForm: React.FC = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = () => {
		logInUsers(emailRef.current?.value ?? '', passwordRef.current?.value ?? '');

		if (emailRef.current && passwordRef.current) {
			emailRef.current.value = '';
			passwordRef.current.value = '';
		}
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title className='text-center w-100'>Log in</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<BootstrapForm className='py-0'>
					<BootstrapForm.Group className='pb-3'>
						<BootstrapForm.Label>Email address</BootstrapForm.Label>
						<BootstrapForm.Control
							type='email'
							placeholder='Enter email'
							ref={emailRef}
							required
						/>
					</BootstrapForm.Group>

					<BootstrapForm.Group>
						<BootstrapForm.Label>Password</BootstrapForm.Label>
						<BootstrapForm.Control
							type='password'
							placeholder='Enter pasword'
							ref={passwordRef}
							required
						/>
					</BootstrapForm.Group>
				</BootstrapForm>
				<div className='d-flex justify-content-center pt-4'>
					<Button
						variant='dark'
						onClick={handleLogin}
					>
						Log in
					</Button>
				</div>
			</Modal.Body>
		</>
	);
};

export default LoginForm;
