const UserContentTemplate = ({ contentBody, contentImage }) => {
  return (
    <div className="d-flex flex-column vstack gap-3 p-3 shadow-sm rounded-2">
      <div className="d-flex justify-content-between text-secondary">
        {contentImage}
      </div>
      <article>{contentBody}</article>
    </div>
  );
};

export default UserContentTemplate;
