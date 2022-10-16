import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import parse from 'html-react-parser';
import axios from "axios"
import { SingleCoin } from '../config/api'
import { CryptoState } from "../CryptoContext";


export default function FCCoinInfo({ coinId }) {
  const [coin, setCoin] = useState()
  const { currency, symbol } = CryptoState();

  const GetCoin = async () => {
    const { data } = await axios.get(SingleCoin(coinId))
    setCoin(data)
    console.log(data);
  };
  useEffect(() => {
    GetCoin()
  }, [setCoin]);

  return (
    <>
      {coin != undefined ? (
        <div className='coinInfoContainer'>
          <Card style={{ width: '20rem', paddingRight: "15px", borderRight: "2px solid white" }}>
            <img
              src={coin.image.large}
              alt={coin.name}
              height="180"
              style={{ marginBottom: 10, marginTop: 8 }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "4rem", fontFamily: "Montserrat" }}>{coin.name}</Card.Title>
              <Card.Text>
                {parse(coin?.description.en.split(". ")[0])}
              </Card.Text>
            </Card.Body><br />
            <ListGroup>
              <ListGroup.Item>
                <b>Market Cap Rank:</b> {coin.coingecko_rank}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Bitcoin Price (BTC): </b> {symbol} {coin.market_data.current_price[currency]}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Low 24:</b> {symbol} {coin.market_data.low_24h[currency]}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>High 24:</b> {symbol} {coin.market_data.high_24h[currency]}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Market Cap:</b> {symbol} {coin.market_data.market_cap[currency].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div >
      ) : ("")
      }
    </>
  )
}
