import React, { useState } from 'react'
import { useStonks } from '../hooks/useStonks'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  mainContent: {
    margin: '20px 0',
  },
  stonkCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '10px 0',
  },
  stonkcard: {
    minWidth: '250',
    margin: '5px 5px',
    minHeight: '150px',
    backgroundColor: 'rgb(36, 36, 36)',
    transition: 'background-color 0.5s',
    display: 'block',
    textDecoration: 'none',
    color: 'white',
  },
  stonkCardhover: {
    backgroundColor: 'rgb(85, 85, 85)',
  },
  tickersymbol: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
  tickerprice: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px 0',
  },
  form: {
    display: 'flex',
    alignItems: 'stretch',
  },
  tickerInputLabel: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 10px',
  },
  tickerInputBox: {
    backgroundColor: 'rgb(82, 82, 82)',
    border: 'none',
    color: 'white',
    padding: '0.5em',
    /* margin: 0.1em, */
    fontSize: 'x-large',
    // fontFamily: 'Courier New', Courier, monospace',
    width: '4em',
    textTransform: 'uppercase',
    margin: '0 0 0 10px',
  },
  tickerInputSubmit: {
    fontSize: 'x-large',
    backgroundColor: 'rgb(34, 34, 34)',
    border: 'none',
  },
})
interface StonksProps {}
export const Stonks = ({}: StonksProps) => {
  const classes = useStyles()
  const [ticker, setTicker] = useState('')
  const { stonks, loading, adding, error, addStonk } = useStonks()
  console.log('stonks', stonks)
  // console.log('addStonk', addStonk)
  const handleSubmitTicker = () => {
    addStonk(ticker)
  }

  const createInputHandler = (setter) => (e) => {
    setter(e.target.value)
  }
  //  currying
  const handleTickerChange = createInputHandler(setTicker)

  return (
    <div className="root">
      {/* <div className="mainContent"> */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmitTicker()
        }}
      >
        <label className="tickerInputLabel" htmlFor="ticker">
          add ticker
        </label>
        <input
          className="tickerInputBox"
          type="text"
          maxLength={5}
          name="ticker"
          onChange={handleTickerChange}
        />
        <button
          className="tickerInputSubmit"
          type="button"
          onClick={handleSubmitTicker}
        >
          💎🙌🏻
        </button>
      </form>
      {error && <div>{error}</div>}
      {loading && <div>Fuck you i'm loading</div>}
      {stonks.length &&
        stonks.map((stonk) => {
          return (
            <a href={`/stonks/${stonk.ticker}`} className="stonk-card">
              <h2 className="ticker-symbol">{stonk.ticker} </h2>
              <div className="ticker-price">{stonk.price}</div>
            </a>
          )
        })}
      {adding && (
        <a href="#" className="stonk-card">
          <h2 className="ticker-symbol">...</h2>
          <div className="ticker-price">???</div>
        </a>
      )}
      {/*
    //     <div className="stonk-card-container">
    //       <% stonks.forEach(function(stonk){ %>
    //         <a href="/stonks/<%= stonk.ticker %>" className="stonk-card">
    //           <h2 className="ticker-symbol"><%= stonk.ticker %></h2>
    //           <div id="ticker-<%= stonk.ticker %>" className="ticker-price"></div>
    //         </a>
    //     </div>
    //   </div>
    */}
    </div>
  )
}

// this component needs to display the cards and have a form
// need to call the /api/stonks to get all stonk info
// useEffect here? need to re-render when a ticker gets added?
// fill state with the tickers
