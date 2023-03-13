import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ReactElementType } from 'shared/ReactTypes';
import { createFiberFromElement, FiberNode } from './fiber';
import { Placement } from './fiberFlags';
import { HostText } from './workTags';

/**
 * @description: 生成子并返回子节点的 workInProgressFiberNode 并优化标记副作用
 * @param {boolean} shouldTrackEffects 是否需要跟踪副作用
 * @return {*}
 */
function ChildReconciler(shouldTrackEffects: boolean) {
	/**
	 * @description: 参数 fiber 是否需要标记 Placement
	 * @param {FiberNode} fiber
	 * @return {*}
	 */
	function placeSingleChild(fiber: FiberNode) {
		// 首屏渲染 且 应该追踪副作用时候 进行 标记
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}

	/**
	 * @description: 处理 react element, 并返回 子 fiber workInprocessFiberNode
	 * @return {*}
	 */
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		/**
		 * @description: 根据 element 创建 fiber 并返回
		 * const { type, key, props } = element;
		 * return new FiberNode(type, key, props);
		 * @return {*}
		 */
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}
	/**
	 * @description: 处理 text, 并返回 子 fiber workInprocessFiberNode
	 * @return {*}
	 */
	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

	return function (
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElementType
	) {
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					// react element
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				// ...
				default:
					if (__DEV__) {
						console.log('未实现的 reconcile 类型', newChild);
					}
					break;
			}
		}
		// TODO 多节点 ul > li*3
		// HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}
		if (__DEV__) {
			console.log('未实现的 reconcile 类型', newChild);
		}
		return null;
	};
}
export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
