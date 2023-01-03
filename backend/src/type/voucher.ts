export interface VoucherType {
  voucher_id: number;
  photocard_id: number;
  user_id: number;
  state: 'available' | 'trading' | 'shipping' | 'shipped';
}