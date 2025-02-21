import { useKeyPress } from "./useKeyPress";

type InputProps = React.ComponentPropsWithRef<"input"> & {
  purpose: "search" | "newItem";
  setNewItemTitle?: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  addNewItem?: () => void;
  setIsAdding?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.RefObject<unknown>;
};

const Input = ({
  purpose,
  setNewItemTitle,
  setSearchQuery,
  addNewItem,
  setIsAdding,
  ref,
  ...rest
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setNewItemTitle) setNewItemTitle(e.target.value);
    if (setSearchQuery) setSearchQuery(e.target.value);
  };

  if (addNewItem) {
    useKeyPress("enter", addNewItem);
    if (setIsAdding) useKeyPress("escape", () => setIsAdding(false));
  }

  // useKeyPress('escape', ()=> )

  return (
    <input
      className={`${purpose === "search" ? "w-fit" : "w-full"} rounded-sm border-1 border-amber-500 bg-amber-100 px-1.5 `}
      onChange={handleChange}
      type="text"
      ref={ref}
      {...rest}
    />
  );
};

export default Input;
