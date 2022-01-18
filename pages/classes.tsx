import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import withAuth from '../HOC/withAuth';
import Layout from '../Layouts';
import styles from '../styles/Classes.module.scss';
import { ClassesList } from '../utils/dummy';

const Classes = () => {
  const [classes, setClasses] = useState(ClassesList);

  const renderClassTable = (classes: any) => {
    return (
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
          {classes.map((classItem) => {
            return (
              <tr>
                <td>{classItem.id}</td>
                <td>{classItem.name}</td>
                <td>{classItem.author}</td>
                <td>{classItem.createdDate?.toLocaleString()}</td>
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

  return (
    <div className={`${styles['classes']}`}>
      <h5>Danh sách lớp học</h5>
      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Tìm kiếm</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <InputGroup fullWidth size="Medium">
                    <input type="text" placeholder="Nhập tên lớp" />
                  </InputGroup>
                </Col>
              </Row>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <Button fullWidth>Tìm kiếm</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Danh sách lớp</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>{renderClassTable(classes)}</Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default withAuth(Classes);
