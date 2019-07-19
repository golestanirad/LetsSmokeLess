export const testReducer = (state = "click the button ;)", action) => {
  switch (action.type) {
    case "TEST":
      return { ...action.payload };
    default:
      return state;
  }
};
