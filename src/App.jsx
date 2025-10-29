import React from 'react';
import HomepageProfile from './Web/HomepageProfile'; // นำเข้าคอมโพเนนต์ UserProfile

function App() {
    // ในสถานการณ์จริง คุณอาจจะดึงข้อมูลผู้ใช้จาก API ที่นี่
    // หรือใช้ Context API/Redux สำหรับการจัดการสถานะ

    // ถ้าคุณต้องการส่งข้อมูลผู้ใช้งานจริงเข้าทาง props (สมมติว่าดึงมาจากเซิร์ฟเวอร์แล้ว)
    // const realUserData = { /* ... ข้อมูลผู้ใช้จริง ... */ };

    return (
        <div className="App">
            {/* แสดงผลคอมโพเนนต์ UserProfile */}
            <HomepageProfile 
                // ถ้ามีข้อมูลจริง ให้ส่ง props เข้าไปแบบนี้:
                // user={realUserData} 
            />
        </div>
    );
}

export default App;