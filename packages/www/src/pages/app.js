import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
// import netlifyIdentity from "netlify-identity-widget";
import { IdentityContext } from "../../identity-context";
// import Layout from "../components/Layout";
// import Profile from "../components/Profile";
// import Details from "../components/Details";
// import Login from "../components/Login";
// import Default from "../components/Default";

let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Logout {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <div>Dash User: {user && user.user_metadata.full_name}</div>
    </Container>
  );
};

let DashLoggedOut = (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>

      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">My site</Heading>
        <Button
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log in
        </Button>
      </Flex>
    </Container>
  );
};
const App = () => {
  const { user } = useContext(IdentityContext);
  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }
  return (
    // <Layout>
    <Router>
      <Dash path="/app" />
      {/* <Profile path="/profile" />
        <Details path="/details" />
        <Login path="/login" /> 
      <Default path="/" />*/}
    </Router>
    // </Layout>
  );
};

export default App;
