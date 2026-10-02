"use client";

import { useMemo, useState } from "react";
import { BarChart3, CalendarDays, Download, FileText, Filter, Printer, Users } from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { Navbar } from "@/components/admin/Navbar";
import { PageTitle } from "@/components/admin/page-title";
import type { ReportType } from "@/types/admin";

const reportTypeOptions = [
	{ label: "Appointment Report", value: "Appointment" },
	{ label: "Revenue Report", value: "Revenue" },
	{ label: "Service Performance", value: "ServicePerformance" },
	{ label: "Employee Performance", value: "EmployeePerformance" },
	{ label: "Customer Report", value: "Customer" },
];

const customers = ["All Customers", "Nimasha Fernando", "Dilini Rathnayake", "Kavindi Perera", "Sachini De Silva"];
const employees = ["All Employees", "Anura Jayasinghe", "Samanthi Perera", "Kavinda Silva"];

const appointmentRows = [
	{ date: "2026-09-28", totalAppointments: 3, advancePaid: 3500, total: 7500, completed: 1, pending: 2, cancelled: 0 },
	{ date: "2026-09-29", totalAppointments: 1, advancePaid: 0, total: 18000, completed: 0, pending: 0, cancelled: 1 },
	{ date: "2026-09-30", totalAppointments: 2, advancePaid: 1500, total: 6200, completed: 1, pending: 1, cancelled: 0 },
];

const serviceRows = [
	{ service: "Hair Cut & Layering", bookings: 39, revenue: 97500 },
	{ service: "Gold Facial Glow", bookings: 26, revenue: 130000 },
	{ service: "Gel Manicure", bookings: 31, revenue: 93000 },
	{ service: "Keratin Hair Treatment", bookings: 18, revenue: 324000 },
];

const employeeRows = [
	{ employee: "Anura Jayasinghe", servicesDone: 42, revenue: 114500 },
	{ employee: "Samanthi Perera", servicesDone: 38, revenue: 168000 },
	{ employee: "Kavinda Silva", servicesDone: 21, revenue: 262000 },
];

const customerRows = [
	{ customer: "Nimasha Fernando", totalVisits: 8, totalRevenue: 28500, lastVisit: "2026-09-28" },
	{ customer: "Dilini Rathnayake", totalVisits: 6, totalRevenue: 22400, lastVisit: "2026-09-29" },
	{ customer: "Kavindi Perera", totalVisits: 5, totalRevenue: 31000, lastVisit: "2026-09-27" },
];

