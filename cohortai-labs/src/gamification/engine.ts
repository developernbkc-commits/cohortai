export interface XPEvent {type:string; points:number;}
export function awardXP(e:XPEvent){ console.log("XP Awarded",e); }
