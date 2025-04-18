import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HeroPage from "./pages/HeroPage";
import UpcomingMovies from "./pages/UpcomingMovies";
import News from "./pages/news/News";
import NewsCard from "./pages/news/NewsCard";
import NewsVideo from "./pages/news/NewsVideo";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import SignUp2 from "./pages/auth/SignUp2";
import TransactionList from "./pages/Tickets/TransactionList";
import ActiveTicket from "./pages/Tickets/ActiveTicket";
import TransactionDetails from "./pages/TransactionDetails";
import Schedule from "./pages/MovieSchedule/Schedule";
import SeatList from "./pages/MovieSchedule/SeatList";
import Payment from "./pages/MovieSchedule/Payment";
import SuccessPage from "./pages/MovieSchedule/SuccessPage";
import ProfilePage from "./pages/auth/ProfilePage";
import Layout2 from "./Layout/Layout2";
import { useEffect, useState } from "react";
import { checkAuth } from "./utils/authCheck";
import Guard from "./utils/Guard";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuth();
      console.log(authStatus);
      setIsAuthenticated(authStatus);
      console.log("Redux Auth Status:", isAuthenticated);
      // localStorage.setItem("isAuthenticated", authStatus.toString());
      setLoading(false);
    };
    fetchAuthStatus();
  }, []);

  useEffect(() => {
    console.log("Auth Status:", isAuthenticated);
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Routes>
        {/* Routes without Navbar/Footer */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up2" element={<SignUp2 />} />
        <Route path="/login" element={<Login />} />

        {/* Routes with Navbar/Footer */}
        <Route element={<Layout2 />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/tid-news" element={<News />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upcoming-movies" element={<UpcomingMovies />} />
          <Route path="/tid-news/:id" element={<NewsCard />} />
          <Route path="/news-video/:id" element={<NewsVideo />} />

          {/* Protected Routes */}
          <Route
            path="/transaction"
            element={
              isAuthenticated ? <TransactionList /> : <Navigate to="/login" />
            }
          />
          <Route path="/movie/:id" element={<Schedule />} />
          <Route
            path="/active-tickets"
            element={
              isAuthenticated ? <ActiveTicket /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/transaction-details"
            element={
              <Guard>
                <TransactionDetails />
              </Guard>
            }
          />
          <Route
            path="/seat-selection"
            element={
              // isAuthenticated ?

              <SeatList />
              // : <Navigate to="/login" />
            }
          />
          <Route
            path="/choose-payment"
            element={
              <Guard>
                <Payment />
              </Guard>
            }
          />
          <Route
            path="/success-page/:bookingId"
            element={
              <Guard>
                <SuccessPage />
              </Guard>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
