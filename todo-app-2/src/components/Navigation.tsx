import { useEffect, useState } from 'react';

// react-bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

// firebase imports
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
	getProfilePictureURL,
	signOutUser,
} from '../utilities/firebaseUtilities';

// components
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import ModalComponent from './ModalComponent';

// @heroicons imports
import { UserCircleIcon } from '@heroicons/react/24/solid';

// styles
import styles from '../styles/styles.module.css';
import EditAccount from './EditAccount';

// custom types
type modalType = 'login' | 'signup' | 'accountSettings';

const Navigation: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const [modalToRender, setModalToRender] = useState<modalType>('signup');
	const [user, setUser] = useState<User | null>(null);
	const [profilePictureURL, setProfilePictureURL] = useState<string>('');

	const toggleModal = (): void => {
		setShow(!show);
	};

	const handleModalToRender = (modalType: modalType): void => {
		toggleModal();
		setModalToRender(modalType);
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

	useEffect(() => {
		if (user && user.uid) {
			getProfilePictureURL(user).then((res) => {
				if (res) {
					setProfilePictureURL(res as string);
				}
			});
		}
	});

	return (
		<>
			<Navbar
				expand='lg'
				className='px-5 py-lg-1 py-3 text-bg-dark'
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

				<div
					className='d-flex'
					style={{ gap: '0 1rem' }}
				>
					{user && (
						<div
							className='d-flex align-items-center d-lg-none'
							style={{ gap: '0 1rem' }}
						>
							<div
								className={styles['user-profile-icon']}
								onClick={() => handleModalToRender('accountSettings')}
							>
								{profilePictureURL && (
									<div
										style={{
											backgroundImage: `url(${profilePictureURL})`,
											width: '40px',
											aspectRatio: '1/1',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											borderRadius: '50%',
										}}
									></div>
								)}
								{!profilePictureURL && <UserCircleIcon width={30} />}
							</div>
						</div>
					)}
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
				</div>

				<Navbar.Collapse className='py-3 justify-content-end'>
					{user && (
						<div
							className='d-flex align-items-center d-lg-flex d-none'
							style={{ gap: '0 1rem' }}
						>
							<div
								className={styles['user-profile-icon']}
								onClick={() => handleModalToRender('accountSettings')}
							>
								{profilePictureURL ? (
									<div
										style={{
											backgroundImage: `url(${profilePictureURL})`,
											width: '40px',
											aspectRatio: '1/1',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											borderRadius: '50%',
										}}
									></div>
								) : (
									<UserCircleIcon width={30} />
								)}
							</div>
							<small>{user?.email}</small>
						</div>
					)}
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
									handleModalToRender('login');
								}}
							>
								Log in
							</Button>
						)}
						{!user && (
							<Button
								variant='dark'
								onClick={() => {
									handleModalToRender('signup');
								}}
							>
								Create an account
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<ModalComponent
				show={show}
				toggle={toggleModal}
			>
				{modalToRender === 'login' && <LoginForm closeModal={toggleModal} />}
				{modalToRender === 'signup' && <SignUpForm closeModal={toggleModal} />}
				{modalToRender === 'accountSettings' && (
					<EditAccount
						closeModal={toggleModal}
						email={user?.email as string}
						currentUser={user as User}
						defaultImage={profilePictureURL as string}
					/>
				)}
			</ModalComponent>
		</>
	);
};

export default Navigation;
