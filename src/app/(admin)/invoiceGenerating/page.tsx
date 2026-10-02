"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, FileText, Percent, Plus, Printer, Trash2, UserRound } from "lucide-react";

import Button from "@/components/admin/button";
import { Container } from "@/components/admin/container";
import { DropdownList } from "@/components/admin/dropdown-list";
import { Input } from "@/components/admin/input";
import { Label } from "@/components/admin/label";
import { Navbar } from "@/components/admin/Navbar";
import { PageTitle } from "@/components/admin/page-title";
import type { InvoiceAppointment, InvoiceService } from "@/types/admin";

const appointments: InvoiceAppointment[] = [
	{ id: "APT-1001", customer: "Nimasha Fernando", date: "2026-10-02", services: [{ id: "hair-cut", name: "Hair Cut & Layering", stylist: "Anura Jayasinghe", price: 2500, discount: 0 }, { id: "blow-dry", name: "Blow Dry & Styling", stylist: "Anura Jayasinghe", price: 2000, discount: 5 }] },
	{ id: "APT-1002", customer: "Dilini Rathnayake", date: "2026-10-02", services: [{ id: "gel-manicure", name: "Gel Manicure", stylist: "Samanthi Perera", price: 3000, discount: 0 }] },
	{ id: "APT-1003", customer: "Kavindi Perera", date: "2026-10-03", services: [{ id: "facial", name: "Gold Facial Glow", stylist: "Samanthi Perera", price: 5000, discount: 10 }] },
];

const serviceCatalog = [
	{ id: "keratin", name: "Keratin Hair Treatment", price: 18000 },
	{ id: "pedicure", name: "Luxury Pedicure", price: 3200 },
	{ id: "facial", name: "Gold Facial Glow", price: 5000 },
];

const stylists = ["Anura Jayasinghe", "Samanthi Perera", "Kavinda Silva"];

