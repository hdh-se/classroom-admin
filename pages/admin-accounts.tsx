import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useState } from 'react';
import { Form, Modal, Table } from 'react-bootstrap';
import withAuth from '../HOC/withAuth';
import axiosMain from '../services/axios/axiosMain';
import styles from '../styles/Classes.module.scss';
import { isValidEmail, isValidPhone } from '../utils/common';

enum Sort {
  ASSENDING = '+',
  DESCENDING = '-',
}

interface FormCreateAdminState extends IParamAddNewAdmin {
  errorMessage?: string;
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
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState<FormCreateAdminState>({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    studentID: '',
    normalizedDisplayName: '',
    personalEmail: '',
    personalEmailConfirmed: true,
    normalizedPersonalEmail: '',
    personalPhoneNumber: '',
  } as FormCreateAdminState);
  React.useEffect(() => {
    loadUsers({});
  }, []);

  const loadUsers = ({ userName = '', email = '' }) => {
    axiosMain
      .get(
        `/admin/admin-account?StartAt=${LIMIT * (currentPage - 1)}&SortColumn=${
          sort + CreateOn
        }&MaxResults=${LIMIT}&Username=${userName}&Email=${email}`,
      )
      .then(({ data }) => {
        if (data.status === 200 && data.result === 1) {
          setErrorMessage('');
          const content = data.content;
          setAdminAccounts(content.data);
          setMaxPage(Math.ceil(content.total / LIMIT));
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((_) => setErrorMessage('C?? l???i trong qu?? tr??nh t???i d??? li???u'));
  };

  const renderClassTable = (classes: IUserAccount[]) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>M?? t??i kho???n</th>
            <th>H??? t??n</th>
            <th>T??n t??i kho???n</th>
            <th>Email</th>
            <th className="d-flex justify-content-between">
              <div>Ng??y t???o </div>
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
            {/* <th>T??c v???</th> */}
          </tr>
        </thead>
        <tbody>
          {classes.map((adminAccount) => {
            return (
              <tr key={adminAccount.id}>
                <td>{adminAccount.id}</td>
                <td>{`${!!adminAccount.firstName ? adminAccount.firstName : ''} ${
                  !!adminAccount.middleName ? adminAccount.middleName : ''
                } ${!!adminAccount.lastName ? adminAccount.lastName : ''}`}</td>
                <td>{adminAccount.username}</td>
                <td>{adminAccount.email}</td>
                <td>{new Date(adminAccount.createOn).toLocaleString()}</td>
                {/* <td>
                  <Button appearance="outline" size="Small">
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const handleShowDialogCreateAdminAccount = () => {
    setShow(true);
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
      setErrorMessage('B???n ch??a nh???p n???i dung t??m ki???m');
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
  const handleClose = () => {
    setShow(false);
  };

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    let errorMessage = undefined;
    if (name === 'email' && formState.email) {
      if (!isValidEmail(value)) {
        errorMessage = 'Email kh??ng h???p l???';
      }
    }

    if (name === 'phoneNumber' && formState.phoneNumber) {
      if (!isValidPhone(value)) {
        errorMessage = 'S??? ??i???n tho???i kh??ng h???p l???';
      }
    }

    if (name === 'username' && formState.username) {
      if (value === '') {
        errorMessage = 'User name kh??ng th??? ????? tr???ng';
      }
    }

    setFormState({
      ...formState,
      [name]: value,
      errorMessage: !errorMessage ? undefined : errorMessage,
    });
  };

  const handleSubmitSaveAdmin = () => {
    if (
      !formState.username ||
      !formState.email ||
      !formState.password ||
      !formState.phoneNumber ||
      !formState.firstName ||
      !formState.lastName ||
      !formState.middleName ||
      formState.errorMessage !== undefined
    ) {
      setFormState({
        ...formState,
        errorMessage: 'C??n c?? l???i x???y ra kh??ng th??? submit ???????c',
      });
      return;
    }

    axiosMain
      .post('/admin/admin-account/create-account', formState)
      .then(({ data }) => {
        console.log(data);
        loadUsers({});
      })
      .catch(() => setErrorMessage('C?? l???i x???y ra trong qu?? tring t???o t??i kho???n admin'));

    handleClose();
  };
  return (
    <div className={`${styles['classes']}`}>
      <h5>Danh s??ch t??i kho???n admin</h5>

      {errorMessage !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>T??m ki???m</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 12 }}>
                  <InputGroup fullWidth size="Medium">
                    <input
                      type="text"
                      placeholder="Nh???p t??n ho???c email"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className={`${styles['classes__row']} mt-2 d-flex justify-content-between`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <Button onClick={handleSearch} fullWidth>
                    T??m ki???m
                  </Button>
                </Col>

                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <Button onClick={handleShowDialogCreateAdminAccount} fullWidth>
                    T???o admin
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Danh s??ch t??i kho???n</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>{renderClassTable(adminAccounts)}</Row>
            </CardBody>
          </Card>
          {renderPagination()}
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>T???o admin m???i</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formState.errorMessage !== undefined && (
            <div className="alert alert-danger">{formState.errorMessage}</div>
          )}
          <Form onChange={handleFormChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control name="username" type="text" placeholder="Nh???p v??o username" />
              <Form.Text className="text-muted text-danger"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control name="email" type="email" placeholder="Nh???p v??o email" />
              <Form.Text className="text-muted text-danger"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control name="phoneNumber" type="tel" placeholder="Nh???p v??o s??? ??i???n tho???i" />
              <Form.Text className="text-muted text-danger"></Form.Text>
            </Form.Group>
            <Row>
              <Col breakPoint={{ lg: 4, md: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control name="lastName" type="text" placeholder="H???" />
                  <Form.Text className="text-muted text-danger"></Form.Text>
                </Form.Group>
              </Col>
              <Col breakPoint={{ lg: 4, md: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control name="middleName" type="text" placeholder="T??n ?????m" />
                  <Form.Text className="text-muted text-danger"></Form.Text>
                </Form.Group>
              </Col>
              <Col breakPoint={{ lg: 4, md: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control name="firstName" type="tel" placeholder="T??n" />
                  <Form.Text className="text-muted text-danger"></Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control name="password" type="password" placeholder="Nh???p v??o m???t kh???u" />
              <Form.Text className="text-muted text-danger"></Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ????ng
          </Button>
          <Button variant="primary" onClick={handleSubmitSaveAdmin}>
            T???o
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default withAuth(AdminAccount);
