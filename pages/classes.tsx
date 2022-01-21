import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Table } from 'react-bootstrap';
import Loading from '../components/Loading/Loading';
import withAuth from '../HOC/withAuth';
import Layout from '../Layouts';
import { apiAdmin } from '../services/apiAction/apiAdmin';
import styles from '../styles/Classes.module.scss';
import { getLocalUserName } from '../utils/common';

const Classes = () => {
  const [classes, setClasses] = useState(Array<IClasses>());
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState('');

  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [classDetailSelected, setClassDetailSelected] = useState<IClasses>(null);
  const [classDetailAssignments, setClassDetailAssignments] = useState([]);

  useEffect(() => {
    handleGetClass();
  }, []);

  const handleGetClass = () => {
    setLoading(true);
    apiAdmin.getClasses({ currentUser: getLocalUserName(), title: searchText }).then((res) => {
      let arrClasses: Array<IClasses> = res.data.content.data;
      console.log(arrClasses);
      setClasses(arrClasses);
      setLoading(false);
    });
  };

  const handleSearch = () => {
    handleGetClass();
  };

  const handleSelectdClass = (id) => {
    setLoadingDetail(true);
    setDetailModalShow(true);
    apiAdmin
      .getClassDetail({ currentUser: getLocalUserName(), id: id })
      .then((res) => {
        let course: IClasses = res.data.content.course;
        setClassDetailSelected(course);

        apiAdmin
          .getClassAssignments({ courseId: course.id, currentUser: getLocalUserName() })
          .then((resAssignments) => {
            let assignments = resAssignments.data?.content?.data;

            setClassDetailAssignments(assignments);

            setLoadingDetail(false);
          })
          .catch((err) => {
            setLoadingDetail(false);
          });
      })
      .catch((err) => {
        setMessage('Không thể xem thông tin chi tiết của lớp này, đã có lỗi xảy ra');
        setLoadingDetail(false);
      });
  };

  const renderClassRow = (classes: Array<IClasses>) => {
    return classes.map((classItem) => {
      return (
        <tr key={classItem.classCode}>
          <td>{classItem.id}</td>
          <td>{classItem.title}</td>
          <td>{classItem.owner}</td>
          <td>{new Date(classItem.createOn).toLocaleString()}</td>
          <td>
            <Button
              appearance="outline"
              size="Small"
              onClick={() => {
                handleSelectdClass(classItem.id);
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
        </tr>
      );
    });
  };

  const renderModal = () => {
    return (
      <Modal
        size="xl"
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Chi tiết lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDetail ? (
            <Loading />
          ) : (
            <>
              {!!!message && (
                <>
                  <Row className={`${styles['classes__row']}`}>
                    <Col breakPoint={{ xs: 12, lg: 4 }}>
                      <div className={`${styles['classes__label']}`}>
                        <label>Tên lớp học</label>
                      </div>
                      <InputGroup fullWidth size="Medium">
                        <input type="text" value={classDetailSelected.title} />
                      </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, lg: 4 }}>
                      <div className={`${styles['classes__label']}`}>
                        <label>Tên giáo viên</label>
                      </div>
                      <InputGroup fullWidth size="Medium">
                        <input type="text" value={classDetailSelected.owner} />
                      </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 12, lg: 4 }}>
                      <div className={`${styles['classes__label']}`}>
                        <label>Mã lớp học</label>
                      </div>
                      <InputGroup fullWidth size="Medium">
                        <input type="text" value={classDetailSelected.classCode} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className={`${styles['classes__row']}`}>
                    <Col>
                      <div className={`${styles['classes__label']}`}>
                        <label>Mô tả</label>
                      </div>
                      <InputGroup fullWidth size="Medium">
                        <textarea rows={4} value={classDetailSelected.description} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className={`${styles['classes__row']}`}>
                    <Col>
                      {classDetailAssignments.length > 0 ? (
                        <>
                          <div className={`${styles['classes__label']}`}>
                            <label>Cấu trúc điểm</label>
                          </div>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Tên bài tập</th>
                                <th>Điểm tối đa</th>
                                <th>Phần trăm</th>
                              </tr>
                            </thead>

                            <tbody>
                              {classDetailAssignments.map((assignment) => {
                                return (
                                  <tr key={assignment.id}>
                                    <td>{assignment.name}</td>
                                    <td>{assignment.maxGrade}</td>
                                    <td>{assignment.percent.toFixed(2)}%</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </>
              )}
              {!!message && <Alert variant={'danger'}>{message}</Alert>}
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className={`${styles['classes']}`}>
      {detailModalShow && renderModal()}
      <h5>Danh sách lớp học</h5>
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
                      placeholder="Nhập tên lớp"
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
            <header>Danh sách lớp</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã lớp</th>
                      <th>Tên</th>
                      <th>GV Tạo</th>
                      <th>Ngày tạo</th>
                      <th>Tác vụ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={5}>
                          <Loading />
                        </td>
                      </tr>
                    )}
                    {renderClassRow(classes)}
                  </tbody>
                </Table>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default withAuth(Classes);
