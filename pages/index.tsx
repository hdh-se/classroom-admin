import React from 'react';
import withAuth from '../HOC/withAuth';
import Layout from '../Layouts';
const Home = () => {
  return (
    <div>
      <h1>Chào mừng bạn đến với trang quản trị của Classroom</h1>
    </div>
  );
};
export default withAuth(Home);
