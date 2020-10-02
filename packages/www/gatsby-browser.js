const React = require("react");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client");
const wrapRootElement = require("./wrap-root-element");
// const { Provider } = require("react-redux");

// const createStore = require("./src/state/createStore");
// const store = createStore();

// exports.wrapRootElement = ({ element }) => {
//   return <Provider store={store}>{element}</Provider>;
// };
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://todo-playground.netlify.app/.netlify/functions/graphql",
  }),
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};
