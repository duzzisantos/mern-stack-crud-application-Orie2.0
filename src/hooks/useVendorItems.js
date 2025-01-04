import { useState, useMemo, useCallback } from "react";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetRegions from "../api/useGetRegion";
export const useVendorItems = (user, state) => {
  const { businesses } = useGetBusinesses(user?.accessToken);
  const { regions } = useGetRegions(user?.accessToken);

  //Return businesses according to category
  const vendors = useCallback(() => {
    const result = [];
    businesses.flat().forEach((business) => {
      if (business.category.includes(state) || business.state.includes(state)) {
        result.push(business);
      }
    });
    return result;
  }, [businesses, state]);

  //return unique business category list
  const vendorCategories = useCallback(() => {
    return [...new Set(businesses.flat().map((el) => el.category))];
  }, [businesses]);

  //define table columns
  // eslint-disable-next-line no-unused-vars
  const [colDefs, setColDefs] = useState([
    { field: "businessName", filter: true, floatingFilter: true },
    { field: "address", filter: true, floatingFilter: true },
    { field: "city", filter: true, floatingFilter: true },
    { field: "state", filter: true, floatingFilter: true },
    { field: "category", filter: true, floatingFilter: true },
    { field: "businessPhone", filter: true, floatingFilter: true },
  ]);

  //define rows to be selected
  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  //define pagination settings
  const [pagination, pageSize, pageSizeSelector] = [
    true,
    500,
    [200, 500, 1000],
  ];

  //return variables we will consume from the custom hook
  return {
    colDefs,
    rowSelection,
    vendors,
    vendorCategories,
    regions,
    pagination,
    pageSize,
    pageSizeSelector,
  };
};
