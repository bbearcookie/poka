import { client } from '@util/request';
import { ParamType as ChangePrimeAddressParam } from '@api/mutation/shipping/useChangePrimeAddress';
import { ParamType as modifyShippingAddressParam } from '@api/mutation/shipping/useModifyShippingAddress';
import { ParamType as addShippingAddressParam } from '@api/mutation/shipping/useAddShippingAddress';
import { ParamType as deleteShippingAddressParam } from '@api/mutation/shipping/useDeleteShippingAddress';
import { ParamType as addShippingParam } from '@api/mutation/shipping/useAddShippingRequest';
import { ParamType as deleteShippingRequestParam } from '@api/mutation/shipping/useDeleteShippingRequest';

export const fetchUserShippingAddress = async (userId: number) => {
  const url = `/api/user/${userId}/shipping-address`;
  const res = await client.get(url);
  return res.data;
}

export const addShippingAddress = async (param: addShippingAddressParam) => {
  const url = `/api/user/${param.userId}/shipping-address`;
  const res = await client.post(url, param.body);
  return res;
}

export const changePrimeAddress = async (param: ChangePrimeAddressParam) => {
  const url = `/api/shipping/address/${param.addressId}/prime`;
  const res = await client.patch(url);
  return res;
}

export const modifyShippingAddress = async (param: modifyShippingAddressParam) => {
  const url = `/api/shipping/address/${param.addressId}`;
  const res = await client.put(url, param.body);
  return res;
}

export const deleteShippingAddress = async (param: deleteShippingAddressParam) => {
  const url = `/api/shipping/address/${param.addressId}`;
  const res = await client.delete(url);
  return res;
}

export const fetchShippingRequestDetail = async (requestId: number) => {
  const url = `/api/shipping/request/${requestId}`;
  const res = await client.get(url);
  return res.data;
}

export const addShippingRequest = async (param: addShippingParam) => {
  const url = `/api/shipping/request`;
  const res = await client.post(url, param.body);
  return res;
}

export const deleteShippingRequest = async (param: deleteShippingRequestParam) => {
  const url = `/api/shipping/request/${param.requestId}`;
  const res = await client.delete(url);
  return res;
}