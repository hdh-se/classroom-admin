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
          setMessage('Thay đổi MSSV thành công');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('Thay đổi MSSV thất bại, tồn tại MSSV hoặc đã có lỗi xảy ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('Thay đổi MSSV thất bại, tồn tại MSSV hoặc đã có lỗi xảy ra');
      });
  };

  const handleLockAccount = (username) => {
    apiAdmin
      .lockAccount({ currentUser: getLocalUserName(), username: username })
      .then((res) => {
        if (res.data.result === 1) {
          setShowGlobalSuccessMsg(true);
          setShowGlobalErrMsg(false);
          setMessage('Khoá tài khoản thành công');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('Khoá tài khoản thất bại hoặc đã có lỗi xảy ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('Khoá tài khoản thất bại hoặc đã có lỗi xảy ra');
      });
  };

  const handleUnLockAccount = (username) => {
    apiAdmin
      .unlockAccount({ currentUser: getLocalUserName(), username: username })
      .then((res) => {
        if (res.data.result === 1) {
          setShowGlobalSuccessMsg(true);
          setShowGlobalErrMsg(false);
          setMessage('Mở khoá tài khoản thành công');
          handleGetUsers();
        } else {
          setShowGlobalSuccessMsg(false);
          setShowGlobalErrMsg(true);
          setMessage('Mở khoá tài khoản thất bại hoặc đã có lỗi xảy ra');
        }
      })
      .catch((e) => {
        setShowGlobalSuccessMsg(false);
        setShowGlobalErrMsg(true);
        setMessage('Mở khoá tài khoản thất bại hoặc đã có lỗi xảy ra');
      });
  };

  const renderUserRow = (users: any) => {
    return users.map((studentAccount) => {
      return (
        <tr key={studentAccount.id}>
          <td>{studentAccount.id}</td>
          <td>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {!!studentAccount.studentID ? studentAccount.studentID : 'Không tồn tại'}
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
          <td>{studentAccount.userStatus === 1 ? 'Hoạt động' : 'Bị khoá'}</td>
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
          <Modal.Title>Xoá MSSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xoá mã số sinh viên của tài khoản: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmDeleteStudentIdModal}>
            Huỷ
          </Button>
          <Button status="Danger" onClick={handleConfirmDeleteStudentIdModal}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderChangeStudentIdModal = () => {
    return (
      <Modal show={changeStudentIdModalShow} onHide={handleCloseChangeStudentIdModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi MSSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận thay đổi mã số sinh viên của tài khoản: <strong>{usernameSelected}</strong>
          <label style={{ margin: '5px 0px' }}>Vui lòng nhập MSSV mới:</label>
          <div>
            <InputGroup fullWidth size="Medium">
              <input
                placeholder="Nhập MSSV"
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
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderConfirmLockAccountModal = () => {
    return (
      <Modal show={confirmLockAccountModalShow} onHide={handleCloseConfirmLockAccountModal}>
        <Modal.Header closeButton>
          <Modal.Title>Khoá tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận khoá tài khoản: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmLockAccountModal}>
            Huỷ
          </Button>
          <Button status="Danger" onClick={handleConfirmLockAccountModal}>
            Khoá
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderConfirmUnLockAccountModal = () => {
    return (
      <Modal show={confirmUnLockAccountModalShow} onHide={handleCloseConfirmUnLockAccountModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mở khoá tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận mở khoá tài khoản: <strong>{usernameSelected}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button status="Basic" onClick={handleCloseConfirmUnLockAccountModal}>
            Huỷ
          </Button>
          <Button status="Success" onClick={handleConfirmUnLockAccountModal}>
            Mở khoá
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

      <h5>Danh sách tài khoản</h5>

      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Tìm kiếm</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <InputGroup fullWidth size="Medium">
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc email"
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
              <Row className={`${styles['classes__row']}`}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã tài khoản</th>
                      <th>Mã sinh viên (nếu có)</th>
                      <th>Họ tên</th>
                      <th>Tên tài khoản</th>
                      <th>Email</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Tác vụ</th>
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
