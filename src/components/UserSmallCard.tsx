import { UserSmallCardType } from '@/lib/types';
import { Card } from './ui/card';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { isFollowedBy, isFollowing } from '@/actions/profile.action';
import RemoveUserButton from './RemoveUserButton';
import Link from 'next/link';

type Props = {
  user: UserSmallCardType;
  btnSize: 'sm' | 'default' | 'lg' | 'icon';
  showRemoveButton?: boolean;
};

export default async function UserSmallCard({
  user,
  btnSize,
  showRemoveButton = true,
}: Props) {
  let showRemoveBtn = await isFollowedBy(user.id);
  const isFollowingUser = await isFollowing(user.id);
  if (showRemoveBtn) {
    showRemoveBtn = showRemoveButton as boolean;
  }
  return (
    <Card className="flex items-center justify-between w-full p-2 bg-card-foreground shadow-sm border">
      {/* left-user info */}
      <div className="flex items-center justify-center space-x-2 overflow-hidden">
        <Link href={`/profile/${user.username}`}>
          <div className="size-9 rounded-full overflow-hidden relative">
            <Image
              src={user.image ? user.image : '/images/user-alt.png'}
              alt="user-image"
              fill={true}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col items-start justify-start truncate">
          <Link href={`/profile/${user.username}`}>
            <h2 className="text-base font-medium text-neutral-300 -mb-1">
              {user.name}
            </h2>
          </Link>
          <Link href={`/profile/${user.username}`}>
            <p className="text-sm text-neutral-400">@{user.username}</p>
          </Link>
          <p className="text-xs text-neutral-500">
            {user._count.followers} followers
          </p>
        </div>
      </div>

      {/* right - follow button */}
      <div className="flex items-center gap-2">
        {isFollowingUser ? (
          <FollowButton
            text="Unfollow"
            variant="secondary"
            size={btnSize}
            userId={user.id}
          />
        ) : (
          <FollowButton
            text="Follow"
            variant="default"
            size={btnSize}
            userId={user.id}
          />
        )}
        {showRemoveBtn && <RemoveUserButton size={btnSize} userId={user.id} />}
      </div>
    </Card>
  );
}
