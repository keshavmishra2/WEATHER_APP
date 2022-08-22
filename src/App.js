//import { useState, useEffect } from 'react';
import './App.css';
import Weather from './Components/weather/weather';

function App() {
  return (
    <>
     <Weather/>
    </>
  );
}
// const App = () => {
// 	const [counter, setCounter] = useState(6)
// 	useEffect(()=>{
// 		setCounter(counter+1)
// 	},[])
// 	return <div>{counter}</div>
//}
// const App = () => {
// 	const [coins, setCoins] = useState([])
// 	const send = async () => {
// 		let res = await fetch("/api/coins")
// 		let data = await res.json()
// 		setCoins(data.coins)
// 	}
// 	useEffect(()=>{
// 		send()
// 	},[])
// 	return <div>{coins.map(coin=>(<div>{coin}</div>))}</div>
// }
// const App = () => {
//   const [loading, setLoading] = useState(true)
//   const load = () => {
//       setTimeout(()=>setLoading(false),5000);
//   }
//   if(loading){
//       return <h1>Loading</h1>
//   }
//   return (
//       <h1>Complete</h1>
//   )
// }
export default App;
