import { Fragment } from "react";

import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ListItem,
  LinearProgress,
  Box,
} from "@mui/material";
import PageWrapper from "../ui/PageWrapper";
// import CircularLoading from "../ui/CircularLoading";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetUserTodosQuery,
  useUpdateTodoMutation,
} from "../services/todo";

import type { Todo } from "../types/todo";
import Statistics from "../ui/Statistics";
import DeleteIcon from "@mui/icons-material/Delete";

import NewTodoForm from "../ui/NewTodoForm";

import style from "../css/todo.module.css";

export default function TodoPage() {
  const { isLoading, data: todos } = useGetUserTodosQuery();

  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const done = todos?.reduce(
    (acc: number, prev: Todo) => (acc += Number(prev.done)),
    0
  );

  const handleAddTodo = async function (task: string) {
    await createTodo({ task });
  };

  const handleTodoClick = async function (todo: Todo) {
    await updateTodo({
      id: todo.id!,
      todo: { done: !todo.done },
    });
  };

  const handleDeleteClick = async function (todo: Todo) {
    await deleteTodo(todo?.id as number);
  };

  return (
    <PageWrapper>
      <NewTodoForm
        creating={isCreating || isLoading}
        handleAddTodo={handleAddTodo}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <Statistics
            total={todos?.length as number}
            done={done!}
            todo={(todos?.length as number) - done!}
          />

          <Box className={style.loadContainer}>
            {(isCreating || isUpdating || isDeleting) && (
              <LinearProgress className={style.progressBar} />
            )}
          </Box>

          {todos?.map((item: Todo, index: number, arr: Todo[]) => (
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
