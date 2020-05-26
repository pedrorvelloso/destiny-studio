export default interface Donation {
  id: number;
  amount: number;
  from: string;
  message: string;
  created_at: string;
  reviewer?: {
    name: string;
  };
}
