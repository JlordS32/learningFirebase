// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpForm: React.FC = () => {
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
							required
						/>
					</BootstrapForm.Group>
				</BootstrapForm>
				<div className='d-flex justify-content-center'>
					<Button variant='dark'>Sign up now!</Button>
				</div>
			</Modal.Body>
		</>
	);
};

export default SignUpForm;
