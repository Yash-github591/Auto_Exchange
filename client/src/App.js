import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import IndexPage from "./pages/IndexPage";
import MyVehiclesPage from "./pages/MyVehiclesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import CreateVehicle from "./pages/CreateVehicle";
import EditVehicle from "./pages/EditVehicle";
import VehiclePage from "./pages/VehiclePage";
import SendMail from "./pages/SendMail";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/myVehicles" element={<MyVehiclesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreateVehicle />} />
            <Route path="/edit/:id" element={<EditVehicle />} />
            <Route path="/vehicles/:id" element={<VehiclePage />} />
            <Route path="/sendMail/:id" element={<SendMail />} />
          </Route>
        </Routes>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
