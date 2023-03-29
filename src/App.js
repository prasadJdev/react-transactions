import { useState, useRef, useEffect, useReducer } from "react";
import TransactionsList from "./TransactionsList";
import { v4 as uuidv4 } from "uuid";
import { idGenerator } from "./idGenerator";
function App() {
  const [transActions, setTransActions] = useState([]);

  const transactionNameRef = useRef();
  const transactionTimeRef = useRef();

  const [today, setDate] = useState(new Date());

  useEffect(() => {
    let tm = new Date();
    transactionTimeRef.current.innerText = `${tm.toLocaleString()}`;
  });
  function handleAdd10() {
    let tm = new Date();
    tm = new Date(tm.getTime() + 30 * 60 * 1000);
  }

  function handleAdd60() {}

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [addTransAction, setAddTransAction] = useState({
    count: 0,
    coolTime: undefined,
  });

  useEffect(()=>{
    let timer = setInterval(()=>{
      setAddTransAction((prevTrans) => {
        console.log(prevTrans.count);
        if (prevTrans.count <= 0 ) return prevTrans
        console.log("hello");
        return {
          ...prevTrans,
          count: prevTrans.count - 1,
          coolTime: transactionTimeRef.current.innerText,
        };
      })
    }, 10000)
    return ()=> clearInterval(timer);
  },[])

  function handleTransact() {
    if (addTransAction.count < 3) {
      setAddTransAction((prevTrans) => {
        return {
          ...prevTrans,
          count: prevTrans.count + 1,
          coolTime: transactionTimeRef.current.innerText,
        };
      });
    } else {
      alert("Exceeded your TransAction Limit");
      return;
    }

    const name = transactionNameRef.current.value;
    const time = transactionTimeRef.current.innerText;
    if (name === "") return;
    setTransActions((prevTransAction) => {
      return [
        ...prevTransAction,
        {
          id: uuidv4(),
          // id: idGenerator.next().value,
          name: name,
          time: time,
        },
      ];
    });
    transactionNameRef.current.value = null;
  }

  return (
    <>
      <h1 className="mainHeading">--- Transactions Limits ---</h1>
      <div className="ribbon">
        <div className="transActions">
          <input
            type="text"
            ref={transactionNameRef}
            className="transactionName"
            placeholder=" Enter Transaction Name..."
            autoFocus
          />
          <button className="btn" onClick={handleTransact}>
            Transact
          </button>
        </div>
        <div className="currentTime">
          <fieldset>
            <legend title="tic-toc"> Time </legend>
            <div className="currentTime" ref={transactionTimeRef}></div>
            <button className="btn" onClick={handleAdd10} title="Skip 10 min">
              Skip 10
            </button>
            <button className="btn" onClick={handleAdd60} title="Skip 60 min">
              Skip 60
            </button>
          </fieldset>
        </div>
      </div>
      <h3>Transactions:</h3>
      <table className="transAction">
        <tr>
          <td className="bold">Name</td>
          <td className="bold">Id</td>
          <td className="bold">Time</td>
          <td className="bold">Action</td>
        </tr>
        <TransactionsList transActions={transActions} />
      </table>
    </>
  );
}

export default App;
