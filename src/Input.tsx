import { useKeyPress } from "./useKeyPress";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  purpose: "search" | "newItem";
  setNewItemTitle?: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  addNewItem?: () => void;
};

const Input = ({
  purpose,
  setNewItemTitle,
  setSearchQuery,
  addNewItem,
  ...rest
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setNewItemTitle) setNewItemTitle(e.target.value);
    if (setSearchQuery) setSearchQuery(e.target.value);
  };

  // ! ideas:
  // add x --> cancel btn for adding new item
  useKeyPress("enter", addNewItem);
  return (
    <input
      className={`w-fit rounded-sm border-1 border-amber-500 bg-amber-100 px-1.5 `}
      onChange={handleChange}
      type="text"
      {...rest}
    />
  );
};

export default Input;
