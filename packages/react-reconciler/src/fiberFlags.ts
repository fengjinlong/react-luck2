export type Flags = number;

export const NoFlags = 0b0000000;
export const Placement = 0b0000001;
export const Update = 0b0000010;
export const ChildDeletion = 0b0000100;

export const MutationMask = Placement | Update | ChildDeletion;

// 当前 fiber 存在 effect，但不确定是哪种 effect
export const PassiveEffect = 0b0001000;
// effect 的标记
export const PassiveMask = PassiveEffect | ChildDeletion;
