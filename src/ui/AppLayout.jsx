import PropsType from "prop-types";
import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

export default function AppLayout() {
  const navigation = useNavigation(); // to check if the navigation is in loading state or idle.
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropsType.node.isRequired,
};
