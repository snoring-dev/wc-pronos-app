import Emitter from "tiny-emitter";
import * as SecureStore from "expo-secure-store";

const emitter = new Emitter();

export async function deleteKey(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function saveKey(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);

  if (result) {
    return result;
  }

  return null;
}

export const dispatchEvent = (name: string, params: any) => {
  emitter.emit(name, params);
};

export const on = (name: string, callback: () => void) => {
  emitter.on(name, callback);
};

export const off = (name: string, handler: () => void) => {
  emitter.off(name, handler);
};

export const makeid = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
