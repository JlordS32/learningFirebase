import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';

const Todos = () => {
	const [data, setData] = useState([]);

	return (
		<div className='todos'>
			{data?.map((todo) => {
				return (
					<Card style={{ width: '18rem' }} id={todo.id}>
						<Card.Body>
							<Card.Text>
								{todo.content}
							</Card.Text>
						</Card.Body>
					</Card>
				);
			})}
		</div>
	);
};

export default Todos;
