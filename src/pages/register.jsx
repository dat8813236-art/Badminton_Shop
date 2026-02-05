import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.find((u) => u.email === email);
    if (isExist) {
      alert("Email đã tồn tại");
      return;
    }

    users.push({
      email,
      password,
      role: "user"
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center login-wrapper">
      <div className="card shadow login-card">
        <div className="card-body">
          <h3 className="text-center mb-4">Đăng ký</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">
              Đăng ký
            </button>
            <p className="text-center mt-3">
  Đã có tài khoản? <a href="/login">Đăng nhập</a>
</p>

          </form>
        </div>
      </div>
    </div>
  );
}
