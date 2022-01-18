import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, Col, InputGroup, Row } from '@paljs/ui';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import withAuth from '../HOC/withAuth';
import Layout from '../Layouts';
import styles from '../styles/Classes.module.scss';
import { AdminAccountList } from '../utils/dummy';

const AdminAccount = () => {
  const [adminAccounts, setAdminAccounts] = useState(AdminAccountList);

  const renderClassTable = (classes: any) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã tài khoản</th>
            <th>Họ tên</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((adminAccount) => {
            return (
              <tr>
                <td>{adminAccount.id}</td>
                <td>{adminAccount.fullname}</td>
                <td>{adminAccount.username}</td>
                <td>{adminAccount.email}</td>
                <td>{adminAccount.createdDate?.toLocaleString()}</td>
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
      <h5>Danh sách tài khoản admin</h5>
      <Row>
        <Col breakPoint={{ xs: 12, lg: 12 }}>
          <Card>
            <header>Tìm kiếm</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>
                <Col breakPoint={{ xs: 12, lg: 2 }}>
                  <InputGroup fullWidth size="Medium">
                    <input type="text" placeholder="Nhập tên" />
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
            <header>Danh sách tài khoản</header>
            <CardBody>
              <Row className={`${styles['classes__row']}`}>{renderClassTable(adminAccounts)}</Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default withAuth(AdminAccount);
