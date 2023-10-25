// react imports
import React, { useState, useRef } from 'react';

// react-bootstrap ui components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Todo: React.FC<{
	title: string;
	description: string;
	id: string;
	deleteTodo: (id: string) => void;
}> = ({ title, description, id, deleteTodo }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [selectedTodo, setSelectedTodo] = useState<string>('');

	// useRef hooks
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);

	const onDelete = (): void => {
		deleteTodo(id);
	};

	const handleUpdateTodo = (id: string): void => {
		if (titleRef.current && descRef.current) {
			console.log(titleRef.current.value, descRef.current.value);
		}
	};

	return (
		<div
			className='todo'
			id={id}
		>
			<Card style={{ width: '16rem' }}>
				<Card.Header>
					{id === selectedTodo && isEditable ? (
						<Form.Control
							as='input'
							style={{
								resize: 'none',
							}}
							name='title'
							ref={titleRef}
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
							name='description'
							ref={descRef}
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
								handleUpdateTodo(id);
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
