import { faChevronDown, faChevronUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import withAuth from '../HOC/withAuth';
import axiosMain from '../services/axios/axiosMain';
import styles from '../styles/Classes.module.scss';

enum Sort {
  ASSENDING = '+',
  DESCENDING = '-',
}
const AdminAccount = () => {
  const LIMIT = 3;
  const [sort, setSort] = useState(Sort.ASSENDING);
  const CreateOn = 'CreateOn';

  const [adminAccounts, setAdminAccounts] = useState<IUserAccount[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(0);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    loadUsers({});
  }, []);

  const loadUsers = ({ userName = '', email = '' }) => {
    axiosMain
      .get(
        `/admin/user-account?StartAt=${LIMIT * (currentPage - 1)}&SortColumn=${
          sort + CreateOn
        }&MaxResults=${LIMIT}&Username=${userName}&Email=${email}`,
      )
      .then(({ data }) => {
        if (data.status === 200 && data.result === 1) {
          setErrorMessage('');
          console.log(data);
          const content = data.content;
          setAdminAccounts(content.data);
          setMaxPage(Math.ceil(content.total / LIMIT));
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((_) => setErrorMessage('Có lỗi trong quá trình tải dữ liệu'));
  };

  const renderClassTable = (classes: IUserAccount[]) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã tài khoản</th>
            <th>Họ tên</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th className="d-flex justify-content-between">
              <div>Ngày tạo </div>
              <FontAwesomeIcon
                icon={sort !== Sort.ASSENDING ? faChevronUp : faChevronDown}
                onClick={() => {
                  if (sort === Sort.ASSENDING) {
                    setSort(Sort.DESCENDING);
                  } else {
                    setSort(Sort.ASSENDING);
                  }
                  loadUsers({});
                }}
              ></FontAwesomeIcon>
            </th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((adminAccount) => {
            return (
              <tr key={adminAccount.id}>
                <td>{adminAccount.id}</td>
                <td>{adminAccount.fullname}</td>
                <td>{adminAccount.username}</td>
                <td>{adminAccount.email}</td>
                <td>{new Date(adminAccount.createOn).toLocaleString()}</td>
                <td>
                  <Button appearance="outline" size="Small">
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= maxPage; i++) {
      buttons.push(
        <li
          key={i}
          className={currentPage === i ? `page-item active` : 'page-item'}
          onClick={() => {
            setCurrentPage(i);
            loadUsers({});
          }}
        >
          <button className={`page-link`}>{i}</button>
        </li>,
      );
    }

    return (
      <div className="d-flex justify-content-end w-100">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={handleLoadPrevious}>
                Previous
              </button>
            </li>
            {buttons}
            <li className="page-item">
              <button className="page-link" onClick={handleLoadNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  const handleLoadPrevious = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
    loadUsers({});
  };

  const handleLoadNext = () => {
    if (currentPage >= maxPage) return;
    setCurrentPage((prev) => prev + 1);
    loadUsers({});
  };

  const handleSearch = () => {
    if (search === '') {
      setErrorMessage('Bạn chưa nhập nội dung tìm kiếm');
      return;
    }
    if (search.includes('@')) {
      loadUsers({
        email: search,
      });
    } else {
      loadUsers({
        userName: search,
      });
    }
  };

  return (
    <div className={`${styles['classes']}`}>
      <h5>Danh sách tài khoản admin</h5>

      {errorMessage !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Tìm kiếm</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 12 }}>
                  <InputGroup fullWidth size="Medium">
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc email"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className={`${styles['classes__row']} mt-2`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <Button onClick={handleSearch} fullWidth>
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Danh sách tài khoản</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>{renderClassTable(adminAccounts)}</Row>
            </CardBody>
          </Card>
          {renderPagination()}
        </Col>
      </Row>
    </div>
  );
};
export default withAuth(AdminAccount);
