import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import SignUpPage from "./pages/student/SignUpPage";
import SignInPage from "./pages/student/SignInPage";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentLayout from "./components/Layouts/StudentLayout";
import StudentCoursePage from "./pages/student/StudentCoursePage";
import StudentProfile from "./pages/student/StudentProfile";
import StudentContentPage from "./pages/student/StudentContentPage";
import StudentQuizPage from "./pages/student/StudentQuizPage";
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminCourseContentPage from "./pages/admin/AdminCourseContentPage";
import AdminAddQuiz from "./pages/admin/AdminAddQuiz";
import ViewQuizPage from "./pages/admin/ViewQuizPage";
import ViewContentsPage from "./pages/admin/ViewContentsPage";
import AdminEditContent from "./pages/admin/AdminEditContent";
import AdminEditQuiz from "./pages/admin/AdminEditQuiz";
import AdminManagementPage from "./pages/admin/AdminMagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import { AuthProvider } from "./util/contexts/AuthContext";
import AdminSignIn from "./pages/admin/AdminSignInPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ActivateByOTPPage from "./pages/student/ActivateByOTPPage";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route Component={HomePage} path="/"></Route>
                <Route Component={AboutUsPage} path="/about"></Route>
                <Route Component={ContactUsPage} path="/contact"></Route>
                <Route
                    Component={PrivacyPolicyPage}
                    path="/privacy-policy"
                ></Route>
                <Route Component={SignUpPage} path="/sign-up"></Route>
                <Route Component={SignInPage} path="/sign-in"></Route>
                <Route
                    Component={ActivateByOTPPage}
                    path="/user/activate/:userId"
                ></Route>
                <Route
                    path="/student"
                    element={<StudentLayout></StudentLayout>}
                >
                    <Route
                        element={<StudentHomePage></StudentHomePage>}
                        path="home"
                    ></Route>
                    <Route
                        element={<StudentCoursePage></StudentCoursePage>}
                        path="course"
                    ></Route>
                    <Route
                        element={<StudentProfile></StudentProfile>}
                        path="profile"
                    ></Route>
                    <Route
                        element={<StudentContentPage></StudentContentPage>}
                        path="content/:contentId"
                    ></Route>
                    <Route
                        element={<StudentQuizPage></StudentQuizPage>}
                        path="quiz/:quizId"
                    ></Route>
                </Route>
                <Route
                    path="/admin/sign-in"
                    element={<AdminSignIn></AdminSignIn>}
                ></Route>
                <Route path="/admin" element={<AdminLayout></AdminLayout>}>
                    <Route
                        path="home"
                        element={<AdminManagementPage></AdminManagementPage>}
                    ></Route>
                    <Route
                        path="user-management"
                        element={<UserManagementPage></UserManagementPage>}
                    ></Route>
                    <Route
                        path="add-content"
                        element={
                            <AdminCourseContentPage></AdminCourseContentPage>
                        }
                    ></Route>
                    <Route
                        path="add-quiz"
                        element={<AdminAddQuiz></AdminAddQuiz>}
                    ></Route>
                    <Route
                        path="view-quizzes"
                        element={<ViewQuizPage></ViewQuizPage>}
                    ></Route>
                    <Route
                        path="view-contents"
                        element={<ViewContentsPage></ViewContentsPage>}
                    ></Route>
                    <Route
                        path="edit-content/:contentId"
                        element={<AdminEditContent></AdminEditContent>}
                    ></Route>
                    <Route
                        path="edit-quiz/:quizId"
                        element={<AdminEditQuiz></AdminEditQuiz>}
                    ></Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </AuthProvider>
    );
}
