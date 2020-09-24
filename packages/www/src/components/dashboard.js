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
let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  // const [todos, setTodos] = useState([]);
  const todoReducer = (state, action) => {
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

  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();
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
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({ type: "addTodo", payload: inputRef.current.value });
          // setTodos([...todos, { done: false, value: inputRef.current.value }]);
          inputRef.current.value = "";
        }}
      >
        <Label sx={{ display: "flex" }}>
          Add TODO
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, index) => (
            <Flex
              key={index}
              as="li"
              onClick={() => {
                dispatch({
                  type: "toggleTodoDone",
                  payload: index,
                });
              }}
            >
              <Checkbox checked={todo.done} />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};

export default Dash;
