import { GET } from ".";

const fetchMe = async () => {
  return await GET({ url: "user/me" });
};

export { fetchMe };
