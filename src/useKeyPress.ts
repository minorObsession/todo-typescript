import { useEffect } from "react";

export function useKeyPress(
  keyPressed: string,
  functionToRun: (e: KeyboardEvent) => void
) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        console.log(e);
        // if the key pressed is the same as keyPressed
        if (e.code.toLowerCase() === keyPressed.toLowerCase()) {
          e.preventDefault();
          console.log("we are here");
          functionToRun(e);
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [functionToRun, keyPressed]
  );
}
