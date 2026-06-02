"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Phone, XCircle } from "lucide-react";
import { toast } from "sonner";
import { DocumentsList } from "@/components/applications/documents-list";
import { RejectDialog } from "@/components/applications/reject-dialog";
import { VerifyDialog } from "@/components/applications/verify-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/app-context";
import { PROVIDER_TYPE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    getApplicationById,
    verifyApplication,
    rejectApplication,
    getOfficerName,
    getReviewerName,
  } = useApp();
  const application = getApplicationById(decodeURIComponent(id));
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  if (!application) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Application not found</h2>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/applications">Back to Applications</Link>
        </Button>
      </div>
    );
  }

  const canReview = application.status === "pending";

  const handleVerify = () => {
    verifyApplication(application.id);
    toast.success("Application verified successfully");
    setVerifyOpen(false);
  };

  const handleReject = (reason: string) => {
    rejectApplication(application.id, reason);
    toast.success("Application rejected");
  };

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4 -ml-2 rounded-lg" asChild>
        <Link href="/applications">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Applications
        </Link>
      </Button>

      <PageHeader
        title={application.applicantName}
        description={`Application ${application.id}`}
        action={<StatusBadge status={application.status} />}
      />

      {canReview && (
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            className="bg-verified hover:bg-verified/90"
            onClick={() => setVerifyOpen(true)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Verify
          </Button>
          <Button variant="destructive" onClick={() => setRejectOpen(true)}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      )}

      {application.status === "rejected" && application.rejectionReason && (
        <Card className="mb-6 border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-destructive">
              Rejection Reason
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{application.rejectionReason}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Applicant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{application.applicantName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{application.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{application.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Provider Type</p>
              <p className="font-medium">
                {PROVIDER_TYPE_LABELS[application.providerType]}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submission Date</p>
              <p>{formatDate(application.submissionDate)}</p>
            </div>
            {application.status === "pending" ? (
              <div>
                <p className="text-sm text-muted-foreground">Assigned Officer</p>
                <p className="font-medium">
                  {getOfficerName(application.assignedOfficerId)}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">Reviewed By</p>
                <p className="font-medium">{getReviewerName(application)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <DocumentsList documents={application.documents} />
      </div>

      <VerifyDialog
        open={verifyOpen}
        onOpenChange={setVerifyOpen}
        applicantName={application.applicantName}
        onConfirm={handleVerify}
      />
      <RejectDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        applicantName={application.applicantName}
        onConfirm={handleReject}
      />
    </div>
  );
}
