import IRoute from "../interfaces/route";
import ChangePage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import ResetPasswordPage from "../pages/auth/reset";
import HomePage from "../pages/home"

const routes: IRoute[] = [
    {
        path: "/",
        exact: true,
        component: HomePage,
        name: "Home Page",
        protected: true
    },
    {
        path: "/register",
        exact: true,
        component: RegisterPage,
        name: "Register Page",
        protected: false
    },
    {
        path: "/login",
        exact: true,
        component: LoginPage,
        name: "Login Page",
        protected: false
    },
    {
        path: "/change",
        exact: true,
        component: ChangePage,
        name: "Login Page",
        protected: true
    },
    {
        path: "/logout",
        exact: true,
        component: LogoutPage,
        name: "Logout Page",
        protected: true
    },
    {
        path: "/forgot",
        exact: true,
        component: ForgotPasswordPage,
        name: "Logout Page",
        protected: false
    },
    {
        path: "/reset",
        exact: true,
        component: ResetPasswordPage,
        name: "Logout Page",
        protected: false
    },
]

export default routes;