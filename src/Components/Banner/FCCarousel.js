import React, { useState, useEffect } from 'react'
import axios from "axios"
import { TrendingCoins } from '../../config/api'
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from '../../CryptoContext'

export default function FCCarousel() {

  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
    console.log(data);
  };
  useEffect(() => {
    fetchTrendingCoins()
  }, [currency]);


  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <div className='carouselItem'>
        <Link to="/coinPage" state={coin.id} >
          <img
            src={coin.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10, backgroundColor: "rgb(225, 225, 225, .2)", borderRadius: 25 }}
          />
        </Link>
        <span style={{ fontSize: ".8rem", color: "gold" }}>{coin.name}</span>
        <span>
          {coin.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {coin.current_price.toFixed(3)}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    280: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className='carousel_div'>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  )
}
