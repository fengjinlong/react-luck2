// effect tags
export const Passive = 0b0010;
export const HookHasEffect = 0b0001;
// 只具备 Passive 不具备 HookHasEffect 的 effect 会被移除
// 执行副作用的时候，会根据 effect 的 tag 来判断是否执行，如果是 Passive | HookHasEffect 的话，就会执行，否则就不会执行。
// 必须要有 HookHasEffect 的原因是，如果只有 Passive 的话，那么在执行完 effect 之后，就会被移除，那么下次再执行的时候，就不会执行了。
