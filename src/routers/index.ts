import { useRoutes } from "react-router-dom";
import MainRoutes from "./main-routers";

export default function ThemeRoutes() {
  return useRoutes(MainRoutes);
}