import { Fragment, useEffect, useState } from "react";

import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  ListItem,
  LinearProgress,
  Box,
} from "@mui/material";
import PageWrapper from "../ui/PageWrapper";
import CircularLoading from "../ui/CircularLoading";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetUserTodosMutation,
  useUpdateTodoMutation,
} from "../services/todo";

import type { Todo } from "../types/todo";
import Statistics from "../ui/Statistics";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setLoading,
  setTodos,
  setError,
  useTodos,
} from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import NewTodoForm from "../ui/NewTodoForm";

import style from "../css/todo.module.css";

export default function TodoPage() {
  const todosState = useTodos();
  const dispatch = useDispatch();

  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [getInitialTodos] = useGetUserTodosMutation();

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(
    function () {
      dispatch(setLoading(true));
      getInitialTodos(undefined).then((res) => {
        if (res.error) {
          dispatch(setError(true, "Error loading user todos"));
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

  const handleAddTodo = async function (task: string) {
    const res = await createTodo({ task });
    if (res.error) {
      dispatch(setError(true, "Error adding todos"));
      return;
    }
    dispatch(setTodos([res.data, ...todosState.todos]));
  };

  const handleTodoClick = async function (todo: Todo) {
    setActionLoading(true);
    const res = await updateTodo({
      id: todo.id!,
      todo: { done: !todo.done },
    });
    if (res.error) {
      dispatch(setError(true, "Error changing todo"));
      return;
    }

    if (res.data?.id) {
      dispatch(
        setTodos(
          todosState.todos.map((todo: Todo) => {
            return todo.id === res.data.id ? res.data : todo;
          })
        )
      );
    }
    setActionLoading(false);
  };

  const handleDeleteClick = async function (todo: Todo) {
    setActionLoading(true);
    const res = await deleteTodo(todo?.id as number);
    if (res.error) {
      dispatch(setError(true, "Error deleting todos"));
      return;
    }
    dispatch(
      setTodos(todosState.todos.filter((t: Todo) => t.id !== res.data?.id))
    );
    setActionLoading(false);
  };

  return (
    <PageWrapper>
      <NewTodoForm
        loading={todosState.loading}
        handleAddTodo={handleAddTodo}
        setLoader={setActionLoading}
      />
      {todosState.loading ? (
        <CircularLoading />
      ) : (
        <Fragment>
          <Statistics
            total={todosState.todos.length}
            done={done}
            todo={todosState.todos.length - done}
          />

          <Box className={style.loadContainer}>
            {actionLoading && <LinearProgress className={style.progressBar} />}
          </Box>

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
