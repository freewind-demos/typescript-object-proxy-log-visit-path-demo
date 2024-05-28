const user = {
  aaa: {
    bbb: 111,
    ccc: undefined,
    ddd: null,
  }
}

type CallState = { ok: boolean, path: string[] }

function wrap<T extends object>(obj: T): {
  state: CallState,
  proxy: T
} {
  const state: CallState = {
    ok: true,
    path: []
  }
  return {
    state,
    proxy: deepProxy(obj, 0)
  };

  function deepProxy<T extends object>(obj: T, depth: number): T {
    return new Proxy(obj, {
      get(target, prop) {
        if (depth === 0) {
          state.ok = true;
          state.path = [];
        }
        state.path.push(String(prop));

        const value = (target as any)[prop];
        if (value === undefined) {
          state.ok = false;
          return value;
        }
        if (value === null) {
          return value;
        }
        if (typeof value === 'object') {
          return deepProxy(value, depth + 1);
        }
        return value;
      },
      set(target, prop, value: any): boolean {
        (target as any)[prop] = value;
        return true;
      }
    })
  }
}




const { state, proxy } = wrap(user);

console.log(proxy.aaa.bbb);
console.log("### state", state);

console.log(proxy.aaa.ccc);
console.log("### state", state);

console.log(proxy.aaa.ddd);
console.log("### state", state);

console.log(proxy.aaa.bbb = 222);
console.log(proxy.aaa.bbb);

console.log(proxy.aaa.bbb);
console.log("### state", state);