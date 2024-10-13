//AuthContext.tsx
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import { userSignInAPI } from "../api/user.api";
import { adminSignInAPI } from "../api/admin.api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// Define a type for the user information
type User = {
    userId: string;
    name: string;
    email: string;
    token: string;
    fullName?: string;
    role: string;
};

// Define a type for the context that includes user data and functions for sign-in and sign-out
type AuthContextType = {
    user: User | null;
    signIn: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => Promise<boolean>;
    adminSignIn: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => Promise<boolean>;
    signOut: () => void;
    loading: boolean;
};

// Create the default value forAuthContext (null initially)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to useAuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// UserProvider component to manage the user state and provide context
type UserProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Sign-in function to set the user data
    const signIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        const res: any = await userSignInAPI({ email, password });
        if (res) {
            if (res.status == "ERROR") {
                message.error(res.message);
                return false;
            } else if (res.status == "ACTIVATE_EMAIL") {
                navigate("/user/activate/" + res.userId);
                return false;
            } else {
                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...res, role: "user" })
                );
                setUser({ ...res, role: "user" });
                return true;
            }
        } else {
            return false;
        }
    };
    const adminSignIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        const res: any = await adminSignInAPI({ email, password });
        if (res) {
            if (res.status == "ERROR") {
                message.error(res.message);
                return false;
            } else {
                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...res, role: "admin" })
                );
                setUser({ ...res, role: "admin" });
                return true;
            }
        }
        return false;
    };

    const navigate = useNavigate();
    // Sign-out function to clear the user data
    const signOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "");
            user ? setUser(user) : setUser(null);
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, signIn, signOut, adminSignIn, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
