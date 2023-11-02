import { useEffect, ReactElement } from 'react';

import { useHistory } from 'react-router-dom';
import { useUserData } from '../../contexts/UserData';

import { PrivateRoutes } from '../../routes';

import { Container } from './styles';

import authService from '../../services/auth';

const Main = (): ReactElement => {
  const { userData, setUserData } = useUserData();

  const history = useHistory();

  const getRole = (role: number) => {
    switch (role) {
      case 2:
        return 'admin';
      default:
        return 'user';
    }
  };

  // Effect that authenticates the user
  useEffect(() => {
    async function get() {
      if (!userData) {
        await authService
          .isUserAdmin()
          .catch((e: any) => console.error(e.message))
          .then((response: any) => {
            const { role } = response?.data;

            // Sets the user type
            setUserData({
              ...userData,
              role: getRole(role),
            });
          });
      }
    }
    get();
  }, [history, userData, setUserData]);

  return (
    <>
      {userData && (
        <>
          <Container>
            <PrivateRoutes userData={userData} />
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
