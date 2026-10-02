import * as React from "react";
import {
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  XCircle,
  Clock3,
  MoreVertical,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/util";

export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

export interface AppointmentOverviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  clientName: string;
  clientPhone?: string;
  clientAvatar?: string;
  serviceName: string;
  stylistName: string;
  date: string;
  time: string;
  duration?: string;
  price: number;
  status?: AppointmentStatus;
  onConfirm?: () => void;
  onCancel?: () => void;
  onMoreOptions?: () => void;
}

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 border-amber-200",
    icon: <Clock3 className="h-3.5 w-3.5" />,
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-100 text-rose-800 border-rose-200",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

export function AppointmentOverviewCard({
  className,
  clientName = "Evelyn Harper",
  clientPhone = "+1 (555) 234-5678",
  clientAvatar,
  serviceName = "Signature Facial & Radiance Therapy",
  stylistName = "Sophia Elena",
  date = "Today, Oct 24",
  time = "02:30 PM",
  duration = "60 mins",
  price = 120,
  status = "pending",
  onConfirm,
  onCancel,
  onMoreOptions,
  ...props
}: AppointmentOverviewCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-2xl border border-brand-blush/60 bg-brand-ivory/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {/* Top Header: Client Info & Status Badge */}
      <div className="flex items-start justify-between gap-3 border-b border-brand-blush/40 pb-4">
        <div className="flex items-center gap-3">
          {/* Avatar / Initial Placeholder */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-blush/80 bg-brand-blush/40 font-serif font-semibold text-brand-burgundy">
            {clientAvatar ? (
              <img
                src={clientAvatar}
                alt={clientName}
                className="h-full w-full object-cover"
              />
            ) : (
              clientName.charAt(0)
            )}
          </div>

          <div>
            <h4 className="font-serif text-base font-medium text-brand-burgundy">
              {clientName}
            </h4>
            {clientPhone && (
              <div className="flex items-center gap-1 text-xs text-brand-charcoal/60">
                <Phone className="h-3 w-3" />
                <span>{clientPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge & Actions */}
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
              statusInfo.className
            )}
          >
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </div>

          {onMoreOptions && (
            <button
              type="button"
              onClick={onMoreOptions}
              className="rounded-lg p-1 text-brand-burgundy/60 transition-colors hover:bg-brand-blush/40 hover:text-brand-burgundy"
              aria-label="More appointment options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Appointment Details Grid */}
      <div className="my-4 grid grid-cols-2 gap-3 text-xs">
        {/* Service */}
        <div className="col-span-2 flex items-start gap-2 rounded-xl bg-brand-blush/20 p-2.5">
          <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-brand-rose" />
          <div>
            <p className="font-semibold text-brand-burgundy">{serviceName}</p>
            <p className="text-brand-charcoal/60">Specialist: {stylistName}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 rounded-xl bg-brand-ivory p-2 border border-brand-blush/40">
          <Calendar className="h-4 w-4 text-brand-burgundy/60" />
          <span className="font-medium text-brand-charcoal">{date}</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-brand-ivory p-2 border border-brand-blush/40">
          <Clock className="h-4 w-4 text-brand-burgundy/60" />
          <span className="font-medium text-brand-charcoal">
            {time} ({duration})
          </span>
        </div>
      </div>

      {/* Footer: Price & Quick Action Buttons */}
      <div className="flex items-center justify-between border-t border-brand-blush/40 pt-3">
        <div>
          <span className="text-xs text-brand-charcoal/60">Total Fee: </span>
          <span className="font-serif text-lg font-semibold text-brand-burgundy">
            ${price}
          </span>
        </div>

        {/* Quick Action Triggers */}
        {status === "pending" && (
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-brand-blush/80 px-3 py-1.5 text-xs font-medium text-brand-charcoal/80 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
              >
                Decline
              </button>
            )}
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-xl bg-brand-burgundy px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-brand-rose"
              >
                Confirm
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}