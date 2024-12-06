import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Homepage from "./Pages/Homepage";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [active, setActive] = useState(1);
  const { user, logout } = useContext(AuthContext);

  const renderContent = () => {
    switch (active) {
      case 1:
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <AppStyled bg={bg}>
        <Orb />
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <Routes>
              <Route
                path="/"
                element={!user ? <Homepage /> : renderContent()}
              />
              <Route
                path="/dashboard"
                element={user ? renderContent() : <Homepage />}
              />
            </Routes>
            {user && <button onClick={logout}>Logout</button>}
          </main>
        </MainLayout>
      </AppStyled>
    </Router>
  );
};

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
