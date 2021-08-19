import "./styles.css";
import { useCPUInfo } from "./hooks/useCPUInfo";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const { cpu, process } = useCPUInfo();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (cpu > 90) {
      const today = new Intl.DateTimeFormat("pt-br").format(new Date());
      const obj = {
        cpu,
        process,
        today
      };
      setHistory((old) => [...old, obj]);
    }

    return;
  }, [cpu, process]);

  return (
    <div className="App container py-3">
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Uso da CPU</h4>
            </div>
            <div
              className={`card-body ${cpu <= 60 && "bg-primary"}
            ${cpu >= 70 && "bg-danger"}
            `}
            >
              <h1 className="card-title pricing-card-title">
                {cpu}
                <small className="text-muted fw-light">%</small>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">CPU</th>
              <th scope="col">Processo</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            {history.map((i) => (
              <tr>
                <td>{i.cpu}%</td>
                <td>{i.process}</td>
                <td>{i.today}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
