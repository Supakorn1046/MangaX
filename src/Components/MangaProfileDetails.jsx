import React, { useState, useEffect } from 'react';
import styles from './MangaXLogin.module.css'; 

// URL ฐานของ API Address
const API_ADDRESS_URL = 'http://localhost:5000/api/address';

const MangaXProfileDetails = ({ onBackToRegister, onRegistrationComplete }) => { 
    
    // State สำหรับเก็บข้อมูลฟอร์ม
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');

    // 1. ดึง User ID ที่เพิ่งสมัครเสร็จ
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setUserId(user._id); // (ต้องมี _id ที่ได้จาก /api/users/register)
        } else {
            setError('ไม่พบข้อมูลผู้ใช้ที่ลงทะเบียน กรุณาย้อนกลับ');
        }
    }, []);

    // 2. ฟังก์ชันบันทึกข้อมูล (เรียก API)
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setError('');

        if (!userId) {
            setError('เกิดข้อผิดพลาด: ไม่พบ User ID');
            return;
        }
        
        if (!address || !phone) {
            setError('กรุณากรอกที่อยู่และหมายเลขโทรศัพท์');
            return;
        }

        // 1. ดึงข้อมูลผู้ใช้จาก localStorage (ที่มี name จากหน้า Register)
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const userProfileName = userInfo ? userInfo.name : ""; 

        // 2. แยกชื่อ-นามสกุล
        let firstName = "";
        let lastName = "";
        if (userProfileName) {
            const nameParts = userProfileName.split(' ');
            firstName = nameParts[0] || "";
            lastName = nameParts.slice(1).join(' ') || "";
        }

        // 3. เตรียมข้อมูลสำหรับ POST /api/address (อัปเดต)
        const addressData = {
            userId: userId,
            address: address,
            phone: phone,
            firstName: firstName, 
            lastName: lastName,  
            isDefault: true 
        };

        try {
            const response = await fetch(API_ADDRESS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressData)
            });

            if (response.ok) {
                alert('บันทึกข้อมูลสำเร็จ! คุณสามารถเข้าสู่ระบบได้แล้ว');
                onRegistrationComplete();
            } else {
                const errData = await response.json();
                setError(errData.message || 'ไม่สามารถบันทึกที่อยู่ได้');
            }
        } catch (err) {
            console.error('Save profile error:', err);
            setError('การเชื่อมต่อล้มเหลว ไม่สามารถบันทึกข้อมูลได้');
        }
    };

    return (
        <div className={styles.loginFormPanel}>
            <form onSubmit={handleSaveProfile}> 
                <p className={styles.sectionHeading}>ข้อมูลส่วนตัว</p>
                <p className={styles.orText} style={{ textAlign: 'left', marginTop: '10px' }}>
                    ข้อมูลที่คุณกรอกจะถูกเก็บเป็นความลับ <br/>
                    จะใช้สำหรับการจัดข้อมูลผู้ใช้เท่านั้น
                </p>
                
                {/* แสดงข้อผิดพลาด (ถ้ามี) */}
                {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>ที่อยู่ *</p>
                <div className={styles.inputGroup}>
                    <input 
                        type="text" 
                        placeholder="กรอกที่อยู่สำหรับจัดส่ง" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>หมายเลขโทรศัพท์ *</p>
                <div className={styles.inputGroup} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className={styles.flagIcon}>🇹🇭</span>
                    <input 
                        type="tel" 
                        placeholder="เช่น 0812345678" 
                        style={{ flex: 1 }} 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                {/* ... (ส่วน Checkbox และข้อตกลง) ... */}
                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <input type="checkbox" style={{ marginRight: '10px', transform: 'translateY(3px)' }} />
                        เข้าสู่เป็นสมาชิกพรีเมี่ยม
                    </label>
                    <p style={{ fontSize: '0.85em', color: '#666', marginLeft: '25px', marginTop: '-5px', marginBottom: '10px' }}>
                        เมื่อคุณยินยอมเป็นสมาชิกพรีเมี่ยม ร้านจะตามคุณ <br/>
                        รับและบริการพิเศษที่จัดและเป็นส่วนตัวของคุณได้
                    </p>
                    <label style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <input type="checkbox" style={{ marginRight: '10px', transform: 'translateY(3px)' }} />
                        ยินดีรับข้อมูลข่าวสารอัพเดทและโปรโมชั่นจาก ร้าน
                    </label>
                </div>
                
                <p style={{ fontSize: '0.9em', color: '#666', marginTop: '30px' }}>
                    คุณเข้าใจและยอมรับ <a href="#" style={{ color: '#E65239', textDecoration: 'none' }}>ข้อตกลงและเงื่อนไขใช้งาน</a> แล้ว
                </p>
                
                <button type="submit" className={`${styles.primaryBtn} ${styles.loginBtn}`} style={{ marginTop: '10px' }}>
                    บันทึกและสมัครสมาชิก
                </button>
                
                <button 
                    type="button" 
                    onClick={onBackToRegister} 
                    className={`${styles.primaryBtn} ${styles.createAccountBtn}`}
                    style={{ marginTop: '10px', backgroundColor: '#808080', border: 'none' }}
                >
                    ย้อนกลับ
                </button>
            </form>
        </div>
    );
};

export default MangaXProfileDetails;