import axios from 'axios';

// 포트원 액세스 토큰 발급
export async function getToken() {
  const token = await axios({
    url: 'https://api.iamport.kr/users/getToken',
    method: 'post',
    headers: { 'Content-Type': 'application/json' }, 
    data: {
      imp_key: process.env.IAMPORT_API_KEY,
      imp_secret: process.env.IAMPORT_API_SECRET
    }
  });

  return token.data.response.access_token;
}

// 결제 정보 조회
export async function getPaymentData(impUID: string, accessToken: string) {
  const result = await axios({
    url: `https://api.iamport.kr/payments/${impUID}`,
    method: 'get',
    headers: { 'Authorization': accessToken }
  });
  
  return result.data.response;
}

// 결제 환불
export async function refundPayment(impUID: string, amount: number, reason: string, accessToken: string) {
  const result = await axios({
    url: 'https://api.iamport.kr/payments/cancel',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    data: {
      reason,
      imp_uid: impUID,
      amount,
      checksum: amount
    }
  });

  return result.data;
}