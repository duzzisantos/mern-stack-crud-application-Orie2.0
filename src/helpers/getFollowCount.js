import { useMemo } from "react";

const useGetFollowCount = (arrayList, user) => {
  return useMemo(() => {
    const result = [];
    arrayList.forEach((follower) => {
      result.push(follower[0]);
    });

    return result.filter(
      (element) => !user.email.includes(element.followerName) // Because you cannot be following yourself
    );
  }, [arrayList, user.email]);
};

export default useGetFollowCount;
