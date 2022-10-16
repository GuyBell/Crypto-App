import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { CoinList } from '../config/api'
import axios from 'axios';
import { CryptoState } from "../CryptoContext"
import { useNavigate } from 'react-router-dom';

export default function FCCoinsTable() {
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState()
  const [Search, setSearch] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const fetchAllCoins = async () => {
    const { data } = await axios.get(CoinList(currency))
    setAllCoins(data)
    console.log(data);
  };
  useEffect(() => {
    fetchAllCoins()
  }, [currency])

  const handleSearch = () => {
    return allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(Search) ||
        coin.symbol.toLowerCase().includes(Search)
    );
  };


  return (
    <div className='table-container'>
      <span style={{ margin: 18, fontSize: "1.6rem", fontWeight: "bold", fontFamily: "Montserrat", color: "white" }}>Cryptocurrency prices by <br /> Market Cap</span>
      <input type="text" onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="  Search for a crypto currency.." />
      <div className='tBody'>
        <Table className='table'>
          <thead style={{ padding: "20px" }}>
            <tr>
              <th className='sticky-headers'>Coin</th>
              <th className='sticky-headers'>Price</th>
              <th className='sticky-headers'>24h change</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch().map(coin => {
              let profit = coin.price_change_percentage_24h >= 0;
              return (
                <tr key={coin.id} >
                  <td style={{ textAlign: "left", cursor: "pointer" }} onClick={() => navigate("/coinPage", { state: coin.id })}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      height="20"
                      style={{ marginTop: 6, marginLeft: 6 }}
                    /> {coin.symbol}</td>
                  <td>{symbol} {coin.current_price.toFixed(2)}</td>
                  <td>
                    <span
                      style={{
                        color: profit ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
