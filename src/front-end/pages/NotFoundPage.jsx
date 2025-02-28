import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 當 countdown 值變為 0，導向首頁
    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(interval); // 清除計時器
  }, [countdown, navigate]);

  return (
    <>
      <div className="container">
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{ height: '55vh' }}
        >
          <h2 className="display-1 d-none d-md-block">ERROR 404</h2>
          <h2 className="display-5 d-block d-md-none">ERROR 404</h2>
          <p className="fs-5 fs-md-3 mb-8">你所訪問的頁面並不存在 (･ω´･ )</p>
          <p className="fs-6 mb-3">
            頁面將在 <strong className="text-primary">{countdown}</strong>{' '}
            秒後自動返回首頁
          </p>
          <div>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              返回首頁
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
