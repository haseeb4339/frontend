import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Campaigns from "./Pages/Campaigns";
import CreateCampaign from "./Pages/CreateCampaign";
import Pipelines from "./Pages/Pipelines";
import Inbox from "./Pages/Inbox";
import EmailIntegration from "./Pages/EmailIntegration";
import LinkedinAccounts from "./Pages/LinkedinAccounts";
import AccountSettings from "./Pages/AccountSettings";
import Webhook from "./Pages/Webhook";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import UserSettings from "./Pages/UserSettings";
import WorkspacePreferences from "./Pages/WorkspacePreferences";
import BaseLayout from "./Components/Layout/BaseLayout";
// import SnackbarProvider from "react-simple-snackbar";
import { Provider } from "react-redux";
import store from "./store";
import GoogleCallBack from "./Components/Callback/GoogleCallBack";
import "react-toastify/dist/ReactToastify.css";
import ManageUsers from "./Pages/ManageUsers";
import { useState } from "react";
import PrivateRoute from './Components/PrivateRoute';
const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <BaseLayout>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route exact path="/account-settings" element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
              <Route exact path="/manage-users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
              <Route exact path="/linkedin-accounts" element={<PrivateRoute><LinkedinAccounts /></PrivateRoute>} />
              <Route exact path="/inbox" element={<PrivateRoute><Inbox /></PrivateRoute>} />
              <Route exact path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
              <Route exact path="/campaigns/create" element={<PrivateRoute><CreateCampaign /></PrivateRoute>} />
            </Routes>
          </BaseLayout>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;