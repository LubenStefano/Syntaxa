import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer/Footer";
import Main from "./components/pages/Main/Main";
import Layout from "./components/shared/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/pages/Login/Login";
import { UserProvider } from './context/UserContext';
import Register from "./components/pages/Register/Register";
import Lectures from "./components/pages/Lectures/Lectures";
import Lecture from "./components/pages/Lecture/Lecture";
import Tasks from "./components/pages/Tasks/Tasks";
import Sandbox from "./components/pages/Sandbox/Sandbox";
import Profile from "./components/pages/Profile/Profile";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";
import CreateTask from "./components/admin/pages/CreateTask/CreateTask";
import CreateLecture from "./components/admin/pages/CreateLecture/CreateLecture";
import ReviewTask from "./components/admin/pages/ReviewTask/ReviewTask";
import SolvedTasks from "./components/admin/pages/SolvedTasks/SolvedTasks";


function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/lecture/:id" element={<Lecture />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/sandbox/:taskId" element={<Sandbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<AdminPanel />}>
          <Route path="create-task" element={<CreateTask />} />
          <Route path="create-lecture" element={<CreateLecture />} />
          <Route path="solved-tasks" element={<SolvedTasks />} />
          <Route path="review-task/:id" element={<ReviewTask />} />
        </Route>
      </Routes>
      <Footer />
    </Layout>
  );
}

export default function Root() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
}
