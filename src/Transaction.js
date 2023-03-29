import React, { useRef } from "react";

// Individual Transactions
export default function Transaction({ transAction, key }) {
  function handleClear(e) {}
  return (
    <>
      <tr>
        <td>{transAction.name}</td>
        <td>{transAction.id}</td>
        <td>{transAction.time}</td>
        <td>
          <button className="btn red" onClick={handleClear}>
            X
          </button>
        </td>
      </tr>
    </>
  );
}
