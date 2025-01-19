import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  text: string;
  icon?: React.ElementType;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

export default function SubmitButton({
  text,
  icon: Icon,
  variant,
  disabled,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant={variant ?? 'default'}
          disabled
          className="w-full flex items-center justify-center space-x-1"
        >
          <span>{text}ing...</span> <Loader2 className="size-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant ?? 'default'}
          className="w-full flex items-center justify-center "
          disabled={disabled}
        >
          <span>{text}</span>
          {Icon && <Icon />}
        </Button>
      )}
    </>
  );
}
