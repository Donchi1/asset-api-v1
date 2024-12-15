import React from 'react'

export function TradingWidget() {
    return (
        <iframe
            src="https://www.tradingview-widget.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A1600%2C%22height%22%3A970%2C%22defaultColumn%22%3A%22moving_averages%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22colorTheme%22%3A%22dark%22%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22api-trade.info%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%2C%22page-uri%22%3A%22api-trade.info%2F%3Fa%3Dhome%22%7D"
            title="crypto mkt-screener TradingView widget"
            lang="en"
            className='block min-h-[80vh] z-10 box-border w-full select-none'
        >

        </iframe>
    )
}


export function TradingWidgetScroll() {
    return (

        <iframe
            src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22US%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%5D%2C%22showSymbolLogo%22%3Afalse%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A78%2C%22utm_source%22%3A%22api-trade.info%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22api-trade.info%2F%3Fa%3Dhome%22%7D"
            title="ticker tape TradingView widget"
            lang="en"
            className='block h-[10vh] box-border w-full select-none'></iframe>
    )
}


const FullTradingWidget = () => {
    return (
        <div className='!z-20'>

            <TradingWidgetScroll />
            <TradingWidget />
        </div>
    )
}

export default FullTradingWidget




