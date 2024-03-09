import {useState,useEffect} from"react"
import './App.css';

function App() {
    const[name,setName]=useState("")
    const[datetime,setDatetime]=useState("")
    const [description,setDescription]=useState(" ")
    const[transactions,setTransactions]=useState("")

    
  useEffect(() => {
    getTransaction().then(setTransactions);
  }, []);

    async function getTransaction(){
      const url = "http://localhost:4000/api" + "/transaction";
      const response = await fetch(url);
      return await response.json();
    }

    function addNewTransaction(e){
      e.preventDefault()
        const url=process.env.REACT_APP_API_URL+"/transaction";
        const price=name.split(' ')[0]
        console.log(url)
       fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
       name: name.substring(price.length+1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
      });
    });
  }
    
  let balance =0;
  for(const transaction of transactions){
    balance=balance+transaction.price;

  }
  balance=balance.toFixed(2)
  return (
    <main>
      <h1>MERN Money Tracker</h1>
      <div></div>
      <h1>
        {balance}
        <span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          {" "}
          <input
            type="text"
            placeholder={"+200 for ASUS"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder={"description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button>Add new Transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index}className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description"> {transaction.description}</div>
              </div>
              <div className="right">
              <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.price}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
