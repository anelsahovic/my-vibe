import { Button } from '@/components/ui/button';
import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex flex-col items-center justify-center gap4">
      <h1>HOME PAGE</h1>
      <h2>Hello {user.email}</h2>
      <LogoutLink>
        <Button>Log Out</Button>
      </LogoutLink>
      <div className="pb-[1000px]"></div>
    </div>
  );
}
