import { Fragment, useEffect } from "react";

import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Box,
  TextField,
  Button,
  IconButton,
  ListItem,
} from "@mui/material";
import PageWrapper from "../ui/PageWrapper";
import CircularLoading from "../ui/CircularLoading";

import {
  useGetUserTodosMutation,
  useUpdateTodoMutation,
} from "../services/todo";

import type { Todo } from "../types/todo";
import Statistics from "../ui/Statistics";
import { Form } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setError,
  setLoading,
  setTodos,
  // setTodos,
  // setError,
  useTodos,
} from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";

export default function TodoPage() {
  const todosState = useTodos();
  const dispatch = useDispatch();
  const [getInitialTodos] = useGetUserTodosMutation();

  useEffect(
    function () {
      dispatch(setLoading(true));
      getInitialTodos(undefined).then((res) => {
        if (res.error) {
          dispatch(setError(true, "Error loadin user todos"));
        }
        dispatch(setTodos(res.data));
        dispatch(setLoading(false));
      });
    },
    [dispatch, getInitialTodos]
  );

  const [updateTodo] = useUpdateTodoMutation();

  if (todosState.error) {
    return (
      <Alert variant="filled" severity="error">
        {todosState.errorMessage}
      </Alert>
    );
  }

  const done = todosState.todos?.reduce(
    (acc: number, prev: Todo) => (acc += Number(prev.done)),
    0
  );

  const handleTodoClick = async function (todo: Todo) {
    dispatch(setLoading(true));
    const res = await updateTodo({
      id: todo.id!,
      todo: { done: !todo.done },
    });

    if (res.data?.id) {
      dispatch(
        setTodos(
          todosState.todos.map((todo: Todo) => {
            console.log("bbb");
            return todo.id === res.data.id ? res.data : todo;
          })
        )
      );
      dispatch(setLoading(false));
    }
  };

  const handleDeleteClick = function (todo: Todo) {
    console.log("delete", todo.id);
  };

  return (
    <PageWrapper>
      <Form>
        <Box sx={{ display: "flex", width: "100%", p: 2 }}>
          <TextField
            fullWidth
            label="Enter New Task"
            variant="outlined"
            placeholder="Add new task..."
          />
          <Button
            disabled={todosState.loading}
            variant="contained"
            onClick={() => {}}
            sx={{ mr: -1 }}
          >
            Add
          </Button>
        </Box>
      </Form>
      {todosState.loading ? (
        <CircularLoading />
      ) : (
        <Fragment>
          <Statistics
            total={todosState.todos.length}
            done={done}
            todo={todosState.todos.length - done}
          />
          {todosState.todos.map((item: Todo, index: number, arr: Todo[]) => (
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteClick(item)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              key={index}
            >
              <ListItemButton
                role="listitem"
                onClick={() => {
                  handleTodoClick(item);
                }}
              >
                <ListItemIcon>
                  <Checkbox checked={item.done} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText
                  style={{ textDecoration: item.done ? "line-through" : "" }}
                  primary={`${item.task}`}
                />
              </ListItemButton>
              {index < arr.length - 1 ? <Divider /> : null}
            </ListItem>
          ))}
        </Fragment>
      )}
    </PageWrapper>
  );
}
