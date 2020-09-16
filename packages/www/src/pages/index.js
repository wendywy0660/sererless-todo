import React, { useEffect } from "react";
import { Container, Heading, Button, Flex } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";

export default (props) => {
  useEffect(() => {
    netlifyIdentity.init({
      // container: '#netlify-modal', // defaults to document.body
      // locale: 'en' // defaults to 'en'
    });
  });
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">My site</Heading>
        <Button
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log in
        </Button>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            console.log(netlifyIdentity.currentUser());
          }}
        >
          Log user
        </Button>
      </Flex>
    </Container>
  );
};
