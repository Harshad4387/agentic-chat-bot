// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signin = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post('https://1637-2409-40c2-5003-e892-3d94-d421-26d7-30b2.ngrok-free.app/api/auth/login', form);
//       localStorage.setItem('token', res.data.token);
//       alert("Login successful");
//       // window.location.href = '/dashboard';
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//       <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 24, color: '#3b82f6', letterSpacing: 1 }}>Agentic Voice Chatbot System</h1>
//       <div style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', minWidth: 340 }}>
//         <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>Sign In</h2>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//           <label style={{ fontWeight: 500, color: '#334155' }}>
//             Email
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </label>
//           <label style={{ fontWeight: 500, color: '#334155' }}>
//             Password
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//               style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </label>
//           <button type="submit" disabled={loading} style={{ background: '#3b82f6', color: '#fff', fontWeight: 600, padding: '12px 0', border: 'none', borderRadius: 8, fontSize: 18, marginTop: 8, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>
//         <div style={{ textAlign: 'center', marginTop: 18, color: '#64748b' }}>
//           Don't have an account?{' '}
//           <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 500 }}>Sign Up</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signin = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Important: Enable credentials to receive cookies
//       const res = await axios.post(
//         'https://0011-2409-40c2-5054-2e1-3558-d96-e3b6-65c4.ngrok-free.app/api/auth/login',
//         form,
//         { withCredentials: true } // 👈 Accept cookies from backend
//       );
      
//       alert("Login successful");
//       // Optionally redirect to protected route
//       // window.location.href = '/dashboard';
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//       <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 24, color: '#3b82f6', letterSpacing: 1 }}>Agentic Voice Chatbot System</h1>
//       <div style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', minWidth: 340 }}>
//         <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>Sign In</h2>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//           <label style={{ fontWeight: 500, color: '#334155' }}>
//             Email
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </label>
//           <label style={{ fontWeight: 500, color: '#334155' }}>
//             Password
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//               style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </label>
//           <button type="submit" disabled={loading} style={{ background: '#3b82f6', color: '#fff', fontWeight: 600, padding: '12px 0', border: 'none', borderRadius: 8, fontSize: 18, marginTop: 8, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>
//         <div style={{ textAlign: 'center', marginTop: 18, color: '#64748b' }}>
//           Don't have an account?{' '}
//           <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 500 }}>Sign Up</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;



// src/pages/Signin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'https://ef24-2409-40c2-5054-2e1-3558-d96-e3b6-65c4.ngrok-free.app/api/auth/login',
        form,
        { withCredentials: true }
      );
      alert("Login successful");
      navigate('/chat'); // ✅ Redirect to chatbot
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 24, color: '#3b82f6', letterSpacing: 1 }}>Agentic Voice Chatbot System</h1>
      <div style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', minWidth: 340 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label style={{ fontWeight: 500, color: '#334155' }}>
            Email
            <input type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
          </label>
          <label style={{ fontWeight: 500, color: '#334155' }}>
            Password
            <input type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
          </label>
          <button type="submit" disabled={loading} style={{ background: '#3b82f6', color: '#fff', fontWeight: 600, padding: '12px 0', border: 'none', borderRadius: 8, fontSize: 18, marginTop: 8 }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 18, color: '#64748b' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 500 }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
