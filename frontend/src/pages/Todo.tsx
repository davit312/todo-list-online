import { Fragment, useState } from "react";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PageWrapper from "../ui/PageWrapper";

export default function Todo() {
  const [todos, setTodos] = useState(() =>
    Array.from({ length: 15 }, (_, i) => {
      return { sec: i, checked: i % 2 === 0 };
    })
  );

  return (
    <PageWrapper>
      {todos.map((item, index, arr) => (
        <Fragment key={index}>
          <ListItemButton
            onClickCapture={() =>
              setTodos(
                arr.map((elem, i) =>
                  i === index ? { ...elem, checked: !elem.checked } : elem
                )
              )
            }
            role="listitem"
            onClick={() => {}}
          >
            <ListItemIcon>
              <Checkbox checked={item.checked} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText id={"labelId"} primary={`List item ${item.sec}`} />
          </ListItemButton>
          {index < arr.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </PageWrapper>
  );
}
