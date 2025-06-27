import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UpdatePassword } from './pages/UpdatePassword';
import '@ant-design/v5-patch-for-react-19';
import { ExamList } from './pages/ExamList/index';
import { Edit } from './pages/Edit';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Exam } from './pages/Exam';

const routes = [
	{
		path: '/',
		element: <ExamList />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'register',
		element: <Register />,
	},
	{
		path: 'update_password',
		element: <UpdatePassword />,
	},
	{
		path: 'edit/:id',
		element: <Edit />,
	},
	{
		path: 'exam/:id',
		element: <Exam />,
	},
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<DndProvider backend={HTML5Backend}>
		<RouterProvider router={router} />
	</DndProvider>
);
