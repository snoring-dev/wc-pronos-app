import Emitter from "tiny-emitter";

const emitter = new Emitter();

export const dispatchEvent = (name: string, params: any) => {
  emitter.emit(name, params);
};

export const on = (name: string, callback: () => void) => {
  emitter.on(name, callback);
};

export const off = (name: string, handler: () => void) => {
  emitter.off(name, handler);
};
