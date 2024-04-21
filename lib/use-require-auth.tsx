import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../app/context/auth/route';

const useRequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      push('/signin');
    }
  }, [isLoggedIn, push]);

  return isLoggedIn;
};

export default useRequireAuth;