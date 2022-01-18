import React, { useEffect } from 'react';
import withAuth from '../HOC/withAuth';
import Layout from '../Layouts';
import { removeToken } from '../utils/common';
const Home = () => {
  useEffect(() => {
    removeToken();
    window.location.reload();
  }, []);

  return (
    <div>
      <h1>Đang đăng xuất...</h1>
    </div>
  );
};
export default withAuth(Home);
