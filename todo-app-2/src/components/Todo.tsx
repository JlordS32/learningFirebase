import React from 'react';
import Card from 'react-bootstrap/Card';

const Todo: React.FC<{ title: string; content: string; id: string }> = ({
	title,
	content,
	id,
}) => {
	return (
		<div
			className='todo'
			id={id}
		>
			<Card style={{ width: '16rem' }}>
				<Card.Header>
					<Card.Title>{title}</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text>{content}</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Todo;
