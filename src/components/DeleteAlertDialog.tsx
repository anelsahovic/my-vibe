'use client';

import { Loader2Icon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeleteAlertDialogProps = {
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  title: string;
  description?: string;
  buttonText?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

export function DeleteAlertDialog({
  isDeleting,
  onDelete,
  title = 'Delete Post',
  description = 'This action cannot be undone.',
  buttonText,
  variant = 'ghost',
}: DeleteAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className="flex items-center justify-start text-muted-foreground hover:text-red-500 w-full"
        >
          {isDeleting ? (
            <div className="flex w-full gap-1">
              <Loader2Icon className="size-4" />
              <span className="text-sm">{buttonText}</span>
            </div>
          ) : (
            <div className="flex w-full gap-1">
              <Trash2Icon className="size-4" />
              <span className="text-sm">{buttonText}</span>
            </div>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
