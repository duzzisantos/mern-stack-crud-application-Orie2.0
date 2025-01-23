import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const VendorListByCategory = ({
  vendors,
  colDefs,
  rowSelection,
  pagination,
  pageSize,
  pageSizeSelector,
}) => {
  return (
    <div style={{ height: 500 }} className="table-small">
      <AgGridReact
        rowData={vendors()}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={pageSizeSelector}
      />
    </div>
  );
};

export default React.memo(VendorListByCategory);
