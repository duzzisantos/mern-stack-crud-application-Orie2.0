export const averageRating = (rating, businessEmail) => {
  const output = [];

  for (const file of rating) {
    if (file?.ratedUser === businessEmail) {
      //change this to UID instead of business email after the refactor
      output.push(file.ratingStars);
    }
  }

  return (
    output.map((element) => element).reduce((a, b) => a + b, 0) / rating.length
  );
};
