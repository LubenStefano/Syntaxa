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
import NotFound from "./components/pages/NotFound/NotFound";
import Sandbox from "./components/pages/Sandbox/Sandbox";
import Profile from "./components/pages/Profile/Profile";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";
import CreateTask from "./components/admin/pages/CreateTask/CreateTask";
import CreateLecture from "./components/admin/pages/CreateLecture/CreateLecture";
import ReviewTask from "./components/admin/pages/ReviewTask/ReviewTask";
import SolvedTasks from "./components/admin/pages/SolvedTasks/SolvedTasks";
import AuthGuard from "./Guards/AuthGuard";
import AlreadyLoggedInGuard from "./Guards/AlreadyLoggedInGuard";
import AdminGuard from "./Guards/AdminGuard";
import { NotificationProvider } from "./components/shared/Notification/Notification";


function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route element={<AlreadyLoggedInGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/lectures" element={<Lectures />} />
        <Route path="/tasks" element={<Tasks />} />


        <Route element={<AuthGuard />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/lecture/:id" element={<Lecture />} />
          <Route path="/sandbox/:taskId" element={<Sandbox />} />
          <Route path="/sandbox/saved/:taskId" element={<Sandbox />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/lecture/:id" element={<Lecture />} />
        </Route>

        <Route element={<AdminGuard />}>
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route path="create-task" element={<CreateTask />} />
            <Route path="create-lecture" element={<CreateLecture />} />
            <Route path="solved-tasks" element={<SolvedTasks />} />
            <Route path="review-task/:id" element={<ReviewTask />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default function Root() {
  return (
    <Router>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </Router>
  );
}
