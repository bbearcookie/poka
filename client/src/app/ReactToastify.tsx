import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // react-toastify CSS 가져오기

interface ReactToastifyProps {
  children?: React.ReactNode;
}

const ReactToastifyDefaultProps = {};

function ReactToastify({ children }: ReactToastifyProps & typeof ReactToastifyDefaultProps) {
  return (
    <ToastContainer />
  );
}

ReactToastify.defaultProps = ReactToastifyDefaultProps;

export default ReactToastify;