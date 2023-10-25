import React, { useState } from 'react';

// react bootstrap imports
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// styles
import styles from '../styles/styles.module.css';

import { UserCircleIcon } from '@heroicons/react/24/solid';

const EditAccount: React.FC<{ closeModal: () => void; email: string }> = ({
	closeModal,
	email,
}) => {
	const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();
	const [imageURL, setImageURL] = useState<string>('');

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				const imageDataURL = reader.result as string;
				setImageURL(imageDataURL);
			};
			reader.readAsDataURL(selectedFile);
		}

		setSelectedProfilePicture(selectedFile);
	};

	return (
		<>
			<Modal.Header>
				<Modal.Title className='text-center w-100'>Edit Account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='d-flex justify-content-between'>
					<Form.Group>
						<Form.Control
							name='file'
							type='file'
							id='user-profile'
							className='d-none'
							onChange={handleFileUpload}
						/>
						<Form.Label
							htmlFor='user-profile'
							className={styles['edit-profile-icon']}
						>
							{selectedProfilePicture && imageURL ? (
								<div
									style={{
										backgroundImage: `url(${imageURL})`,
										width: '70px',
										aspectRatio: '1/1',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										borderRadius: '50%',
									}}
								></div>
							) : (
								<UserCircleIcon width={70} />
							)}
							<small className='pt-1'>
								<strong>Update Profile</strong>
							</small>
						</Form.Label>
					</Form.Group>
					<div
						style={{ flex: '1', padding: '0 1rem', gap: '1rem 0' }}
						className='d-flex flex-column'
					>
						<Form.Group>
							<Form.Control
								name='user-name'
								type='text'
								id='user-name'
								placeholder='Username'
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								name='user-email'
								type='email'
								defaultValue={email}
								id='user-email'
								placeholder='Email'
								disabled
							/>
						</Form.Group>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					variant='primary'
					onClick={closeModal}
				>
					Save Changes
				</Button>
			</Modal.Footer>
		</>
	);
};

export default EditAccount;
