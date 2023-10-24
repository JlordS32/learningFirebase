// react imports
import { useRef } from 'react';

// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { logInUsers, signWithGoogle } from '../utilities/firebaseUtilities';

// google button
import GoogleButton from 'react-google-button';

const LoginForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = async () => {
		try {
			const loggedIn = await logInUsers(
				emailRef.current?.value ?? '',
				passwordRef.current?.value ?? ''
			);

			if (emailRef.current && passwordRef.current) {
				emailRef.current.value = '';
				passwordRef.current.value = '';
			}

			if (loggedIn) {
				closeModal();
			}
		} catch (err) {
			console.error(err);
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
				<div
					className='d-flex pt-4 flex-column align-items-center'
					style={{
						gap: '1rem 0',
					}}
				>
					<Button
						variant='dark'
						style={{
							width: '240px',
						}}
						onClick={handleLogin}
					>
						Log in
					</Button>

					<div>or</div>

					<GoogleButton
						onClick={() => {
							signWithGoogle();
							closeModal();
						}}
						type='light'
					/>
				</div>
			</Modal.Body>
		</>
	);
};

export default LoginForm;
