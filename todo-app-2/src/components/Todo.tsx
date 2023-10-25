// react imports
import React, { useRef, useState } from 'react';

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

	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);

	const onDelete = (): void => {
		deleteTodo(id);
	};

	const handleUpdateTodo = () => {
		if (titleRef.current && descRef.current) {
			updateTodo(id, titleRef.current?.value, descRef.current?.value);

			setIsEditable(!isEditable);
			setSelectedTodo(id);
		}
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
							name='title'
							ref={titleRef}
							defaultValue={title}
						/>
					) : (
						<Card.Title>{title}</Card.Title>
					)}
				</Card.Header>
				<Card.Body>
					{id === selectedTodo && isEditable ? (
						<>
							<Form.Control
								as='textarea'
								style={{
									resize: 'none',
								}}
								name='description'
								ref={descRef}
								defaultValue={description}
							/>
						</>
					) : (
						<div>{description}</div>
					)}
				</Card.Body>
				{id === selectedTodo && isEditable ? (
					<Card.Footer
						className='d-flex justify-content-end'
						style={{
							gap: '1rem',
						}}
					>
						<Button
							variant='danger'
							onClick={() => {
								setIsEditable(!isEditable);
								setSelectedTodo(id);
								console.log(isEditable, 'click');
							}}
						>
							<span>
								<XMarkIcon width={15} />
							</span>
						</Button>
						<Button
							variant='primary'
							onClick={handleUpdateTodo}
						>
							<span>
								<CheckIcon width={15} />
							</span>
						</Button>
					</Card.Footer>
				) : (
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
				)}
			</Card>
		</div>
	);
};

export default Todo;
