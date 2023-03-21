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

function SignupPage({  }: Props) {
  return (
    <main className="SignPage">
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
            <h1 className="title-label">회원가입</h1>
            <Form />
          </section>
        </CardBody>
        <CardFooter>
          <section className="link-section">
            <Link to="/login">기존의 계정으로 로그인</Link>
          </section>
        </CardFooter>
      </Card>
    </main>
  );
}

export default SignupPage;