import Input from "./Input";
import { Item } from "./types.ts";

type ChecklistItemProps = {
  item: Item;
  newItemTitle: string;
  isFinished: boolean;
  toggleItemStatus: (clickedID: number) => void;
  removeItem: (clickedID: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ChecklistItem({
  isFinished,
  onChange,
  item,
  toggleItemStatus,
  removeItem,
}: ChecklistItemProps) {
  // !

  return (
    <li
      className={`flex items-center gap-4 cursor-pointer ${isFinished && "opacity-50"} `}
      onClick={() => toggleItemStatus(item.ID)}
    >
      <input type="checkbox" checked={isFinished && true} onChange={onChange} />
      <span className={`${isFinished && "line-through"}`}>{item.title}</span>
      <span
        onClick={() => removeItem(item.ID)}
        className={`ml-auto text-xs text-red-600 ${isFinished && "hidden"}`}
      >
        ❌
      </span>
    </li>
  );
}

export default ChecklistItem;
