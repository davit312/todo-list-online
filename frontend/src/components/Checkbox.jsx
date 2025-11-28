import { useState } from 'react';

const Checkbox = () => {
  const [checkedState, setI] = useState(false);
  return (
    <>
      <ul class="list-none space-y-4">
        <li class="flex p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex gap-2">
            <input
              value={checkedState}
              onChange={() => {
                setI(!checkedState);
              }}
              type="checkbox"
              id="some_id"
              className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-800 checked:border-0"
            />
            <label htmlFor="some_id">This is the checkbox label</label>
            <svg
              onClick={() => {
                setI(!checkedState);
              }}
              className="
      absolute text-white
      w-4 h-4 mt-1
      hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </li>
        <li class="p-4 bg-gray-50 border border-gray-200 rounded-lg"></li>
      </ul>
    </>
  );
};

export default Checkbox;
