import { Action } from 'shared/ReactTypes';
import { Update } from './fiberFlags';

/**
 * @description: 更新实例接口
 * Update : { action: () => state || (prevState) => state }
 * @return {*}
 */
export interface Update<State> {
	action: Action<State>;
}
/**
 * @description: 更新队列接口
 * UpdateQueue : { shared: { pending: Update } }
 * @return {*}
 */
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
/**
 * @description: 创建更新
 * @param {*} State
 * @return {*}
 */
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};
/**
 * @description: 创建更新队列
 * @param {*} State
 * @return {*}
 */
export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
};

// 添加 Update 到 updateQueue
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

// 消费 update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	// init
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		// { action: () => state || (prevState) => state }
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// fn
			result.memoizedState = action(baseState);
		} else {
			// state
			result.memoizedState = action;
		}
	}
	return result;
};
