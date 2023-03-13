import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

export const scheduleUpdateOnFiber = (fiber: FiberNode) => {
	// 调度功能
	// 连接到容器
	// renderRoot(fiber);
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
};
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}
function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);
	do {
		try {
			workLoop();
		} catch (error) {
			// ...
			console.log('error', error);
		}
	} while (1);

	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;
	commitRoot(root);
}
function commitRoot(root: FiberRootNode) {
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.log('commitRoot', finishedWork);
	}
	root.finishedWork = null;
	const subtreeHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
	const rootHasEffect = (root.current.flags & MutationMask) !== NoFlags;
	if (subtreeHasEffect || rootHasEffect) {
		// commitBeforeMutationEffects(root);
		commitMutationEffects(finishedWork);
		// commitLayoutEffects(root);
		root.current = finishedWork;
	} else {
		// 没有 effect
		root.current = finishedWork;
	}
}
/**
 * @description: 将 fiberRootNode 转换成 fiberNode, 并付给 workInProgress
 * 传进来是 current 返回是 workInProgress
 * @param {FiberNode} root
 * @return {*}
 */
function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}
function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next !== null) {
		workInProgress = next;
		return;
	} else {
		// ...
		completeUnitOfWork(fiber);
	}
}
/**
 * @description: 1.归操作 2.处理兄弟节点，父节点
 * @param {FiberNode} fiber
 * @return {*}
 */
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		// ...
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
