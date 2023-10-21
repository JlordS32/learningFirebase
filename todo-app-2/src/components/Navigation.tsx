import { useState, useEffect } from 'react';

// components F
import ModalComponent from './ModalComponent';

// react-bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

// components
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

// custom types
type modalType = 'login' | 'signup';

const Navigation: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const [signInOrLogin, setSignOrLogin] = useState<modalType>('signup');

	const toggleModal = (): void => {
		setShow(!show);
	};

	const handleSignInOrLogin = (modalType: modalType): void => {
		setSignOrLogin(modalType);
	};

	return (
		<>
			<Navbar
				expand='lg'
				className='px-5 py-1 text-bg-dark'
				data-bs-theme='dark'
			>
				<Navbar.Brand
					href='#'
					style={{
						color: 'white',
					}}
				>
					My Logo
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse className='justify-content-end py-3'>
					<Nav>
						<Button
							variant='dark'
							onClick={() => {
								toggleModal();
								handleSignInOrLogin('login');
							}}
						>
							Log in
						</Button>
						<Button
							variant='dark'
							onClick={() => {
								toggleModal();
								handleSignInOrLogin('signup');
							}}
						>
							Create an account
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<ModalComponent
				show={show}
				toggle={toggleModal}
			>
				{/* Toggle LoginForm Component or SignupForm component if modalType is 'login' or 'sign up' */}
				{signInOrLogin === 'login' ? <LoginForm /> : <SignUpForm />}
			</ModalComponent>
		</>
	);
};

export default Navigation;
