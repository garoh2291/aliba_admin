import { useSelector } from "react-redux";
import { getToken } from "../helpers/token";

export function useAuth() {
    const {user} = useSelector((state)=>state.track)

  return {
    isAuth: !!getToken(),
  };
}
