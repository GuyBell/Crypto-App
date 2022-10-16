import { useLocation } from 'react-router-dom';
import FCCoinInfo from '../Components/FCCoinInfo';


export default function CoinPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <FCCoinInfo coinId={data} />
    </div>
  )
}
