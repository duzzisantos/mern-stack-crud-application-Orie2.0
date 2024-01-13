const ContentPhotos = ({ content }) => {
  const photoList = () => {
    const output = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i].contentImage) {
        output.push(content[i].contentImage);
      }
    }
    return output;
  };

  return (
    <div className="d-flex flex-column vstack gap-2 p-3 shadow-sm rounded-2">
      <small>Content Photos</small>

      {photoList()?.map((item) => (
        <img src={item.image} alt="Content" key={item._id} />
      ))}
    </div>
  );
};

export default ContentPhotos;
