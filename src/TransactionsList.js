// Lists all Transactions
import React from "react";

import Transaction from "./Transaction";
export default function TransactionsList({ transActions }) {
  return transActions.map((transAction) => {
    return <Transaction key={transAction.id} transAction={transAction} />;
  });
}
