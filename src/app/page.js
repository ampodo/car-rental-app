import axios from "axios";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookeStore = cookies();
    const token = cookeStore.get("token").value;
    const response = await axios.get(
      `${process.env.domain}/api/users/currentuser`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <h1 className="text-xl font-medium text-black">Home Page</h1>
      {currentUser && <h1> You are signed in as {currentUser.name}</h1>}
    </div>
  );
}
