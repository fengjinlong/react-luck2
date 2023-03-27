import ReactDOM from 'react-noop-renderer';
function App() {
	return (
		<>
			<Child />
			<div>
				hello world <p>pp</p>
			</div>
		</>
	);
}

function Child() {
	return 'Child';
}

const root = ReactDOM.createRoot();
root.render(<App />);
window.root = root;
