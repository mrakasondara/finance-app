import { BiMoney } from "react-icons/bi";
import { BsBank } from "react-icons/bs";

const TransactionsTable = () => {
  return (
    <table className="table table-sm md:table-md">
      <thead className="bg-main text-white">
        <tr>
          <th>Purpose</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Netflix</td>
          <td>July 19, 2025</td>
          <td>Rp. 65.000</td>
          <td className="flex items-center gap-3 text-main">
            <BiMoney className="text-xl" />
            Cash
          </td>
        </tr>
        <tr>
          <td>Transportation</td>
          <td>July 8, 2025</td>
          <td>Rp. 25.000</td>
          <td className="flex items-center gap-3 text-blue-500">
            <BsBank className="text-xl" />
            Transfer
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  );
};

export default TransactionsTable;
