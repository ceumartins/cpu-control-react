import { useEffect, useState } from "react";

export function useCPUInfo() {
  const [state, setState] = useState({
    cpu: 60,
    process: ""
  });
  const processName = ["node.exe", "postgres.exe", "excel.exe", "chrome.exe"];

  useEffect(() => {
    let signal = 1;
    let interval = setInterval(() => {
      setState(({ cpu }) => {
        const newCPU = cpu + Math.floor(Math.random() * 6) * signal;
        if ((signal === 1 && newCPU > 90) || (signal === -1 && newCPU < 50)) {
          signal = signal * -1;
        }
        return {
          cpu: newCPU,
          process: processName[Math.floor(Math.random() * processName.length)]
        };
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    cpu: state.cpu, //CPU : number
    process: state.process // Nome do Processo : string
  };
}
