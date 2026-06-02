"use client";

import { Pencil, Power, PowerOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Officer } from "@/types";

interface OfficersTableProps {
  officers: Officer[];
  onEdit: (officer: Officer) => void;
  onToggleStatus: (id: string) => void;
}

export function OfficersTable({
  officers,
  onEdit,
  onToggleStatus,
}: OfficersTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {officers.map((officer) => (
            <TableRow key={officer.id}>
              <TableCell className="font-medium">
                {officer.firstName} {officer.lastName}
              </TableCell>
              <TableCell>{officer.email}</TableCell>
              <TableCell className="capitalize">{officer.role}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    officer.status === "active" ? "verified" : "secondary"
                  }
                >
                  {officer.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(officer)}
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleStatus(officer.id)}
                  >
                    {officer.status === "active" ? (
                      <>
                        <PowerOff className="mr-1 h-4 w-4" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Power className="mr-1 h-4 w-4" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
