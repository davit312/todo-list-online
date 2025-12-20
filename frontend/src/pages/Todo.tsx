import { Fragment } from "react";

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

import { useGetUserTodosQuery } from "../services/todo";

import type { Todo } from "../types/todo";
import Statistics from "../ui/Statistics";
import { Form } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo() {
  const { data: todos, error, isLoading } = useGetUserTodosQuery(undefined);

  if (error) {
    let errMessage = "error";
    if ("error" in error) errMessage = error.error;

    return (
      <Alert variant="filled" severity="error">
        {errMessage}
      </Alert>
    );
  }

  const done = todos?.reduce(
    (acc: number, prev: Todo) => (acc += Number(prev.done)),
    0
  );

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
          <Button variant="contained" onClick={() => {}} sx={{ mr: -1 }}>
            Add
          </Button>
        </Box>
      </Form>
      {isLoading ? (
        <CircularLoading />
      ) : (
        <Fragment>
          <Statistics
            total={todos.length}
            done={done}
            todo={todos.length - done}
          />
          {todos.map((item: Todo, index: number, arr: Todo[]) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => console.log("delete", item)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              key={index}
            >
              <ListItemButton
                onClickCapture={() => console.log(item, index)}
                role="listitem"
                onClick={() => {}}
              >
                <ListItemIcon>
                  <Checkbox checked={item.done} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={`${item.task}`} />
              </ListItemButton>
              {index < arr.length - 1 ? <Divider /> : null}
            </ListItem>
          ))}
        </Fragment>
      )}
    </PageWrapper>
  );
}
