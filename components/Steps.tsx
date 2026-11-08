"use client";

import { useEffect, useState } from "react";
import { Chevron } from "./Icons";

// The six capabilities. On phones each title folds open on tap; on larger screens all text is shown as plain text.
export default function Steps({ items }: { items: readonly (readonly [string, string])[] }) {
  const [fold, setFold] = useState(false);
  const [openIdx, setOpenIdx] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const update = () => setFold(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const toggle = (i: number) =>
    setOpenIdx((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ol className="steps" id="steps">
      {items.map(([title, desc], i) => {
        const parts = title.split("|");
        const label = (
          <span className="ft">
            {parts.map((p, k) => (
              <span key={k}>
                <span className="ln2">{p}</span>
                {k < parts.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
        const isOpen = fold && openIdx.has(i);
        return (
          <li key={title} className={"step" + (isOpen ? " open" : "")}>
            <span className="dot" aria-hidden="true" />
            <h3>
              {fold ? (
                <button type="button" className="fold" aria-expanded={isOpen} onClick={() => toggle(i)}>
                  {label}
                  <Chevron />
                </button>
              ) : (
                <span className="fold">{label}</span>
              )}
            </h3>
            <p>{desc}</p>
          </li>
        );
      })}
    </ol>
  );
}
