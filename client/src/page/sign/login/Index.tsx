import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '@component/card/basic/_styles';
import Form from './Form';
import '../SignPage.scss';

function Index() {
  return (
    <main className="SignPage">
      <Card className="Card">
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
    </main>
  );
}

export default Index;