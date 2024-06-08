import { useEffect, useState } from "react";

import TableCoins from "../modules/TableCoins";
import { getCoinList } from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [sign, setSign] = useState("$");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (currency === "usd") {
      setSign("$");
    } else if (currency === "eur") {
      setSign("€");
    } else {
      setSign("¥");
    }
  }, [currency]);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins
        sign={sign}
        coins={coins}
        isLoading={isLoading}
        setChart={setChart}
        currency={currency}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} sign={sign} />}
    </div>
  );
}

export default HomePage;
