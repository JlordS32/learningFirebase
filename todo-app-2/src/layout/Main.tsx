import Navigation from "../components/Navigation";
import Todos from "../pages/Todos";
const Main = () => {
	return (
		<div className='layout'>
			<Navigation />
         <Todos />
		</div>
	);
};

export default Main;
