import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AddMatch from "./page/admin/Match/AddMatch";
import Match from "./page/admin/Match/Match";
import AddSeries from "./page/admin/Series/AddSeries";
import Series from "./page/admin/Series/Series";
import Home from "./page/Home";
import { Login } from "./page/Login/Login";
import Dashboard from "./page/admin/Dashboard/Dashboard";
import { Index } from "./components/layout/private/Dashboard";
import GoLive from "./page/admin/GoLive/GoLive";
import StartMatch from "./page/admin/StartMatch/StartMatch";
import CoinTossSimulator from "./page/admin/CoinSimulation/CoinSimulation";
import ScoreCard from "./page/ScoreCard/ScoreCard";
import AddNews from "./page/admin/News/AddNews";
import News from "./page/admin/News/News";
import NewsView from "./page/News/News";
import AfterMatchCard from "./page/ScoreCard/AfterMatchScore";
import PublicLayout from "./page/Layout/PublicLayout";
import NewsPanel from "./page/News/NewsPanel";
import SeriesView from "./page/Series/Series";
import MatchesView from "./page/Matches/Matches";
import Teams from "./page/team/Teams";
import Players from "./page/Player/Players";
function App() {
  const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="admin/login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/score/:id" element={<ScoreCard />} />
          <Route path="/news" element={<NewsPanel />} />
          <Route path="/news/:id" element={<NewsView />} />
          <Route path="/matchscore/:id" element={<AfterMatchCard />} />
          <Route path="/series" element={<SeriesView />} />
          <Route path="/series/match/:id" element={<MatchesView />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/player/:id" element={<Players />} />
        </Route>

        {/* Home */}
        <Route
          element={
            <PrivateWrapper
              auth={{
                isAuthenticated: JSON.parse(localStorage.getItem("auth")),
              }}
            />
          }
        >
          <Route path="/admin/*" element={<Index />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="series" element={<Series />} />
            <Route path="match" element={<Match />} />
            <Route path="match/:id" element={<Match />} />
            <Route path="matchscore/:id" element={<AfterMatchCard />} />
            <Route path="addseries" element={<AddSeries />} />
            <Route path="addmatch" element={<AddMatch />} />
            <Route path="golive" element={<GoLive />} />
            <Route path="startmatch/:id" element={<StartMatch />} />
            <Route path="toss/:id" element={<CoinTossSimulator />} />
            <Route path="addnews" element={<AddNews />} />
            <Route path="news" element={<News />} />
          </Route>
        </Route>

        <Route path="/admin" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
