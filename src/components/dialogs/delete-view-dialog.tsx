import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTodoStore } from "@/store/todo-store";

interface DeleteViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewId: string;
}

export function DeleteViewDialog({
  open,
  onOpenChange,
  viewId,
}: DeleteViewDialogProps) {
  const { deleteView, views } = useTodoStore();
  const view = views.find((v) => v.id === viewId);

  const handleDelete = () => {
    deleteView(viewId);
    onOpenChange(false);
  };

  if (!view) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete View</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the view "{view.name}"? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}