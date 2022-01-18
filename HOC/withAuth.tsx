import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setMainToken } from '../redux/slices/appSlices/authSlice';
import { getToken, isAuthentication } from '../utils/common';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const dispatch = useDispatch();
      const mainToken = getToken();

      if (!mainToken) {
        dispatch(setMainToken(''));
        router.replace('/auth/login');
        return null;
      }

      dispatch(setMainToken(mainToken));
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
