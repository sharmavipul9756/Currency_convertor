import {useEffect, useState} from 'react'
import './App.css'
import CurrencyRows from './Components/CurrencyRows'
require('dotenv').config

const App = () => {
const baseURL = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.ACCESS_KEY}&format=1`
const [ currenctOptions, setCurrencyOptions] = useState([]);
const [FormCurrency, setFromCurrency] = useState('')
const [exchangeRates,setExchangeRates] = useState('')
const [ToCurrency, setToCurrency] = useState('')
const [amount, setAmount] = useState(1)
const [AmountinFromCurrency, setAmountinFromCurrency] = useState(true)
let toAmount,fromAmount;
if(AmountinFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRates
} else {
    toAmount = amount
    fromAmount = amount / exchangeRates
}

useEffect(()=>{
    if(FormCurrency != null && ToCurrency != null) {
        fetch(`${baseURL}?base=${FormCurrency}&symbols=${ToCurrency}`)
        .then(
            res => res.json()
           )
        .then(data => {setExchangeRates(data.rates[ToCurrency]);})
    }
   
},
[FormCurrency,ToCurrency])

const handleFromAmountChange = (e) => {
 setAmount(e.target.value)
 setAmountinFromCurrency(true)
}
const handleToAmountChange = (e) =>{
    setAmount(e.target.value)
 setAmountinFromCurrency(false)
} 
    useEffect(() => {
        fetch(baseURL)
        .then(
         res => res.json()
        )
        .then(data => {
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base,...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRates(data.rates[firstCurrency])
        })
           
    }, [])
    return (
        <div>
            <h1>Convert</h1>
            <CurrencyRows
            currenctOptions={currenctOptions}
            selectedCurrency={FormCurrency}
            onChangeCurrency={(e)=>{setFromCurrency(e.target.value)}}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
            />
            <div className="equals">=</div>
            <CurrencyRows
            currenctOptions={currenctOptions}
            selectedCurrency={ToCurrency}
            onChangeCurrency={(e)=>{setToCurrency(e.target.value)}}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
            />
        </div>
    )
}

export default App
