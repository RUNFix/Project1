import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorModal } from 'src/utils/Modal';
import { TokenExists } from 'src/utils/Token';

export default function PrivateRoute() {
  const tokens = TokenExists();
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    let timer;

    if (!tokens) {
      setShowErrorModal(true);
      timer = setTimeout(() => {
        navigate('/home');
      }, 3100);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [tokens, navigate]);

  if (!tokens) {
    return <ErrorModal text={'Por favor inicia sesion'} />;
  }

  return <Outlet />;
}
