import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import * as memberAPI from '@api/memberAPI';
import * as photoAPI from '@api/photoAPI';
import { BACKEND } from '@util/commonAPI';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Select from '@component/form/Select';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';

interface PhotoEditorProps {
  photo: typeof photoAPI.getPhotoDetail.resType;
  photocardId: number;
  closeEditor: () => void;
  children?: React.ReactNode;
}
const PhotoEditorDefaultProps = {};

function PhotoEditor({ photo, photocardId, closeEditor, children }: PhotoEditorProps & typeof PhotoEditorDefaultProps) {
  interface FormType {
    name: string;
    groupId: number;
    memberId: number;
    image: Image;
  };
  const [form, setForm] = useState<FormType>({
    name: photo?.name ? photo.name : '',
    image: {
      file: null,
      previewURL: photo?.image_name ? `${BACKEND}/image/photo/${photo.image_name}` : '',
      initialURL: photo?.image_name ? `${BACKEND}/image/photo/${photo.image_name}` : ''
    },
    groupId: photo?.group_id ? photo.group_id : 0,
    memberId: photo?.group_id ? photo.member_id : 0
  });
  const [formMessage, setFormMessage] = useState<{
    [k in keyof FormType]: string;
  }>({
    name: '',
    image: '',
    groupId: '',
    memberId: ''
  });
  const queryClient = useQueryClient();

  const groupQuery =
  useQuery<typeof groupAPI.getAllGroupList.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  const memberQuery = 
  useQuery<typeof groupAPI.getMembersOfGroup.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.members(form.groupId), () => groupAPI.getMembersOfGroup.axios(form.groupId));

  // 데이터 수정 요청
  const putMutation = useMutation(photoAPI.putPhoto.axios, {
    onSuccess:(res: AxiosResponse<typeof photoAPI.putPhoto.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.photoKeys.all);
      queryClient.invalidateQueries(queryKey.photoKeys.detail(photocardId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType<keyof FormType>>) => {
      console.log(err);
      if (err.response?.data.message) toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      else toast.error(err.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = formMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setFormMessage({ ...formMessage, ...message });
    }
  });

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setFormMessage({ ...formMessage, [e.target.name]: '' });
  }, [form, formMessage]);

  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    setForm({...form, image: img});
    img.file && setFormMessage({ ...formMessage, image: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
  }, [form, formMessage]);

  // 그룹 선택 변경
  const onChangeGroup = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      groupId: Number(e.target.value),
      memberId: 0
    });
    setFormMessage({ ...formMessage, groupId: ''});
  }, [form, setForm, formMessage]);

  // 멤버 선택 변경
  const onChangeMember = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      groupId: form.groupId,
      memberId: Number(e.target.value)
    });
    setFormMessage({ ...formMessage, memberId: ''});
  }, [form, setForm, formMessage]);

  // 전송 이벤트
  const onSubmit = useCallback(() => {
    putMutation.mutate({
      photocardId,
      data: {
        ...form,
        image: form.image.file
      }
    });
  }, [form, photocardId, putMutation]);

  return (
    <Card className="PhotoEditor" marginBottom="5em">
      <CardBody>
        <section className="photo-section">
          <section className="image-section">
            <ImageUploader
              value={form.image}
              message={formMessage.image}
              onChange={changeImage}
              styles={{ width: '150px', height: "224px" }}
              imageStyles={{ width: '150px', height: "224px" }}
            />
          </section>
          <section className="description-section">
            <section className="input-section">
              <p className="label">포토카드 이름</p>
              <Input
                type="text"
                name="name"
                value={form.name}
                styles={{
                  width: "100%",
                  height: "2.5em"
                }}
                onChange={changeInput}
              >
                {formMessage.name && <InputMessage>{formMessage.name}</InputMessage>}
              </Input>
            </section>

            <section className="input-section">
              <p className="label">그룹</p>
              <Select
                value={form.groupId}
                onChange={onChangeGroup}
                styles={{
                  width: "100%",
                  height: "2.5rem"
                }}
              >
                <option value={0}>선택</option>
                {groupQuery.data?.groups.map((item) => (
                  <option key={item.group_id} value={item.group_id}>{item.name}</option>
                ))}
              </Select>
              {formMessage.groupId && <InputMessage>{formMessage.groupId}</InputMessage>}
            </section>

            <section className="input-section">
              <p className="label">멤버</p>
              <Select
                value={form.memberId}
                onChange={onChangeMember}
                styles={{
                  width: "100%",
                  height: "2.5rem"
                }}
              >
                <option value={0}>선택</option>
                {memberQuery.data?.members.map((item) => (
                  <option key={item.member_id} value={item.member_id}>{item.name}</option>
                ))}
              </Select>
              {formMessage.memberId && <InputMessage>{formMessage.memberId}</InputMessage>}
            </section>

            <section className="button-section">
              <Button
                styles={{
                  width: "fit-content",
                  theme: "primary-outlined",
                  margin: "1em 1em 0 0",
                  padding: "0.7em 1.3em",
                  iconMargin: "1em"
                }}
                onClick={closeEditor}
              >취소</Button>
              <Button
                styles={{
                  width: "fit-content",
                  theme: "primary",
                  marginTop: "1em",
                  padding: "0.7em 1.3em",
                  iconMargin: "1em"
                }}
                onClick={onSubmit}
              >저장</Button>
            </section>
          </section>
        </section>
      </CardBody>
    </Card>
  );
}

PhotoEditor.defaultProps = PhotoEditorDefaultProps;
export default PhotoEditor;