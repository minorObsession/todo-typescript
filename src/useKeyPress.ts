import { useEffect } from "react";

export function useKeyPress(keyPressed: string, functionToRun: () => void) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        // if the key pressed is the same as keyPressed
        if (e.code.toLowerCase() === keyPressed.toLowerCase()) {
          functionToRun();
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
