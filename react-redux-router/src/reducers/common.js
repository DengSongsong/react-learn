let initState = {
  age: 22
};

export default function Common(state = initState, action) {
  switch (action.type) {
    case "TEST":
      return action.data;
    default:
      return state;
  }
}
