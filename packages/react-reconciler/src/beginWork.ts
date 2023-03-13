import { ReactElementType } from 'shared/ReactTypes';
import { mountChildFibers, reconcileChildFibers } from './childFibers';
import { FiberNode } from './fiber';
import { processUpdateQueue, UpdateQueue } from './updateQueue';
import {
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';

export const beginWork = (wip: FiberNode) => {
	// 比较 返回子 fiberNode
	switch (wip.tag) {
		case HostRoot:
			// 进行两个流程
			// 1. 计算属性最新之 2. 创建子 fiberNode
			return updateHostRoot(wip);
		case HostComponent:
			// 进行一个流程
			// 1. 创建子 fiberNode
			return updateHostComponent(wip);
		case HostText:
			return null;
		// case FunctionComponent:
		// 	return updateFunctionComponent(wip);
		default:
			if (__DEV__) {
				console.log('beginWork', 'default');
			}
	}
	return null;
};
/**
 * @description: 计算最新属性(消耗一个 update)， 返回子 fiberNode
 * processUpdateQueue = (baseState,pendingUpdate) => { memoizedState: State }
 * @param {FiberNode} wip
 * @return {*}
 */
function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;
	// 创建子 fiberNode
	const nextChildren = wip.memoizedState; // ReactElement
	// 子 ReactElement 和 子 currentFiberNode 生成 子 workInProgressFiberNode
	reconcileChildren(wip, nextChildren);
	// 返回 子 workInProgressFiberNode
	return wip.child;
}

/**
 * @description: 此类型 不涉及 更新流程，只涉及 创建子 fiberNode
 * <div><span>hello</span></div>
 * @param {FiberNode} wip
 * @return {*}
 */
function updateHostComponent(wip: FiberNode) {
	// 创建子 fiberNode
	const nextProps = wip.pendingProps;
	// nextChildren  --->  reactElement
	const nextChildren = nextProps.children;
	// 生成 子 fiberNode
	reconcileChildren(wip, nextChildren);
	// 返回 子 workInProgressFiberNode
	return wip.child;
}
function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
	const current = wip.alternate;
	if (current === null) {
		// mount 大量 placement 操作， 可以优化  只用 placement 一次根节点
		// 不追踪副作用
		wip.child = mountChildFibers(wip, null, children);
	} else {
		// update
		wip.child = reconcileChildFibers(wip, current?.child, children);
	}
}
