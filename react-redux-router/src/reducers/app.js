let initState = {
  name: "lishian"
};

export default function App(state = initState, action) {
  switch (action.type) {
    case "TEST":
      return action.data;
    default:
      return state;
  }
}