const money = (amount: number) => `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function InvoiceGeneratingPage() {
	const [selectedAppointmentId, setSelectedAppointmentId] = useState(appointments[0].id);
	const [services, setServices] = useState<InvoiceService[]>(appointments[0].services);
	const [selectedServiceId, setSelectedServiceId] = useState("");
	const [selectedStylist, setSelectedStylist] = useState(stylists[0]);
	const [overallDiscount, setOverallDiscount] = useState(0);
	const [paidAmount, setPaidAmount] = useState(0);
	const [paymentMethod, setPaymentMethod] = useState("");

	const appointment = appointments.find((item) => item.id === selectedAppointmentId) ?? appointments[0];
	const subtotal = useMemo(() => services.reduce((sum, service) => sum + service.price, 0), [services]);
	const serviceDiscount = useMemo(() => services.reduce((sum, service) => sum + service.price * (service.discount / 100), 0), [services]);
	const netAmount = Math.max(0, subtotal - serviceDiscount);
	const overallDiscountAmount = Math.max(0, netAmount * (overallDiscount / 100));
	const netPayable = Math.max(0, netAmount - overallDiscountAmount);
	const balance = paidAmount - netPayable;
	const formattedBalance = balance < 0 ? `- ${money(Math.abs(balance))}` : money(balance);
	const canGenerateInvoice = Boolean(paymentMethod) && paidAmount > 0 && balance >= 0;

	const handleAppointmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const nextAppointment = appointments.find((item) => item.id === event.target.value);
		if (!nextAppointment) return;
		setSelectedAppointmentId(nextAppointment.id);
		setServices(nextAppointment.services);
		setOverallDiscount(0);
		setPaidAmount(0);
	};

	const updateDiscount = (id: string, value: string) => {
		const discount = Math.min(100, Math.max(0, Number(value) || 0));
		setServices((current) => current.map((service) => (service.id === id ? { ...service, discount } : service)));
	};

	const addService = () => {
		const service = serviceCatalog.find((item) => item.id === selectedServiceId);
		if (!service || services.some((item) => item.id === service.id)) return;
		setServices((current) => [...current, { ...service, stylist: selectedStylist, discount: 0 }]);
		setSelectedServiceId("");
	};

	const clearInvoice = () => {
		setSelectedAppointmentId(appointments[0].id);
		setServices(appointments[0].services);
		setSelectedServiceId("");
		setOverallDiscount(0);
		setPaidAmount(0);
		setPaymentMethod("");
	};

	return (
		<div className="relative min-h-screen w-full text-[#292426] font-sans">
			<div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/bgImage.jpg")' }} />
			<div className="relative z-10 min-h-screen">
				<style>{`
					.invoice-print { display: none; }
					@media print {
						@page { size: A4; margin: 12mm 20mm; }
						body { background: #fff !important; }
						.print-screen { display: none !important; }
						.invoice-print { display: block !important; box-sizing: border-box; padding: 0 18mm; color: #292426; font-family: Arial, sans-serif; }
						.invoice-print h1, .invoice-print h2, .invoice-print h3 { color: #4A1728; margin: 0; }
						.invoice-print-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4A1728; padding-bottom: 16px; }
						.invoice-print-label { color: #8E4057; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
						.invoice-print-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 22px 0; }
						.invoice-print-box { border: 1px solid #E8CDD2; border-radius: 6px; padding: 10px 12px; }
						.invoice-print-table { width: 100%; border-collapse: collapse; margin-top: 14px; }
						.invoice-print-table th { background: #4A1728; color: #FAF7F2; font-size: 10px; padding: 9px; text-align: left; text-transform: uppercase; }
						.invoice-print-table td { border-bottom: 1px solid #E8CDD2; font-size: 11px; padding: 10px 9px; }
						.invoice-print-table th:last-child, .invoice-print-table td:last-child { text-align: right; }
						.invoice-print-total { margin: 20px 0 0 auto; width: 280px; }
						.invoice-print-total-row { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid #E8CDD2; padding: 7px 0; font-size: 11px; }
						.invoice-print-total-row.final { border-bottom: 2px solid #4A1728; color: #4A1728; font-size: 14px; font-weight: 700; }
						.invoice-print-payment { border: 1px solid #D8B98A; border-radius: 6px; margin-top: 22px; padding: 12px 14px; }
						.invoice-print-payment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 9px; }
						.invoice-print-footer { color: #8E4057; font-size: 10px; margin-top: 28px; text-align: center; }
					}
				`}</style>
				<div className="invoice-print">
					<div className="invoice-print-header">
						<div><h1 style={{ fontSize: 26 }}>Velour Belle</h1><p style={{ color: "#8E4057", fontSize: 11, margin: "5px 0 0" }}>Luxury Beauty Studio & Sanctuary</p></div>
						<div style={{ textAlign: "right" }}><h2 style={{ fontSize: 20 }}>Invoice</h2><p style={{ fontSize: 11, margin: "5px 0 0" }}>INV-2026-014</p><p style={{ fontSize: 11, margin: "3px 0 0" }}>{new Date().toLocaleDateString("en-GB")}</p></div>
					</div>
					<div className="invoice-print-meta">
						<div className="invoice-print-box"><div className="invoice-print-label">Customer</div><strong>{appointment.customer}</strong></div>
						<div className="invoice-print-box"><div className="invoice-print-label">Appointment</div><strong>{appointment.id} · {new Date(`${appointment.date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</strong></div>
					</div>
					<h3 style={{ fontSize: 15 }}>Service details</h3>
					<table className="invoice-print-table"><thead><tr><th>Service</th><th>Stylist</th><th>Discount</th><th>Total</th></tr></thead><tbody>{services.map((service) => { const discountAmount = service.price * (service.discount / 100); return <tr key={`print-${service.id}`}><td>{service.name}</td><td>{service.stylist}</td><td>{service.discount}%</td><td>{money(service.price - discountAmount)}</td></tr>; })}</tbody></table>
					<div className="invoice-print-total"><div className="invoice-print-total-row"><span>Gross total</span><strong>{money(subtotal)}</strong></div><div className="invoice-print-total-row"><span>Service discounts</span><strong>- {money(serviceDiscount)}</strong></div><div className="invoice-print-total-row"><span>Additional discount</span><strong>- {money(overallDiscountAmount)}</strong></div><div className="invoice-print-total-row final"><span>Net payable</span><strong>{money(netPayable)}</strong></div></div>
					<div className="invoice-print-payment"><div className="invoice-print-label">Payment summary</div><div className="invoice-print-payment-grid"><div><small>Payment method</small><br /><strong>{paymentMethod || "Not selected"}</strong></div><div><small>Paid amount</small><br /><strong>{money(paidAmount)}</strong></div><div><small>Balance</small><br /><strong>{formattedBalance}</strong></div></div></div>
					<p className="invoice-print-footer">Thank you for choosing Velour Belle.</p>
				</div>
				<div className="print-screen">
				<Navbar />
				<Container size="full" className="py-8 sm:py-10">
					<div className="mx-auto w-full max-w-6xl">
						<PageTitle title="Generate Invoice"  description="Review appointment services, apply discounts, and settle today’s visit." actions={<div className="flex items-center gap-2 rounded-xl border border-[#E8CDD2] bg-[#FAF7F2]/90 px-3.5 py-2 text-xs shadow-sm backdrop-blur-sm"><FileText className="h-4 w-4 text-[#8E4057]" /><span className="font-semibold text-[#4A1728]">INV-2026-014</span><span className="text-[#292426]/60">|</span><span>{new Date().toLocaleDateString("en-GB")}</span></div>} />

						<div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
							<section className="rounded-2xl border border-[#E8CDD2] bg-[#FAF7F2]/95 p-5 shadow-md backdrop-blur-sm sm:p-7">
								<div className="mb-6 flex items-center gap-3 border-b border-[#E8CDD2]/70 pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8CDD2]/45 text-[#8E4057]"><FileText className="h-5 w-5" /></div><div><h2 className="font-serif text-2xl font-bold text-[#4A1728]">Invoice details</h2><p className="text-xs text-[#292426]/60">Appointment and service summary</p></div></div>
								<div className="grid gap-5 md:grid-cols-2">
									<div className="md:col-span-2"><DropdownList id="appointment" label="Appointment ID" options={appointments.map((item) => ({ label: `${item.id} · ${item.customer}`, value: item.id }))} value={selectedAppointmentId} onChange={handleAppointmentChange} /></div>
									<div><Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8E4057]">Customer</Label><div className="flex h-11 items-center gap-2 rounded-xl border border-[#D8B98A] bg-[#E8CDD2]/20 px-4 text-sm font-semibold text-[#4A1728]"><UserRound className="h-4 w-4 text-[#8E4057]" />{appointment.customer}</div></div>
									<div><Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8E4057]">Appointment date</Label><div className="flex h-11 items-center gap-2 rounded-xl border border-[#D8B98A] bg-[#E8CDD2]/20 px-4 text-sm text-[#292426]"><CalendarDays className="h-4 w-4 text-[#8E4057]" />{new Date(`${appointment.date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div></div>
								</div>

								<div className="mt-8 rounded-2xl border border-[#E8CDD2] bg-white/50 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="font-serif text-xl font-bold text-[#4A1728]">Service details</h3><p className="text-xs text-[#292426]/60">Adjust line discounts before generating.</p></div><span className="rounded-full bg-[#E8CDD2]/45 px-3 py-1 text-xs font-semibold text-[#8E4057]">{services.length} {services.length === 1 ? "service" : "services"}</span></div>
									<div className="space-y-3">{services.map((service) => { const discountAmount = service.price * (service.discount / 100); return <div key={service.id} className="grid gap-3 rounded-xl border border-[#E8CDD2]/70 bg-[#FAF7F2]/80 p-3 sm:grid-cols-[minmax(0,1fr)_100px_100px_34px] sm:items-center"><div><p className="text-sm font-semibold text-[#4A1728]">{service.name}</p><p className="text-xs text-[#292426]/60">{service.stylist} · {money(service.price)}</p></div><div><Label htmlFor={`discount-${service.id}`} className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#8E4057]">Discount %</Label><Input id={`discount-${service.id}`} type="number" min="0" max="100" value={service.discount} onChange={(event) => updateDiscount(service.id, event.target.value)} className="h-9 rounded-lg px-2 text-center" /></div><div className="text-left sm:text-right"><p className="text-[10px] font-bold uppercase tracking-wider text-[#8E4057]">Total</p><p className="text-sm font-bold text-[#4A1728]">{money(service.price - discountAmount)}</p></div><button type="button" onClick={() => setServices((current) => current.filter((item) => item.id !== service.id))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#8E4057] transition-colors hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${service.name}`}><Trash2 className="h-4 w-4" /></button></div>; })}</div>
									<div className="mt-5 grid gap-3 border-t border-[#E8CDD2]/70 pt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end"><DropdownList id="additional-service" label="Add additional service" options={serviceCatalog.map((item) => ({ label: `${item.name} · ${money(item.price)}`, value: item.id }))} value={selectedServiceId} onChange={(event) => setSelectedServiceId(event.target.value)} placeholder="Choose a service" /><DropdownList id="service-stylist" label="Assign stylist" options={stylists.map((stylist) => ({ label: stylist, value: stylist }))} value={selectedStylist} onChange={(event) => setSelectedStylist(event.target.value)} placeholder="Choose a stylist" /><Button type="button" size="sm" onClick={addService} disabled={!selectedServiceId} className="h-11 whitespace-nowrap"><Plus className="h-4 w-4" />Add service</Button></div>
								</div>
							</section>

							<aside className="h-fit rounded-2xl bg-[#4A1728] p-5 text-[#FAF7F2] shadow-xl sm:p-7"><div className="mb-6 flex items-start justify-between border-b border-white/15 pb-5"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B98A]">Invoice summary</p><h2 className="mt-1 font-serif text-3xl font-bold">Payment</h2></div><CheckCircle2 className="h-6 w-6 text-[#D8B98A]" /></div><div className="space-y-4 text-sm"><div className="flex justify-between gap-4 text-white/70"><span>Gross total</span><span className="font-semibold text-white">{money(subtotal)}</span></div><div className="flex justify-between gap-4 text-white/70"><span>Service discounts</span><span className="font-semibold text-[#F3B7C1]">- {money(serviceDiscount)}</span></div><div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4 text-white"><span className="font-semibold">Net amount</span><span className="text-xl font-bold">{money(netAmount)}</span></div></div><div className="my-6 border-t border-dashed border-white/20" /><div className="space-y-4"><div><Label htmlFor="overall-discount" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F3B7C1]">Additional discount ({overallDiscount}% · - {money(overallDiscountAmount)})</Label><div className="relative"><Percent className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/50" /><Input id="overall-discount" type="number" min="0" max="100" value={overallDiscount} onChange={(event) => setOverallDiscount(Math.min(100, Math.max(0, Number(event.target.value) || 0)))} className="border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/40 focus:border-[#D8B98A] focus:bg-white/15" /></div></div><div className="rounded-xl bg-white/10 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-[#D8B98A]">Net payable</p><p className="mt-1 text-3xl font-bold text-white">{money(netPayable)}</p></div><DropdownList id="payment-method" label="Payment method" options={[{ label: "Cash", value: "Cash" }, { label: "Card", value: "Card" }]} value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} placeholder="Select method" className="border-white/20 bg-white/10 text-white focus:border-[#D8B98A] focus:bg-white/15 [&>option]:bg-[#4A1728]" /><div><Label htmlFor="paid-amount" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F3B7C1]">Paid amount (LKR)</Label><Input id="paid-amount" type="number" min="0" value={paidAmount || ""} onChange={(event) => setPaidAmount(Math.max(0, Number(event.target.value) || 0))} placeholder="0.00" className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-[#D8B98A] focus:bg-white/15" /></div><div className="flex items-center justify-between border-t border-white/15 pt-4"><span className="font-semibold text-white/80">Balance</span><span className="text-xl font-bold text-[#D8B98A]">{formattedBalance}</span></div></div></aside>
						</div>

						<div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row"><Button type="button" variant="outline" onClick={clearInvoice} className="bg-[#FAF7F2]/80"><Trash2 className="h-4 w-4" />Clear</Button><Button type="button" variant="gold" disabled={!canGenerateInvoice} onClick={() => window.print()}><Printer className="h-4 w-4" />Generate invoice</Button></div>
					</div>
				</Container>
				</div>
			</div>
		</div>
	);
}
