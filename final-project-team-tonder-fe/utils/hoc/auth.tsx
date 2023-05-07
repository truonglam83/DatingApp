// HOC/withAuth.jsx
import { ACCESS_TOKEN, USER } from '@/utils/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// the below function could be any of your custom implementation for verifying the token. I've added it as means of explanantion

const withAuth = (WrapperComponent: any) => {
  const parseJWT = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  };
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState<boolean>(false);

    useEffect(() => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      // if no accessToken was found,then we redirect to "/" page.

      if (!accessToken) {
        Router.replace('/');
      } else if (accessToken) {
        const decodedJWT = parseJWT(accessToken);

        // if the token has expired, remove it from localStorage and redirect to "/"
        if (decodedJWT.exp * 1000 < Date.now()) {
          localStorage.clear();
          Router.replace('/');
          setVerified(false);
        } else {
          setVerified(true);
        }
      } else {
        // If the token was fraud we first remove it from localStorage and then redirect to "/"
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER);
        Router.replace('/');
      }
    }, []);

    if (verified) {
      return <WrapperComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
