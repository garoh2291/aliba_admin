import { Calc } from "../../components/Calc";
import { CalcContextProvider } from "../../context/provider";

export const CalcPage = () => {
  return (
    <CalcContextProvider>
      <Calc />
    </CalcContextProvider>
  );
};
