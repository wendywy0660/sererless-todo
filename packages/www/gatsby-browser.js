const React = require("react");
const wrapRootElement = require("./wrap-root-element");
// const { Provider } = require("react-redux");

// const createStore = require("./src/state/createStore");
// const store = createStore();

// exports.wrapRootElement = ({ element }) => {
//   return <Provider store={store}>{element}</Provider>;
// };
exports.wrapRootElement = wrapRootElement;
