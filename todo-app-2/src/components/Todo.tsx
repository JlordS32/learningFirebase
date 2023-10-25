// react imports
import React, { useEffect, useRef, useState } from 'react';

// react-bootstrap ui components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// hero icons import
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Todo: React.FC<{
	title: string;
	description: string;
	id: string;
	deleteTodo: (id: string) => void;
}> = ({ title, description, id, deleteTodo }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [selectedTodo, setSelectedTodo] = useState<string>('');
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);

	const onDelete = (): void => {
		deleteTodo(id);
	};

	const handleUpdateTodo = () => {
		console.log('click');
		if (titleRef.current && descRef.current) {
			console.log({
				title: titleRef.current.value,
				description: descRef.current.value,
			});
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
						<>
							<Form.Control
								as='textarea'
								style={{
									resize: 'none',
								}}
								name='description'
								ref={descRef}
							/>
							<div className='d-flex justify-content-end pt-3' style={{
								gap: '1rem'
							}}>
								<Button variant='success'>
									<span>
										<CheckIcon width={15}/>
									</span>
								</Button>
								<Button variant='danger'>
									<span>
										<XMarkIcon width={15} onClick={() => {
									setIsEditable(!isEditable);
									setSelectedTodo(id);
								}}F/>
									</span>
								</Button>
							</div>
						</>
					) : (
						<div>{description}</div>
					)}
				</Card.Body>
				{id !== selectedTodo && !isEditable && (
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
