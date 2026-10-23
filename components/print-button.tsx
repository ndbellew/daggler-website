"use client";

export function PrintButton() {
  return <button className="button-secondary no-print" type="button" onClick={() => window.print()}>Print / save PDF</button>;
}
