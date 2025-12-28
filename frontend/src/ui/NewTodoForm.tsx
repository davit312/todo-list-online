import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  handleAddTodo: (task: string) => Promise<void>;
  creating: boolean;
};

function NewTodoForm({ handleAddTodo, creating }: Props) {
  const [newTask, setNewTask] = useState("");

  return (
    <Box
      component="form"
      sx={{ display: "flex", width: "100%", p: 2 }}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo(newTask).finally(() => {
          setNewTask("");
        });
      }}
    >
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        fullWidth
        label="Enter New Task..."
        variant="outlined"
      />
      <Button
        type="submit"
        disabled={creating || newTask.length === 0}
        variant="contained"
        sx={{ mr: -1 }}
      >
        Add
      </Button>
    </Box>
  );
}

export default NewTodoForm;
