import { Container } from 'hostConfig';
import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

// 实现 mount 时调用的 api
// ReactDOM.createRoot(document.getElementById('root')).render();

// ReactDOM.createRoot(document.getElementById('root'))
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}
// render();
export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	// eg. render(<App />) App 对应的 element 就是这个 element,则 updata 就是对应的 ReactElement
	//
	// createUpdate = (action) => Update
	const update = createUpdate<ReactElementType | null>(element);
	// 添加 Update 到 updateQueue
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	// 已经将更新连接到 updateQueue, 然后关联到 renderRoot
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
