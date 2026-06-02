"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { OfficerFormDialog } from "@/components/officers/officer-form-dialog";
import { OfficersTable } from "@/components/officers/officers-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";
import type { Officer } from "@/types";

export default function OfficersPage() {
  const { officers, createOfficer, updateOfficer, toggleOfficerStatus } =
    useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  const handleCreate = () => {
    setEditingOfficer(null);
    setDialogOpen(true);
  };

  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setDialogOpen(true);
  };

  const handleSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "officer";
  }) => {
    if (editingOfficer) {
      updateOfficer(editingOfficer.id, data);
      toast.success("Officer updated successfully");
    } else {
      createOfficer(data);
      toast.success("Officer created successfully");
    }
  };

  const handleToggle = (id: string) => {
    const officer = officers.find((o) => o.id === id);
    const wasActive = officer?.status === "active";
    toggleOfficerStatus(id);
    toast.success(wasActive ? "Officer deactivated" : "Officer activated");
  };

  return (
    <div>
      <PageHeader
        title="Officer Management"
        description="Create and manage verification officers."
        action={
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Officer
          </Button>
        }
      />
      {officers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No officers yet"
          description="Create your first verification officer to get started."
        />
      ) : (
        <OfficersTable
          officers={officers}
          onEdit={handleEdit}
          onToggleStatus={handleToggle}
        />
      )}
      <OfficerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        officer={editingOfficer}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
