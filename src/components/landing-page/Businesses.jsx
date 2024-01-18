import useGetBusinesses from "../../api/useGetBusinesses";

import BusinessCard from "../BusinessCard";

const Businesses = ({ search }) => {
  const { businesses } = useGetBusinesses();
  return (
    <div className="col-12 py-5 d-flex justify-content-center gap-2 flex-lg-row flex-sm-column flex-wrap">
      {businesses
        .flat()
        // .filter(
        //   (business) =>
        //     search.match(new RegExp(business.businessName, "gi")) ||
        //     search.match(new RegExp(business.category, "gi"))
        // )
        .map((entity) => (
          <BusinessCard
            key={entity._id}
            businessCategory={entity.category}
            address={entity.address}
            businessEmailAddress={entity.email}
            city={entity.city}
            state={entity.state}
            businessName={entity.businessName}
            phone={entity.phone}
          />
        ))}
    </div>
  );
};

export default Businesses;
