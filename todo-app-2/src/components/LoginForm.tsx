// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm: React.FC = () => {
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
							required
						/>
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
				<div className='d-flex justify-content-center pt-4'>
					<Button variant='dark'>Log in</Button>
				</div>
			</Modal.Body>
		</>
	);
};

export default LoginForm;
