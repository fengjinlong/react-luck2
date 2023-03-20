import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// function App() {
// 	const [num, update] = useState(100);
// 	return (
// 		<ul onClick={() => update(50)}>
// 			{new Array(num).fill(0).map((_, i) => {
// 				return <Child key={i}>{i}</Child>;
// 			})}
// 		</ul>
// 	);
// }

// function Child({ children }) {
// 	const now = performance.now();

// 	while (performance.now() - now < 4) {}
// 	return <li>{children}</li>;
// }

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	// const arr =
	// 	num % 2 === 0
	// 		? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
	// 		: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
	const arr1 = (
		<>
			<li>{num}</li>
		</>
	);
	// return num % 3 ? <div onClick={() => setNum(num + 1)}>{num}</div> : <Child />;
	return (
		<ul
			onClick={() => {
				setNum((num) => num + 1);
				setNum((num) => num + 1);
				setNum((num) => num + 1);
				setNum((num) => num + 1);
				setNum((num) => num + 1);
			}}
		>
			{arr1}
		</ul>
	);
}
// function Child() {
// 	return <div>child</div>;
// }
const root = ReactDOM.createRoot(document.querySelector('#root')).render(
	<App />
);

// import { useState } from 'react';
// import ReactDOM from 'react-dom/client';

// function App() {
// 	const [num, setNum] = useState(100);

// 	const arr =
// 		num % 2 === 0
// 			? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
// 			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
// 	return (
// 		<ul
// 			onClickCapture={() => {
// 				setNum((num) => num + 1);
// 				setNum((num) => num + 1);
// 				setNum((num) => num + 1);
// 			}}
// 		>
// 			{num}
// 		</ul>
// 	);
// }

// function Child() {
// 	return <span>big-react</span>;
// }

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
// 	<App />
// );
