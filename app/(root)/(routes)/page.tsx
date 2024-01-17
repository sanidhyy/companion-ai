import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
