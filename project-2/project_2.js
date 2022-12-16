const accessKey = 'gJFL96QegJoaCjwm2tgs8SZ7VuEerCtk';
let _data
const loadData = async () => {
    const result = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key =${accessKey}`)
    _data = await result.json()
}
const renderData = async () => {
    const from_select = document.getElementById('from')
    const to_select = document.getElementById('to')
    const amountFrom = document.getElementById('amount')
    const convertedTo = document.getElementById('converted-to')
    Object.keys(_data).forEach((currency) => {
        const optionForFrom = document.createElement('option')
        const optionForTo = document.createElement('option')
        optionForFrom.text = currency
        optionForFrom.value = currency
        optionForTo.text = currency
        optionForTo.value = currency
        from_select.add(optionForFrom)
        to_select.add(optionForTo)
    })
    from_select.value = 'EUR'
    to_select.value = 'USD'
    const convert = () => {
        const fromCurrency = from_select.value
        const toCurrency = to_select.value
        const amount = amountFrom.value
        const amountInUSD = _data[fromCurrency] * amount
        const toAmountRateInUSD = _data[toCurrency]
        if (toAmountRateInUSD !== 0) {
            const convertedAmount = amountInUSD / toAmountRateInUSD
            convertedTo.value = convertedAmount
        } else {
            convertedTo.value = 0
        }
    }
    amount.addEventListener('input', convert)
    from_select.addEventListener('change', convert)
    to_select.addEventListener('change', convert)
}

(async () => {
    await loadData()
    renderData()
})();