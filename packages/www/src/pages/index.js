import React from "react";
import { Container, Heading, Button, Flex } from "theme-ui";

const index = (props) => (
  <Container>
    <Flex sx={{ flexDirection: "column", padding: 3 }}>
      <Heading as="h1">My site</Heading>
      <Button onClick={() => {}}>Log in</Button>
    </Flex>
  </Container>
);

export default index;
