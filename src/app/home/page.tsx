import { Button } from '@/components/ui/button';
import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28 h-1/3 bg-card rounded-lg ">sidebar</div>
      </div>
      <div className="lg:col-span-6">
        <h1>HOME PAGE</h1>
        <h2>Hello {user.email}</h2>
        <LogoutLink>
          <Button>Log Out</Button>
        </LogoutLink>
        <div className="pb-[1000px]"></div>
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28 h-1/3 bg-card rounded-lg ">
          Who to follow
        </div>
      </div>
    </div>
  );
}
