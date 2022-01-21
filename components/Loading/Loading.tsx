import { Spinner } from 'react-bootstrap';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles['loading']}>
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loading;
