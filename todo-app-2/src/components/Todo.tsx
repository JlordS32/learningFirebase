// react imports
import React, { useEffect, useState } from 'react';

// react-bootstrap ui components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// hero icons import
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface defaultValue {
	title: string;
	description: string;
}

const Todo: React.FC<{
	title: string;
	description: string;
	id: string;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, title: string, description: string) => void;
}> = ({ title, description, id, deleteTodo, updateTodo }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [selectedTodo, setSelectedTodo] = useState<string>('');

	const onDelete = (): void => {
		deleteTodo(id);
	};

	return (
		<div
			className='todo'
			id={id}
			style={{
				minWidth: '350px',
			}}
		>
			<Card>
				<Card.Header>
					{id === selectedTodo && isEditable ? (
						<Form.Control
							as='input'
							style={{
								resize: 'none',
							}}
						/>
					) : (
						<Card.Title>{title}</Card.Title>
					)}
				</Card.Header>
				<Card.Body>
					{id === selectedTodo && isEditable ? (
						<Form.Control
							as='textarea'
							style={{
								resize: 'none',
							}}
						/>
					) : (
						<div>{description}</div>
					)}
				</Card.Body>
				<Card.Footer>
					<div className='d-flex justify-content-evenly'>
						<Button
							onClick={() => {
								setIsEditable(!isEditable);
								setSelectedTodo(id);
							}}
						>
							Update
						</Button>
						<Button
							variant='danger'
							onClick={onDelete}
						>
							Delete
						</Button>
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
};

export default Todo;
