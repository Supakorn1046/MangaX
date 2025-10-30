import React from 'react';
import styles from './MangaXLogin.module.css'; 

const MangaXProfileDetails = ({ onBackToRegister, onRegistrationComplete }) => { 
    
    const handleSaveProfile = (e) => {
        e.preventDefault();
        
        alert('บันทึกข้อมูลสำเร็จ! คุณสามารถเข้าสู่ระบบได้แล้ว');
        
        onRegistrationComplete(); 
    };

    return (
        <div className={styles.loginFormPanel}>
            <form onSubmit={handleSaveProfile}> 
                <p className={styles.sectionHeading}>ข้อมูลส่วนตัว</p>
                <p className={styles.orText} style={{ textAlign: 'left', marginTop: '10px' }}>
                    ข้อมูลที่คุณกรอกจะถูกเก็บเป็นความลับ <br/>
                    จะใช้สำหรับการจัดข้อมูลผู้ใช้เท่านั้น
                </p>

                <p className={styles.orText} style={{ textAlign: 'left', marginTop: '20px' }}>คุณเป็น</p>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <label><input type="radio" name="gender" value="female" /> ผู้หญิง</label>
                    <label><input type="radio" name="gender" value="male" /> ผู้ชาย</label>
                    <label><input type="radio" name="gender" value="other" /> อื่นๆ</label>
                    <label><input type="radio" name="gender" value="prefer_not_to_say" /> ไม่ระบุ</label>
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>วันเกิด</p>
                <div className={styles.inputGroup} style={{ display: 'flex', gap: '10px' }}>
                    <select className={styles.selectInput} style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">วัน</option>
                        {Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                    </select>
                    <select className={styles.selectInput} style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">เดือน</option>
                        {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((month, i) => (
                            <option key={month} value={i + 1}>{month}</option>
                        ))}
                    </select>
                    <select className={styles.selectInput} style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">ปี</option>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>ที่อยู่</p>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="" />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>รหัสไปรษณีย์</p>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="" />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>หมายเลขโทรศัพท์</p>
                <div className={styles.inputGroup} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className={styles.flagIcon}>🇹🇭</span>
                    <input type="tel" placeholder="" style={{ flex: 1 }} />
                </div>

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