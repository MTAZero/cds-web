import {RouteObject, useRoutes} from "react-router-dom";
import MainRoutes from "./main-routers";
import {useAppSelector} from "../hooks";
import {getPermisisonRouter} from "../utils";
import {useMemo} from "react";

const ThemeRoutes = () => {
  const {permission} = useAppSelector(state => state.auth);

  const finalRouter = (routes: Array<any>): Array<RouteObject> => {
    const items = routes.map(i => getPermisisonRouter(permission, i));
    const ans: Array<RouteObject> = items.map((i: any) => i);
    return ans;
  };

  const ans = useMemo(() => {
    return finalRouter(MainRoutes);
  }, [permission, finalRouter, MainRoutes]);

  return useRoutes(ans);
};

export default ThemeRoutes;
