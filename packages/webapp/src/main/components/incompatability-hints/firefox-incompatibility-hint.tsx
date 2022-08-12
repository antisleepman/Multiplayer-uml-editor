import React, { ReactElement, useState } from 'react';
import { Alert } from 'react-bootstrap';

export const FirefoxIncompatibilityHint: React.FC = (): ReactElement | null => {
  const [show, setShow] = useState(true);
  return (
    <Alert variant="warning" onClose={() => setShow(false)} dismissible show={show}>
      {' '}
      Firefox поддерживается не полностью — некоторые функции могут не работать. Пожалуйста, используйте другой браузер (последнюю версию Chrome или
       Safari), чтобы убедиться, что все функции работают должным образом.
    </Alert>
  );
};
