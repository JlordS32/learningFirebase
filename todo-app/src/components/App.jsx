import React from 'react';
import Navigation from './header/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import Todo from './todo/Todo';

const App = () => {
	return (
		<div className='app '>
         <Navigation />
         <Todo />
		</div>
	);
};

export default App;
