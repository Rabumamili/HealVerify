"use client";

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

interface VerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName: string;
  onConfirm: () => void;
}

export function VerifyDialog({
  open,
  onOpenChange,
  applicantName,
  onConfirm,
}: VerifyDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify Application</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to verify the application for{" "}
            <strong>{applicantName}</strong>? This action will mark the
            application as verified and cannot be undone from this portal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-verified hover:bg-verified/90"
          >
            Confirm Verification
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
