import React from 'react';
// react-bootstrap imports
import Modal from 'react-bootstrap/Modal';

interface ModalComponentProps {
	show: boolean;
	toggle: () => void;
	children: React.ReactNode;
}
const ModalComponent: React.FC<ModalComponentProps> = ({
	show,
	toggle,
	children, // Include the children prop here
}) => {
	return (
		<Modal
			show={show}
			onHide={toggle}
			aria-labelledby='contained-modal-title-vcenter'
			className='modal-component'
			centered
		>
			{React.cloneElement(children as React.ReactElement<any, string>, {
				closeModal: toggle
			})}
		</Modal>
	);
};

export default ModalComponent;
