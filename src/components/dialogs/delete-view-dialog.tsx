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
import { useToast } from "@/hooks/use-toast";
import { View } from "@/types/todo";

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
  const { deleteView, views, addView } = useTodoStore();
  const { toast } = useToast();
  const view = views.find((v) => v.id === viewId);

  const handleDelete = () => {
    if (!view) return;
    
    const deletedView = { ...view };
    deleteView(viewId);
    
    toast({
      title: "View deleted",
      description: "The view has been deleted",
      action: (
        <AlertDialogAction
          onClick={() => {
            addView(deletedView);
            toast({
              title: "View restored",
              description: "The view has been restored",
            });
          }}
        >
          Undo
        </AlertDialogAction>
      ),
    });
    
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