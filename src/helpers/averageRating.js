export const averageRating = (email, businesses, rating) => {
  const output = [];
  businesses.flat().forEach((business) => {
    if (business.email === email) {
      for (const file of rating) {
        if (file.email === email) {
          output.push(file.ratingStars);
        }
      }
    }
  });
  return (
    output.map((element) => element).reduce((a, b) => a + b, 0) / rating.length
  );
};
