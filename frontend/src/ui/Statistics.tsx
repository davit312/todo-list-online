import { Box, Divider } from "@mui/material";

type Props = {
  total: number;
  todo: number;
  done: number;
};

const style = {
  fontWeight: 300,
  color: "#444",
  margin: "5px",
  marginTop: 0,
};
function Statistics({ total, todo, done }: Props) {
  return (
    <Box>
      <span style={style}>Total:</span>
      <span>{total}</span>
      <span style={style}>Todo:</span>
      <span>{todo}</span>
      <span style={style}>Done:</span>
      <span>{done}</span>
      <Divider />
    </Box>
  );
}

export default Statistics;
