import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";

export default function FCHeader() {
  const { currency, setCurrency } = CryptoState();
  return (
    <div className="header">
      <Link to="/"
        style={{
          marginLeft: 25,
          maxWidth: 100,
          color: "#F5C7A9",
          fontSize: "2em",
          textDecoration: "none",
          fontWeight: "bold"
          }}>
        Crypto
      </Link>

      <div>
        <select onChange={(e) => setCurrency(e.target.value)} className="select_div">
          <option value="usd">USD</option>
          <option value="ils">ILS</option>
        </select>
      </div>
    </div>
  );
}
