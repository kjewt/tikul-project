import {atom} from "recoil";

export const emailState = atom({
  key: "emailState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const passwordState = atom({
  key: "passwordState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const isSignupState = atom({
  key: "isSignupState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
