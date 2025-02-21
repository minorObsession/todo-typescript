import Input from "./Input";
import { Item } from "./types.ts";

type ChecklistItemProps = {
  item: Item;
  newItemTitle: string;
  isFinished: boolean;
  toggleItemStatus: (clickedID: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ChecklistItem({
  isFinished,
  onChange,
  item,
  toggleItemStatus,
}: ChecklistItemProps) {
  // !

  return (
    <li
      className={`flex items-center gap-4 cursor-pointer ${isFinished && "line-through opacity-80"}`}
      onClick={() => toggleItemStatus(item.ID)}
    >
      <input type="checkbox" checked={isFinished && true} onChange={onChange} />
      <span>{item.title}</span>
      <span className="ml-auto text-xs text-red-600">❌</span>
    </li>
  );
}

export default ChecklistItem;
