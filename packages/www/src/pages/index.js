import React, { useContext } from "react";
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
import { Link } from "gatsby";
import { IdentityContext } from "../../identity-context";
// import netlifyIdentity from "netlify-identity-widget";

export default (props) => {
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
