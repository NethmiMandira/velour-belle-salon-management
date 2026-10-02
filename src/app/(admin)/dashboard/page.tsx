import Link from "next/link";
import {
	ArrowUpRight,
	CalendarCheck,
	CalendarPlus,
	CheckCircle2,
	ClipboardList,
	Clock3,
	Coins,
	UserPlus,
	Users,
	UserRound,
	XCircle,
} from "lucide-react";

import { Container } from "@/components/admin/container";
import { Navbar } from "@/components/admin/Navbar";
import { PageTitle } from "@/components/admin/page-title";

const money = (amount: number) =>
	`LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const upcomingAppointments = [
	{ time: "10:00 AM", customer: "Nimasha Fernando", service: "Hair Cut & Layering", stylist: "Anura Jayasinghe", status: "Confirmed", color: "border-[#8E4057]" },
	{ time: "11:30 AM", customer: "Dilini Rathnayake", service: "Gel Manicure", stylist: "Samanthi Perera", status: "Pending", color: "border-[#D8B98A]" },
	{ time: "02:00 PM", customer: "Kavindi Perera", service: "Gold Facial Glow", stylist: "Samanthi Perera", status: "Completed", color: "border-emerald-500" },
];

export default function DashboardPage() {
	return (
		<div className="relative min-h-screen w-full text-[#292426] font-sans">
			<div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/bgImage.jpg")' }} />
			<div className="relative z-10 min-h-screen">
				<Navbar />
				<Container size="full" className="py-8 sm:py-10">
					<div className="mx-auto w-full max-w-6xl">
						<PageTitle title="Dashboard Overview" description="A quick view of today’s salon activity and performance." />

						<SectionHeading icon={<Coins className="h-4 w-4" />} title="Revenue overview" />
						<div className="grid gap-4 md:grid-cols-3">
							<RevenueCard label="Today's revenue" value={money(186500)} detail="+12.4% from yesterday" />
							<RevenueCard label="Last 7 days revenue" value={money(842300)} detail="+8.7% from previous week" />
							<RevenueCard label="Total revenue" value={money(4268500)} detail="All-time salon revenue" />
						</div>

						<SectionHeading icon={<CalendarCheck className="h-4 w-4" />} title="Appointments overview" />
						<div className="grid gap-4 md:grid-cols-3">
							<OverviewCard label="Today's appointments" value="12" detail="View all appointments" href="/appointments" icon={<CalendarCheck className="h-5 w-5" />} tone="rose" />
							<OverviewCard label="Pending today" value="3" detail="Review pending" href="/appointments" icon={<Clock3 className="h-5 w-5" />} tone="gold" />
							<OverviewCard label="Cancellations" value="1" detail="Review cancellations" href="/appointments" icon={<XCircle className="h-5 w-5" />} tone="red" />
						</div>

						<SectionHeading icon={<ArrowUpRight className="h-4 w-4" />} title="Quick access" />
						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
							<QuickAction href="/appointments" icon={<CalendarPlus className="h-5 w-5" />} label="New appointment" tone="bg-[#4A1728]" />
							<QuickAction href="/customers" icon={<UserPlus className="h-5 w-5" />} label="Add customer" tone="bg-[#8E4057]" />
							<QuickAction href="/teamMembers" icon={<Users className="h-5 w-5" />} label="Add team member" tone="bg-[#B98552]" />
							<QuickAction href="/appointments" icon={<ClipboardList className="h-5 w-5" />} label="All appointments" tone="bg-[#6B7280]" />
						</div>

						<SectionHeading title="Upcoming today" />
						<div className="space-y-3">
							{upcomingAppointments.map((appointment) => (
								<div key={`${appointment.time}-${appointment.customer}`} className={`flex flex-col gap-4 rounded-2xl border border-[#E8CDD2] border-l-4 ${appointment.color} bg-[#FAF7F2]/95 p-4 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-5 sm:p-5`}>
									<span className="inline-flex w-fit shrink-0 rounded-full bg-[#4A1728] px-3 py-1.5 text-xs font-bold text-[#D8B98A]">{appointment.time}</span>
									<div className="min-w-0 flex-1"><div className="flex items-center gap-2 font-semibold text-[#4A1728]"><UserRound className="h-4 w-4 text-[#8E4057]" />{appointment.customer}</div><div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#292426]/65"><span><strong className="text-[#8E4057]">Service:</strong> {appointment.service}</span><span><strong className="text-[#8E4057]">Stylist:</strong> {appointment.stylist}</span></div></div>
									<span className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "Completed" ? "bg-emerald-100 text-emerald-700" : appointment.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-[#E8CDD2]/60 text-[#8E4057]"}`}><CheckCircle2 className="h-3.5 w-3.5" />{appointment.status}</span>
									<Link href="/appointments" className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E4057] transition-colors hover:text-[#4A1728]">Details <ArrowUpRight className="h-3.5 w-3.5" /></Link>
								</div>
							))}
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

function SectionHeading({ icon, title }: { icon?: React.ReactNode; title: string }) {
	return <div className="mb-4 mt-9 flex items-center gap-2 border-b border-[#E8CDD2]/70 pb-3 text-sm font-semibold uppercase tracking-wider text-[#8E4057] first:mt-6">{icon}{title}</div>;
}

function RevenueCard({ label, value, detail }: { label: string; value: string; detail: string }) {
	return <div className="relative overflow-hidden rounded-2xl bg-[#4A1728] p-5 text-[#FAF7F2] shadow-md"><div className="absolute left-0 top-0 h-full w-1 bg-[#D8B98A]" /><p className="text-xs font-semibold uppercase tracking-wider text-[#D8B98A]">{label}</p><p className="mt-3 font-serif text-2xl font-bold sm:text-3xl">{value}</p><p className="mt-2 text-xs text-white/65">{detail}</p></div>;
}

function OverviewCard({ label, value, detail, href, icon, tone }: { label: string; value: string; detail: string; href: string; icon: React.ReactNode; tone: "rose" | "gold" | "red" }) {
	const tones = { rose: "border-[#8E4057] text-[#8E4057]", gold: "border-[#D8B98A] text-[#B98552]", red: "border-red-400 text-red-600" };
	return <div className={`rounded-2xl border-l-4 border-y border-r border-[#E8CDD2] bg-[#FAF7F2]/95 p-5 shadow-sm ${tones[tone]}`}><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#8E4057]">{label}</p><p className="mt-2 font-serif text-4xl font-bold text-[#4A1728]">{value}</p></div><div className="rounded-xl bg-[#E8CDD2]/45 p-2">{icon}</div></div><Link href={href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#8E4057] hover:text-[#4A1728]">{detail}<ArrowUpRight className="h-3.5 w-3.5" /></Link></div>;
}

function QuickAction({ href, icon, label, tone }: { href: string; icon: React.ReactNode; label: string; tone: string }) {
	return <Link href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${tone}`}>{icon}<span>{label}</span><ArrowUpRight className="ml-auto h-4 w-4" /></Link>;
}
