import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setMainToken } from '../redux/slices/appSlices/authSlice';
import { getToken, removeToken } from '../utils/common';

const withUnAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const dispatch = useDispatch();
      const mainToken = getToken();

      if (mainToken) {
        router.replace('/');
        return null;
      }

      dispatch(setMainToken(''));
      removeToken();
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withUnAuth;
