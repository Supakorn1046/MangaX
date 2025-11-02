// ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const isLoggedIn = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const location = useLocation();

    if (!isLoggedIn) {
        // บันทึก path ที่พยายามจะเข้าไว้ เพื่อกลับมาหลังล็อกอิน
        localStorage.setItem('redirectPath', location.pathname);
        return <Navigate to="/" replace />;
    }

    // ถ้าหน้าต้องการสิทธิ์ Admin เท่านั้น
    if (adminOnly && !isAdmin) {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        return <Navigate to="/homepage" replace />;
    }

    return children;
};

export default ProtectedRoute;