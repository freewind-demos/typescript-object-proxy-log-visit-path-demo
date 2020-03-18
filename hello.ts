const user = {
  name: 'freewind'
}

const proxy = new Proxy(user, {
  get(target, prop) {
    console.log('> get', {target, prop});
    return (target as any)[prop] as any;
  },
  set(target, prop, value: any): boolean {
    console.log('> set', target, prop, value);
    (target as any)[prop] = value;
    return true;
  }
})

console.log(proxy.name = '111');
console.log(proxy.name);