const money = (amount: number) => `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ReportGeneratingPage() {
	const [reportType, setReportType] = useState<ReportType | "">("");
	const [fromDate, setFromDate] = useState("2026-09-26");
	const [toDate, setToDate] = useState("2026-10-02");
	const [customer, setCustomer] = useState("All Customers");
	const [employee, setEmployee] = useState("All Employees");
	const [isGenerated, setIsGenerated] = useState(false);

	const reportTitle = reportTypeOptions.find((item) => item.value === reportType)?.label ?? "Report Results";
	const reportRows = useMemo(() => {
		if (reportType === "Revenue") return appointmentRows.map((row) => ({ Date: row.date, Revenue: money(row.total), Advance: money(row.advancePaid) }));
		if (reportType === "ServicePerformance") return serviceRows.map((row) => ({ Service: row.service, Bookings: row.bookings, Revenue: money(row.revenue) }));
		if (reportType === "EmployeePerformance") return employeeRows.map((row) => ({ Employee: row.employee, "Services Done": row.servicesDone, Revenue: money(row.revenue) }));
		if (reportType === "Customer") return customerRows.map((row) => ({ Customer: row.customer, "Total Visits": row.totalVisits, "Total Revenue": money(row.totalRevenue), "Last Visit": row.lastVisit }));
		return appointmentRows.map((row) => ({ Date: row.date, "Total Appointments": row.totalAppointments, "Advance Paid": money(row.advancePaid), Total: money(row.total), Completed: row.completed, Pending: row.pending, Cancelled: row.cancelled }));
	}, [reportType]);

	const handleGenerate = () => setIsGenerated(Boolean(reportType));

	const handleExport = () => {
		if (!isGenerated || !reportRows.length) return;
		const headers = Object.keys(reportRows[0]);
		const csv = [headers, ...reportRows.map((row) => headers.map((header) => String(row[header as keyof typeof row] ?? "")))]
			.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
			.join("\n");
		const link = document.createElement("a");
		link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		link.download = `${reportType?.toLowerCase() ?? "report"}-report.csv`;
		link.click();
	};

	return (
		<div className="relative min-h-screen w-full text-[#292426] font-sans">
			<div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/bgImage.jpg")' }} />
			<div className="relative z-10 min-h-screen">
				<Navbar />
				<Container size="full" className="py-8 sm:py-10">
					<div className="mx-auto w-full max-w-6xl">
						<PageTitle title="Reports" description="Generate filtered performance reports for your salon operations." />

						<section className="mt-6 rounded-2xl border border-[#E8CDD2] bg-[#FAF7F2]/95 p-5 shadow-md backdrop-blur-sm sm:p-6">
							<div className="mb-5 flex items-center gap-3 border-b border-[#E8CDD2]/70 pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8CDD2]/45 text-[#8E4057]"><BarChart3 className="h-5 w-5" /></div><div><h2 className="font-serif text-2xl font-bold text-[#4A1728]">Report filters</h2><p className="text-xs text-[#292426]/60">Choose a report and narrow the results before generating.</p></div></div>
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:items-end">
								<DropdownList id="report-type" label="Report type" options={reportTypeOptions} value={reportType} onChange={(event) => { setReportType(event.target.value as ReportType); setIsGenerated(false); }} placeholder="Select report type" />
								<div><Label htmlFor="from-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8E4057]">From</Label><Input id="from-date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></div>
								<div><Label htmlFor="to-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8E4057]">To</Label><Input id="to-date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></div>
								<DropdownList id="customer" label="Customer" options={customers.map((item) => ({ label: item, value: item }))} value={customer} onChange={(event) => setCustomer(event.target.value)} placeholder="All Customers" />
								<DropdownList id="employee" label="Employee" options={employees.map((item) => ({ label: item, value: item }))} value={employee} onChange={(event) => setEmployee(event.target.value)} placeholder="All Employees" />
							</div>
							<div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-[#E8CDD2]/70 pt-5"><Button type="button" disabled={!reportType} onClick={handleGenerate}><Filter className="h-4 w-4" />Generate</Button><Button type="button" variant="outline" disabled={!isGenerated} onClick={handleExport}><Download className="h-4 w-4" />Export CSV</Button><Button type="button" variant="gold" disabled={!isGenerated} onClick={() => window.print()}><Printer className="h-4 w-4" />Print</Button></div>
						</section>

						{isGenerated ? <section className="mt-6 rounded-2xl border border-[#E8CDD2] bg-[#FAF7F2]/95 p-5 shadow-md backdrop-blur-sm sm:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#8E4057]">{reportTitle}</p><h2 className="mt-1 font-serif text-2xl font-bold text-[#4A1728]">Report results</h2></div><div className="rounded-xl border border-[#E8CDD2] bg-white/60 px-4 py-2 text-right text-xs text-[#292426]/70"><p className="font-semibold text-[#4A1728]">Applied filters</p><p>{fromDate} to {toDate}</p><p>{customer} · {employee}</p></div></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="bg-[#4A1728] text-xs uppercase tracking-wider text-[#D8B98A]">{Object.keys(reportRows[0]).map((header) => <th key={header} className="border-b border-[#E8CDD2] px-4 py-3 font-semibold">{header}</th>)}</tr></thead><tbody className="divide-y divide-[#E8CDD2]/60">{reportRows.map((row, index) => <tr key={index} className="hover:bg-[#E8CDD2]/20">{Object.values(row).map((value, valueIndex) => <td key={valueIndex} className="px-4 py-3.5 text-[#292426]">{value}</td>)}</tr>)}</tbody></table></div></section> : <div className="mt-6 rounded-2xl border border-dashed border-[#D8B98A] bg-[#FAF7F2]/80 px-6 py-12 text-center"><FileText className="mx-auto h-8 w-8 text-[#8E4057]" /><h2 className="mt-3 font-serif text-2xl font-bold text-[#4A1728]">No report generated yet</h2><p className="mt-1 text-sm text-[#292426]/60">Select a report type, then choose Generate to view the results.</p></div>}

						<div className="mt-5 flex items-center gap-2 text-xs text-[#292426]/60"><CalendarDays className="h-4 w-4 text-[#8E4057]" />Reports are prepared from {fromDate} through {toDate}<Users className="ml-2 h-4 w-4 text-[#8E4057]" />Local salon data preview</div>
					</div>
				</Container>
			</div>
		</div>
	);
}
