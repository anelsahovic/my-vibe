import CreatePostForm from './CreatePostForm';
import { getDbUser } from '@/actions/user.action';

export default async function CreatePost() {
  const user = await getDbUser();

  return <CreatePostForm user={user} />;
}
