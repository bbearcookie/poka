interface Condition {
  query: string | undefined; // WHERE 절에 들어갈 조건
  operator: 'AND' | 'OR' | ''; // 조건이 여러개일 때 다음 조건과 어떤 관계로 이을건지 지정
}

// WHERE절에 들어갈 조건을 편하게 추가하고 마지막에 문자열로 반환할 수 있는 클래스
export class WhereSQL {
  queries: Condition[];

  constructor() {
    this.queries = [];
  }

  // WHERE절 조건 추가.
  push(query: Condition) {
    this.queries.push(query);
  }

  // 조건절에 들어갈 텍스트 직접 입력해서 추가.
  pushString(str: string) {
    this.queries.push({
      query: str,
      operator: ''
    });
  }

  // 최종적으로 만들어진 조건을 가지고 WHERE절에 사용할 수 있는 문자열 형태로 변환.
  toString() {
    let result = '';

    this.queries.forEach((query, idx, queries) => {
      if (idx === 0) result += `WHERE ${query.query}`;
      else result += ` ${queries[idx-1].operator} ${query.query}`;
    });

    return result + ' ';
  }
}