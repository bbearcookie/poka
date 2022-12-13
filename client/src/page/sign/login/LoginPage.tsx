import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import Form from './Form';
import '../SignPage.scss';

interface Props {}
const DefaultProps = {};

function LoginPage({  }: Props) {
  return (
    <div className="SignPage">
      <Card styles={{ width: "40rem" }}>
        <CardHeader>
          <section className="title-section">
            <img src="/poka_logo.png" alt="아이콘" />
            <h1 className="title-label">Poka</h1>
            <p className="description">아이돌 포토카드 교환 플랫폼</p>
          </section>
        </CardHeader>
        <CardBody>
          <section className="content-section">
            <h1 className="title-label">로그인</h1>
            <Form />
          </section>
        </CardBody>
        <CardFooter>
          <section className="link-section">
            <Link to="/signup">새로운 계정 만들기</Link>
          </section>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;