import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useVendorItems } from "../hooks/useVendorItems";
ModuleRegistry.registerModules([AllCommunityModule]);

const VendorListByCategory = ({ user, state }) => {
  const {
    vendors,
    rowSelection,
    colDefs,
    pageSize,
    pageSizeSelector,
    pagination,
  } = useVendorItems(user, state);

  return (
    <div style={{ height: 500 }}>
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
