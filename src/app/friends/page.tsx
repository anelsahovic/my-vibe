import { getUserFollowers, getUserFollowing } from '@/actions/user.action';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserSmallCard from '@/components/UserSmallCard';

export default async function FriendsRoute() {
  const followers = await getUserFollowers();
  const following = await getUserFollowing();
  return (
    <div className="container py-10 flex justify-center items-center">
      <Tabs defaultValue="followers" className="w-full">
        <TabsList className="w-full justify-center border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="followers"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
          >
            Followers
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
          >
            Following
          </TabsTrigger>
        </TabsList>

        {/* followers */}
        <TabsContent value="followers" className="mt-6">
          <div className="space-y-6">
            {followers.length > 0 ? (
              followers.map((user) => (
                <UserSmallCard
                  key={user.username}
                  user={user}
                  btnSize="default"
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No followers yet
              </div>
            )}
          </div>
        </TabsContent>

        {/* users that user follows */}
        <TabsContent value="following" className="mt-6">
          <div className="space-y-6">
            {following.length > 0 ? (
              following.map((user) => (
                <UserSmallCard key={user.id} user={user} btnSize="default" />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You don&apos;t follow anyone
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
