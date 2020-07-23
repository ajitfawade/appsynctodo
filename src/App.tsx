import React from "react";
import * as ReactDOM from "react-dom";
import { API } from "aws-amplify";
import { Chat, useChatLocalState, TodoType, Todos } from "react-demos";
import "react-demos/dist/todomvc.css";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

export interface GraphQLResult<T = object> {
  data?: T;
  errors?: [object];
  extensions?: {
    [key: String]: any;
  };
}

const App = () => {
  const props = useChatLocalState();
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  // GET

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = (await API.graphql({
      query: listTodos,
    })) as Promise<GraphQLResult<Object>>;
    setTodos((await todos).data as TodoType[]);
  };

  // CREATE
  async function addNewTodo(value: String) {
    await API.graphql({
      query: createTodo,
      variables: {
        value,
      },
    });
  }

  async function updateTodo(modifiedTodo: TodoType) {
    console.log("To be implemented");
  }
  // // To implement:
  //   currentUser: User | null;
  //   usersOnline: User[];
  //   messages: Message[];
  //   /** set currentUser and add them to usersOnline */
  //   onUserLoggedIn: (name: string) => Promise<void>;
  //   /** (optional) unset currentUser and remove from usersOnline */
  //   onUserLoggedOut: (id: string) => Promise<void>;
  //   /** add to messages by also adding the currentUser */
  //   sendMessage: (text: string) => Promise<void>;
  return (
    <div>
      <Todos addNewTodo={addNewTodo} updateTodo={updateTodo} todos={todos} />
    </div>
  );
};

export default App;
