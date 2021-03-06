import { faBan, faEdit, faEye, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useEffect, useState } from 'react';
import { Modal, Table, Alert } from 'react-bootstrap';
import Loading from '../components/Loading/Loading';
import withAuth from '../HOC/withAuth';
import { apiAdmin } from '../services/apiAction/apiAdmin';
import styles from '../styles/Classes.module.scss';
import { getLocalUserName } from '../utils/common';

const AdminAccount = () => {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState('');

  const [confirmDeleteStudentIdModalShow, setConfirmDeleteStudentIdModalShow] = useState(false);
  const [changeStudentIdModalShow, setChangeStudentIdModalShow] = useState(false);
  const [confirmLockAccountModalShow, setConfirmLockAccountModalShow] = useState(false);
  const [confirmUnLockAccountModalShow, setConfirmUnLockAccountModalShow] = useState(false);

  const [usernameSelected, setUsernameSelected] = useState(null);

  const [studentIdChanging, setStudentIdChanging] = useState('');

  const [showGlobalErrMsg, setShowGlobalErrMsg] = useState(false);
  const [showGlobalSuccessMsg, setShowGlobalSuccessMsg] = useState(false);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = () => {
    setLoading(true);
    apiAdmin.getUsers({ userName: searchText }).then((res) => {
      let arrUsers: Array<IClasses> = res.data.content.data;
      console.log(arrUsers);
      setListUsers(arrUsers);
      setLoading(false);
    });
  };

  const handleSearch = () => {
    handleGetUsers();
  };

  const handleChangeStudentId = (username, newStudentId) => {
    apiAdmin
      .changeStudentId({ currentUser: getLocalUserName(), mssv: newStudentId, username: username })
      .then((res) => {
        if (res.data.result === 1) {
          setShowGlobalSuccessMsg(true);
          setShowGlobalErrMsg(false);
          setMessage('Thay ?????i MSSV th??nh c??ng');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('Thay ?????i MSSV th???t b???i, t???n t???i MSSV ho???c ???? c?? l???i x???y ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('Thay ?????i MSSV th???t b???i, t???n t???i MSSV ho???c ???? c?? l???i x???y ra');
      });
  };

  const handleLockAccount = (username) => {
    apiAdmin
      .lockAccount({ currentUser: getLocalUserName(), username: username })
      .then((res) => {
        if (res.data.result === 1) {
          setShowGlobalSuccessMsg(true);
          setShowGlobalErrMsg(false);
          setMessage('Kho?? t??i kho???n th??nh c??ng');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('Kho?? t??i kho???n th???t b???i ho???c ???? c?? l???i x???y ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('Kho?? t??i kho???n th???t b???i ho???c ???? c?? l???i x???y ra');
      });
  };

  const handleUnLockAccount = (username) => {
    apiAdmin
      .unlockAccount({ currentUser: getLocalUserName(), username: username })
      .then((res) => {
        if (res.data.result === 1) {
          setShowGlobalSuccessMsg(true);
          setShowGlobalErrMsg(false);
          setMessage('M??? kho?? t??i kho???n th??nh c??ng');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('M??? kho?? t??i kho???n th???t b???i ho???c ???? c?? l???i x???y ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('M??? kho?? t??i kho???n th???t b???i ho???c ???? c?? l???i x???y ra');
      });
  };

  const renderUserRow = (users: any) => {
    return users.map((studentAccount) => {
      return (
        <tr key={studentAccount.id}>
          <td>{studentAccount.id}</td>
          <td>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {!!studentAccount.studentID ? studentAccount.studentID : 'Kh??ng t???n t???i'}
              <div>
                <Button
                  appearance="outline"
                  status="Primary"
                  size="Small"
                  onClick={() => {
                    setUsernameSelected(studentAccount.username);
                    setChangeStudentIdModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  appearance="outline"
                  status="Danger"
                  size="Small"
                  onClick={() => {
                    setUsernameSelected(studentAccount.username);
                    setConfirmDeleteStudentIdModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          </td>
          <td>{`${!!studentAccount.firstName ? studentAccount.firstName : ''} ${
            !!studentAccount.middleName ? studentAccount.middleName : ''
          } ${!!studentAccount.lastName ? studentAccount.lastName : ''}`}</td>
          <td>{studentAccount.username}</td>
          <td>{studentAccount.email}</td>
          <td>{studentAccount.userStatus === 1 ? 'Ho???t ?????ng' : 'B??? kho??'}</td>
          <td>{new Date(studentAccount.createOn).toLocaleString()}</td>
          <td>
            {studentAccount.userStatus === 1 ? (
              <Button
                appearance="outline"
                status="Danger"
                size="Small"
                onClick={() => {
                  setUsernameSelected(studentAccount.username);
                  setConfirmLockAccountModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faBan} />
              </Button>
            ) : (
              <Button
                appearance="outline"
                status="Success"
                size="Small"
                onClick={() => {
                  setUsernameSelected(studentAccount.username);
                  setConfirmUnLockAccountModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faUnlock} />
              </Button>
            )}
          </td>
        </tr>
      );
    });
  };

  const handleCloseConfirmDeleteStudentIdModal = () => {
    setConfirmDeleteStudentIdModalShow(false);
  };

  const handleConfirmDeleteStudentIdModal = () => {
    setConfirmDeleteStudentIdModalShow(false);
    handleChangeStudentId(usernameSelected, '');
  };

  const handleCloseChangeStudentIdModal = () => {
    setChangeStudentIdModalShow(false);
  };

  const handleChangeStudentIdModal = () => {
    setChangeStudentIdModalShow(false);
    handleChangeStudentId(usernameSelected, studentIdChanging);
  };

  const handleCloseConfirmLockAccountModal = () => {
    setConfirmLockAccountModalShow(false);
  };

  const handleConfirmLockAccountModal = () => {
    setConfirmLockAccountModalShow(false);
    handleLockAccount(usernameSelected);
  };

  const handleCloseConfirmUnLockAccountModal = () => {
    setConfirmUnLockAccountModalShow(false);
  };

  const handleConfirmUnLockAccountModal = () => {
    setConfirmUnLockAccountModalShow(false);
    handleUnLockAccount(usernameSelected);
  };

  const renderConfirmDeleteStudentIdModal = () => {
    return (
      <Modal show={confirmDeleteStudentIdModalShow} onHide={handleCloseConfirmDeleteStudentIdModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xo?? MSSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          X??c nh???n xo?? m?? s??? sinh vi??n c???a t??i kho???n: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmDeleteStudentIdModal}>
            Hu???
          </Button>
          <Button status="Danger" onClick={handleConfirmDeleteStudentIdModal}>
            Xo??
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderChangeStudentIdModal = () => {
    return (
      <Modal show={changeStudentIdModalShow} onHide={handleCloseChangeStudentIdModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thay ?????i MSSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          X??c nh???n thay ?????i m?? s??? sinh vi??n c???a t??i kho???n: <strong>{usernameSelected}</strong>
          <label style={{ margin: '5px 0px' }}>Vui l??ng nh???p MSSV m???i:</label>
          <div>
            <InputGroup fullWidth size="Medium">
              <input
                placeholder="Nh???p MSSV"
                type="number"
                onChange={(e) => {
                  setStudentIdChanging(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Primary" onClick={handleChangeStudentIdModal}>
            L??u
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderConfirmLockAccountModal = () => {
    return (
      <Modal show={confirmLockAccountModalShow} onHide={handleCloseConfirmLockAccountModal}>
        <Modal.Header closeButton>
          <Modal.Title>Kho?? t??i kho???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          X??c nh???n kho?? t??i kho???n: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmLockAccountModal}>
            Hu???
          </Button>
          <Button status="Danger" onClick={handleConfirmLockAccountModal}>
            Kho??
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderConfirmUnLockAccountModal = () => {
    return (
      <Modal show={confirmUnLockAccountModalShow} onHide={handleCloseConfirmUnLockAccountModal}>
        <Modal.Header closeButton>
          <Modal.Title>M??? kho?? t??i kho???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          X??c nh???n m??? kho?? t??i kho???n: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmUnLockAccountModal}>
            Hu???
          </Button>
          <Button status="Success" onClick={handleConfirmUnLockAccountModal}>
            M??? kho??
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className={`${styles['classes']}`}>
      {showGlobalErrMsg ? (
        message && (
          <Alert variant="danger" onClose={() => setShowGlobalErrMsg(false)} dismissible>
            {message}
          </Alert>
        )
      ) : (
        <></>
      )}

      {showGlobalSuccessMsg ? (
        message && (
          <Alert variant="success" onClose={() => setShowGlobalSuccessMsg(false)} dismissible>
            {message}
          </Alert>
        )
      ) : (
        <></>
      )}

      <h5>Danh s??ch t??i kho???n</h5>

      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>T??m ki???m</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <InputGroup fullWidth size="Medium">
                    <input
                      type="text"
                      placeholder="Nh???p t??n ho???c email"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <Button fullWidth onClick={handleSearch}>
                    T??m ki???m
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
              <Row className={`${styles['classes__row']}`}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>M?? t??i kho???n</th>
                      <th>M?? sinh vi??n (n???u c??)</th>
                      <th>H??? t??n</th>
                      <th>T??n t??i kho???n</th>
                      <th>Email</th>
                      <th>Tr???ng th??i</th>
                      <th>Ng??y t???o</th>
                      <th>T??c v???</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={8}>
                          <Loading />
                        </td>
                      </tr>
                    )}
                    {renderUserRow(listUsers)}
                  </tbody>
                </Table>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {confirmDeleteStudentIdModalShow && renderConfirmDeleteStudentIdModal()}
      {changeStudentIdModalShow && renderChangeStudentIdModal()}
      {confirmLockAccountModalShow && renderConfirmLockAccountModal()}
      {confirmUnLockAccountModalShow && renderConfirmUnLockAccountModal()}
    </div>
  );
};
export default withAuth(AdminAccount);
