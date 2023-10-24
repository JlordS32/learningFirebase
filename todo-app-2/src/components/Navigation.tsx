import { useEffect, useState } from 'react';

// components F
import ModalComponent from './ModalComponent';

// react-bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

// firebase imports
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { signOutUser } from '../utilities/firebaseUtilities';

// components
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

// custom types
type modalType = 'login' | 'signup';

const Navigation: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const [signInOrLogin, setSignOrLogin] = useState<modalType>('signup');
	const [user, setUser] = useState<User | null>(null);

	const toggleModal = (): void => {
		setShow(!show);
	};

	const handleSignInOrLogin = (modalType: modalType): void => {
		toggleModal();
		setSignOrLogin(modalType);
	};

	const handleSignout = (): void => {
		if (!confirm('Are you sure you want to sign out?')) return;

		signOutUser();
	};

	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			if (user) return;
			setUser(data);
		});
	}, []);

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
					{user && (<small>{user.email}</small>)}
					<Nav>
						{user ? (
							<Button
								variant='dark'
								onClick={handleSignout}
							>
								Sign out
							</Button>
						) : (
							<Button
								variant='dark'
								onClick={() => {
									handleSignInOrLogin('login');
								}}
							>
								Log in
							</Button>
						)}
						{!user && (
							<Button
								variant='dark'
								onClick={() => {
									handleSignInOrLogin('signup');
								}}
							>
								Create an account
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			{/* Log in / Sign up modal*/}
			<ModalComponent
				show={show}
				toggle={toggleModal}
			>
				{/* Toggle LoginForm Component or SignupForm component if modalType is 'login' or 'sign up' */}
				{signInOrLogin === 'login' ? (
					<LoginForm closeModal={toggleModal} />
				) : (
					<SignUpForm closeModal={toggleModal} />
				)}
			</ModalComponent>
		</>
	);
};

export default Navigation;
