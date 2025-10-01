const SubscriptionsTable = () => {
  return (
    <table className="table table-sm md:table-md">
      <thead className="bg-main text-white">
        <tr>
          <th>Subscription</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Netflix</td>
          <td>July 19, 2025</td>
          <td>Rp. 65.000</td>
          <td className="flex items-center gap-3 text-main">Cash</td>
          <td>
            <span className="bg-main/20 rounded-lg text-main px-2 py-0.5">
              Paid
            </span>
          </td>
        </tr>
        <tr>
          <td>Transportation</td>
          <td>July 8, 2025</td>
          <td>Rp. 25.000</td>
          <td className="flex items-center gap-3 text-blue-500">Transfer</td>
          <td>
            <span className="bg-red-500/20 rounded-lg text-red-500 px-2 py-0.5">
              Failed
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SubscriptionsTable;
