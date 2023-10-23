// React imports
import { useRef } from 'react';

// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// utilities
import { signUpUsers } from '../utilities/firebaseUtilities';

const SignUpForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleSignUp = () => {
		signUpUsers(
			emailRef.current?.value ?? '',
			passwordRef.current?.value ?? '',
			closeModal
		)

		if (emailRef.current && passwordRef.current) {
			emailRef.current.value = '';
			passwordRef.current.value = '';
		}
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title className='text-center w-100'>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<BootstrapForm className='py-4'>
					<BootstrapForm.Group className='pb-3'>
						<BootstrapForm.Label>Email address</BootstrapForm.Label>
						<BootstrapForm.Control
							type='email'
							placeholder='Enter email'
							ref={emailRef}
							required
						/>
						<BootstrapForm.Text className='text-muted'>
							We'll never share your email with anyone else.
						</BootstrapForm.Text>
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
				<div className='d-flex justify-content-center'>
					<Button
						variant='dark'
						onClick={handleSignUp}
					>
						Sign up now!
					</Button>
				</div>
			</Modal.Body>
		</>
	);
};

export default SignUpForm;
