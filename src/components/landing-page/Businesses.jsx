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
}) => {
  return (
    <div className="col-12 py-5 d-flex justify-content-center gap-2 flex-lg-row flex-sm-column flex-wrap">
      {narrowSearch.length > 0
        ? narrowSearch.map((entity) => (
            <BusinessCard
              key={entity._id}
              businessCategory={entity.category}
              address={entity.address}
              businessEmailAddress={entity.email}
              city={entity.city}
              state={entity.state}
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
        : generalSearch.length > 0
        ? generalSearch.map((entity) => (
            <BusinessCard
              key={entity._id}
              businessCategory={entity.category}
              address={entity.address}
              businessEmailAddress={entity.email}
              city={entity.city}
              state={entity.state}
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
