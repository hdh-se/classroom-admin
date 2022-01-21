import React, { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import withAuth from '../../HOC/withAuth';
import withUnAuth from '../../HOC/withUnAuth';
import Layout from '../../Layouts';
import { removeLocalFullName, removeLocalUserName, removeToken } from '../../utils/common';
const Logout = () => {
  useEffect(() => {
    removeToken();
    removeLocalUserName();
    removeLocalFullName();
    window.location.reload();
  }, []);

  return (
    <div>
      <Loading></Loading>
    </div>
  );
};
export default withAuth(Logout);
