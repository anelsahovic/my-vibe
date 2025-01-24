import { getUserFollowers, getUserFollowing } from '@/actions/user.action';
import SearchForm from '@/components/SearchForm';
import SearchFormReset from '@/components/SearchFormReset';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserSmallCard from '@/components/UserSmallCard';

type Props = {
  searchParams: Promise<{ search: string }>;
};

export default async function FriendsRoute({ searchParams }: Props) {
  const { search } = await searchParams;

  const followers = await getUserFollowers();
  const following = await getUserFollowing();

  const filteredFollowers = followers.filter(
    (user) =>
      search &&
      (user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredFollowing = following.filter(
    (user) =>
      search &&
      (user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase()))
  );

  const followersToDisplay = search ? filteredFollowers : followers;
  const followingToDisplay = search ? filteredFollowing : following;
  return (
    <div className="container py-10 flex justify-center items-center mx-auto">
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
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="w-full max-w-[500px] flex items-center justify-center">
              <SearchForm page="/friends" />
            </div>

            {search && (
              <div className="flex flex-col items-center gap-2">
                <p className=" text-sm text-neutral-400 text-center">
                  Showing results for{'  '}
                  <span className="font-semibold">&quot;{search}&quot;</span>
                </p>
                <SearchFormReset page="/friends" />
              </div>
            )}

            {followersToDisplay.length > 0 ? (
              <div className="w-full max-w-[500px] flex flex-col gap-4">
                {followersToDisplay.map((user) => (
                  <UserSmallCard
                    key={user.username}
                    user={user}
                    btnSize="default"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No followers found
              </div>
            )}
          </div>
        </TabsContent>

        {/* users that user follows */}
        <TabsContent value="following" className="mt-6">
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="w-full max-w-[500px] flex items-center justify-center">
              <SearchForm page="/friends" />
            </div>

            {search && (
              <div className="flex flex-col items-center gap-2">
                <p className=" text-sm text-neutral-400 text-center">
                  Showing results for{'  '}
                  <span className="font-semibold">&quot;{search}&quot;</span>
                </p>
                <SearchFormReset page="/friends" />
              </div>
            )}

            {followingToDisplay.length > 0 ? (
              <div className="w-full max-w-[500px]">
                {followingToDisplay.map((user) => (
                  <UserSmallCard
                    key={user.username}
                    user={user}
                    btnSize="default"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No following users found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
