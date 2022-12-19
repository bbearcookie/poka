import { client } from '@util/request';
import { ParamType as ChangePrimeAddressParam } from '@api/mutation/address/useChangePrimeAddress';
import { ParamType as modifyShippingAddressParam } from '@api/mutation/address/useModifyShippingAddress';
import { ParamType as addShippingAddressParam } from '@api/mutation/address/useAddShippingAddress';
import { ParamType as deleteShippingAddressParam } from '@api/mutation/address/useDeleteShippingAddress';

export const fetchUserShippingAddress = async (userId: number) => {
  const url = `/api/user/${userId}/shipping-address`;
  const res = await client.get(url);
  return res.data;
}

export const changePrimeAddress = async (param: ChangePrimeAddressParam) => {
  const url = `/api/shipping-address/${param.addressId}/prime`;
  const res = await client.patch(url);
  return res;
}

export const modifyShippingAddress = async (param: modifyShippingAddressParam) => {
  const url = `/api/shipping-address/${param.addressId}`;
  const res = await client.put(url, param.body);
  return res;
}

export const addShippingAddress = async (param: addShippingAddressParam) => {
  const url = `/api/user/${param.userId}/shipping-address`;
  const res = await client.post(url, param.body);
  return res;
}

export const deleteShippingAddress = async (param: deleteShippingAddressParam) => {
  const url = `/api/shipping-address/${param.addressId}`;
  const res = await client.delete(url);
  return res;
}