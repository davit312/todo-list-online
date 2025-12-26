import { Box, Button, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  loading: boolean;
  handleAddTodo: (task: string) => Promise<void>;
  setLoader: Dispatch<SetStateAction<boolean>>;
};

function NewTodoForm({ loading, handleAddTodo, setLoader }: Props) {
  const [newTask, setNewTask] = useState("");

  return (
    <Box
      component="form"
      sx={{ display: "flex", width: "100%", p: 2 }}
      onSubmit={(e) => {
        e.preventDefault();
        setLoader(true);
        handleAddTodo(newTask).finally(() => {
          setNewTask("");
          setLoader(false);
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
        disabled={loading || newTask.length === 0}
        variant="contained"
        sx={{ mr: -1 }}
      >
        Add
      </Button>
    </Box>
  );
}

export default NewTodoForm;
