import { RotatingLines } from "react-loader-spinner";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { marketChart } from "../../services/CryptoApi";

import styles from "./TableCoins.module.css";

function TableCoins({ coins, isLoading, sign, setChart, currency }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                coin={coin}
                setChart={setChart}
                sign={sign}
                currency={currency}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoins;

const TableRow = ({ coin, setChart, currency, sign }) => {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {sign}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} />
      </td>
    </tr>
  );
};
