import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../../styles/todo.module.css';
import autoAnimate from '@formkit/auto-animate';

// BOotstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

const Todos = ({ todos, deleteTodo }) => {
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div
			className='todos w-75 py-5 d-grid justify-content-center'
			ref={parent}
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '1rem',
			}}
		>
			{todos?.map((item) => {
				return (
					<Card
						key={item.id}
						className={`${styles['todo']} shadow-sm bg-white rounded`}
					>
						<Card.Body>
							<Card.Title>{item.title}</Card.Title>
							<Card.Text>{item.content}</Card.Text>
							<div className='d-flex justify-content-center' style={{gap: '1rem'}}>
								<Button>Update</Button>
								<Button className='bg-danger border-danger' onClick={() => deleteTodo(item.id)}>Delete</Button>
							</div>
						</Card.Body>
					</Card>
				);
			})}
		</div>
	);
};

export default Todos;
