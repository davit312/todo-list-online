import { useState } from 'react';

const Checkbox = ({ children, checkboxName, isChecked, isDisabled }) => {
  const [checkedState, setChState] = useState(isChecked ?? false);
  return (
    <div className="flex gap-2">
      <input
        disabled={isDisabled}
        checked={checkedState}
        name={checkboxName}
        onChange={() => {
          setChState(!checkedState);
        }}
        type="checkbox"
        id="some_id"
        className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-800 checked:border-0"
      />
      <label htmlFor="some_id">{children}</label>
      <svg
        onClick={() => {
          setChState(!checkedState);
        }}
        className="
      absolute text-white
      w-4 h-4 mt-1
      hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
