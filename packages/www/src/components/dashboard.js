import React, { useContext, useRef, useReducer } from "react";
import { Link } from "@reach/router";
import { IdentityContext } from "../../identity-context";
import {
  Container,
  Button,
  Flex,
  NavLink,
  Label,
  Input,
  Checkbox,
} from "theme-ui";

import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!, $done: Boolean!) {
    updateTodoDone(id: $id, done: $done) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
  }
};
let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  // const [todos, setTodos] = useState([]);

  // const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
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

      <Flex
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          Add TODO
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map((todo) => (
              <Flex
                key={todo.id}
                as="li"
                onClick={async () => {
                  console.log("updateTodoDone");
                  await updateTodoDone({
                    variables: { id: todo.id, done: !todo.done },
                  });
                  console.log("refetching");
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
};

export default Dash;
