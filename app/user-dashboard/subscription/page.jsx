import SubscriptionTable from "@/components/Admin/subscription/SubscriptionTable";
import TransactionTable from "@/components/Admin/subscription/TransactionTable";


export default function Subscription() {
  return (
    <div className="p-6 pt-0 bg-gray-50 min-h-screen">

      <SubscriptionTable />

      <div className="mt-8">
        <TransactionTable />
      </div>
    </div>
  );
}