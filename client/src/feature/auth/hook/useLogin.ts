import { useNavigate } from 'react-router';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { LoginToken } from '@type/user';
import { login as loginFn } from '@api/api/auth';
import { useAppDispatch } from '@app/redux/store';
import { login, logout } from '@feature/auth/authSlice';
import { saveUserToStorage, removeUserFromStorage } from '../authStorage';

interface BodyType {
  username: string;
  password: string;
}

interface ResType {
  message: string;
  user: LoginToken;
}

export default function useLogin<TParam>(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<ResType>,
      AxiosError<ResponseError<TParam>>,
      BodyType,
      unknown
    >,
    'mutationFn'
  >
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>(
    body => loginFn(body),
    {
      onSuccess: (res, variables, context) => {
        dispatch(login(res.data.user));
        saveUserToStorage(res.data.user);

        switch (res.data.user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'user':
            navigate('/');
            break;
          default:
            navigate('/');
            break;
        }

        options?.onSuccess && options?.onSuccess(res, variables, context);
      },
      onError: (err, variables, context) => {
        dispatch(logout());
        removeUserFromStorage();
        options?.onError && options?.onError(err, variables, context);
      },
    }
  );
}
