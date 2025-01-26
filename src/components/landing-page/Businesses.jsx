import BusinessCard from "../BusinessCard";

const Businesses = ({
  narrowSearch,
  generalSearch,
  user,
  showModal,
  handleShow,
  handleClose,
  showMessageModal,
  grabEmail,
  handleCloseMessage,
  handleShowMessage,
  ratingScore,
  data,
}) => {
  return (
    <div className="col-12 p-3 d-flex justify-content-start gap-2 flex-lg-row flex-sm-column flex-wrap">
      {narrowSearch.length > 0
        ? narrowSearch.map((entity) => (
            <BusinessCard
              key={entity._id}
              ratingScore={(
                ratingScore(data, entity.email)
                  .map((r) => r?.ratingStars)
                  .reduce((y, z) => y + z, 0) /
                ratingScore(data, entity.email).length
              ).toFixed(1)}
              businessCategory={entity.category}
              address={entity.address}
              businessEmailAddress={entity.email}
              city={entity.city}
              state={entity.state}
              businessName={entity.businessName}
              photo={entity?.photos}
              phone={entity.phone}
              user={user}
              showModal={showModal}
              handleShow={() => handleShow(entity.email)}
              handleClose={handleClose}
              showMessageModal={showMessageModal}
              grabEmail={grabEmail} //should be grab user ID
              handleCloseMessage={handleCloseMessage}
              handleShowMessage={() => handleShowMessage(entity.email)}
            />
          ))
        : generalSearch.length > 0
        ? generalSearch.map((entity) => (
            <BusinessCard
              key={entity._id}
              ratingScore={(
                ratingScore(data, entity.email)
                  .map((r) => r?.ratingStars)
                  .reduce((y, z) => y + z, 0) /
                ratingScore(data, entity.email).length
              ).toFixed(1)}
              businessCategory={entity.category}
              address={entity.address}
              businessEmailAddress={entity.email}
              city={entity.city}
              state={entity.state}
              photo={entity?.photos}
              businessName={entity.businessName}
              phone={entity.phone}
              user={user}
              showModal={showModal}
              handleShow={() => handleShow(entity.email)}
              handleClose={handleClose}
              showMessageModal={showMessageModal}
              grabEmail={grabEmail} //should be grab user ID
              handleCloseMessage={handleCloseMessage}
              handleShowMessage={() => handleShowMessage(entity.email)}
            />
          ))
        : null}
    </div>
  );
};

export default Businesses;
