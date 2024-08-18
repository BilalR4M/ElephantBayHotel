import CheckTable from "./components/CheckTable";

import { columnsDataCheck } from "./variables/columnsData";

import tableDataCheck from "./variables/tableDataCheck.json";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>
    </div>
  );
};

export default Tables;
