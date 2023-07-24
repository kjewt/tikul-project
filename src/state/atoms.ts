import {atom} from "recoil";

// const getTodayDate = () => {
//   const today = new Date();

// };

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

export const bankNameState = atom({
  key: "bankNameState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const accountState = atom({
  key: "accountState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const accountPasswordState = atom({
  key: "accountPasswordState",
  default: "",
});

// for Join

export const isEmailState = atom({
  key: "isEmailState",
  default: false,
});

export const isSamePassportState = atom({
  key: "isSamePassportState",
  default: false,
});

export const isAccountState = atom({
  key: "isAccountState",
  default: false,
});

export const isSameAccountPassportState = atom({
  key: "isSameAccountPassportState",
  default: false,
});

export const isCheckedState = atom({
  key: "isCheckedState",
  default: false,
});
// for adding

export const selectedDateState = atom({
  key: "selectedDateState", // unique ID (with respect to other atoms/selectors)
  default: new Date(), // default value (aka initial value)
});

// for transfer
export const isTransferState = atom({
  key: "isTransferState",
  default: true,
});

export const accountDataState = atom({
  key: "accountDataState",
  default: null,
});

export const balanceState = atom({
  key: "balanceState",
  default: 0,
});

export const transferBankNameState = atom({
  key: "transferBankNameState",
  default: "",
});
