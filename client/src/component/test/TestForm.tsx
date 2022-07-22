import React, { useState, useMemo, useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import * as testAPI from '@api/testAPI';
import * as queryKey from '@util/queryKey';

interface TestFormProps {
  children?: React.ReactNode;
}

const TestFormDefaultProps = {};

function TestForm({ children }: TestFormProps & typeof TestFormDefaultProps) {
  const initialForm = useMemo(() => ({
    author: '',
    content: ''
  }), []);
  const [form, setForm] = useState(initialForm);
  const queryClient = useQueryClient();

  // 데이터 추가 요청
  const postData = useMutation(testAPI.postTestData, {
    onSuccess: (result) => {
      setForm(initialForm);
      queryClient.invalidateQueries(queryKey.testListKeys.all);
    },
    onError: (err: Error) => {
      console.error(err);
    }
  });

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }, [form]);

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    postData.mutate(form);
  }, [form, postData]);

  return (
    <form onSubmit={onSubmit}>
      <h1>작성 폼</h1>
      <span>작성자 </span>
      <input type="text" name="author" value={form.author} onChange={changeInput} />
      <br/>
      <span>내용 </span>
      <input type="text" name="content" value={form.content} onChange={changeInput} />
      <br/>
      <button type="submit">전송</button>
      {postData.isError && <div>{postData.error.message}</div>}
    </form>
  );
}

TestForm.defaultProps = TestFormDefaultProps;

export default TestForm;