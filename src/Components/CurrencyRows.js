const CurrencyRows = ({currenctOptions,selectedCurrency,onChangeCurrency,amount,onChangeAmount}) => {
    return (
        <div>
            <input type="number" className="input" value={amount}  onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currenctOptions.map(item => {
                    return (
                        <option value={item} key={Math.random()}>{item}</option>
                    )
                })}
                
            </select>
        </div>
    )
}

export default CurrencyRows
