"use client";

import { useMemo, useState } from "react";

type Props = { arabic: boolean };

function formatMoney(amount: number) {
  return "$" + Math.round(amount).toLocaleString("en-US");
}

export default function CommissionInsight({ arabic }: Props) {
  const [orders, setOrders] = useState(250);
  const [ticket, setTicket] = useState(12);
  const [rate, setRate] = useState(18);
  const [directShare, setDirectShare] = useState(30);

  const numbers = useMemo(() => {
    const revenue = orders * ticket;
    const monthlyCommissions = revenue * rate / 100;
    const potentialMonthly = monthlyCommissions * directShare / 100;
    return {
      revenue,
      monthlyCommissions,
      potentialMonthly,
      potentialAnnual: potentialMonthly * 12,
    };
  }, [orders, ticket, rate, directShare]);

  const fields = [
    {
      id: "orders",
      ar: "الطلبات عبر التطبيقات شهرياً",
      en: "Monthly app orders",
      value: orders,
      unit: arabic ? "طلب" : "orders",
      min: 0, max: 1500, step: 10,
      set: setOrders,
    },
    {
      id: "ticket",
      ar: "متوسط قيمة الطلب",
      en: "Average order value",
      value: ticket,
      unit: "USD",
      min: 1, max: 100, step: 1,
      set: setTicket,
    },
    {
      id: "rate",
      ar: "نسبة العمولة المفترضة",
      en: "Assumed commission rate",
      value: rate,
      unit: "%",
      min: 0, max: 35, step: 1,
      set: setRate,
    },
    {
      id: "share",
      ar: "حصة الطلبات التي قد تنتقل للقناة المباشرة",
      en: "Potential shift to direct orders",
      value: directShare,
      unit: "%",
      min: 0, max: 100, step: 5,
      set: setDirectShare,
    },
  ];

  return (
    <section id="insights" dir={arabic ? "rtl" : "ltr"} className="scroll-mt-24 bg-[#f2e9de] px-5 py-24 text-[#2a2019] sm:px-7 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black tracking-[.22em] text-[#ae7044]">BUSINESS INSIGHT / 01</p>
            <h2 className="text-4xl font-black leading-[1.27] md:text-6xl">
              {arabic ? "راقب أرقامك." : "Know your numbers."}
              <br />
              <span className="text-[#b66b3b]">{arabic ? "وفكّر بخطوتك القادمة." : "Plan your next move."}</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-8 text-[#786657]">
            {arabic
              ? "جرّب سيناريو افتراضياً لفهم قيمة العمولات على بعض الطلبات القادمة من تطبيقات خارجية، وما الذي قد يتغير إذا انتقل جزء منها إلى قناة طلب مباشرة."
              : "Explore a hypothetical scenario to understand third-party ordering commissions and what could change if some orders moved to a direct channel."}
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-[#dbc8b8] bg-[#fffaf4] shadow-[0_26px_80px_rgba(64,39,20,.09)] lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-black tracking-wider text-[#a06b48]">{arabic ? "عدّل الأرقام وشاهد النتيجة" : "ADJUST THE ASSUMPTIONS"}</p>
              <h3 className="mt-3 text-2xl font-black">{arabic ? "حاسبة توضيحية للعمولات" : "Illustrative commission calculator"}</h3>
            </div>
            <div className="space-y-8">
              {fields.map((field) => (
                <div key={field.id}>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <label htmlFor={"calc-" + field.id} className="text-sm font-bold text-[#4d392c]">
                      {arabic ? field.ar : field.en}
                    </label>
                    <div className="rounded-xl bg-[#f4e8dc] px-3 py-2 text-sm font-black text-[#97552e]">
                      <bdi dir="ltr">{field.value.toLocaleString("en-US")} {field.unit}</bdi>
                    </div>
                  </div>
                  <input
                    id={"calc-" + field.id}
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={field.value}
                    onChange={(event) => field.set(Number(event.target.value))}
                    className="wf-range h-2 w-full cursor-pointer appearance-none rounded-full bg-[#e5d2c1] accent-[#ad6e41]"
                    style={{ accentColor: "#aa6d40" }}
                  />
                  <div className="mt-2 flex justify-between text-xs text-[#a08a79]" dir="ltr">
                    <span>{field.min}</span>
                    <span>{field.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between bg-gradient-to-br from-[#402b20] to-[#201914] p-7 text-white sm:p-10">
            <div>
              <p className="text-xs font-black tracking-[.18em] text-[#edb184]">{arabic ? "سيناريوك التقريبي" : "YOUR ESTIMATED SCENARIO"}</p>
              <p className="mt-8 text-sm font-bold text-white/60">{arabic ? "قيمة الطلبات الشهرية المفترضة" : "Estimated monthly order value"}</p>
              <p className="mt-2 text-3xl font-black" dir="ltr">{formatMoney(numbers.revenue)}</p>
              <div className="mt-8 border-y border-white/15 py-7">
                <p className="text-sm font-bold text-white/65">{arabic ? "عمولات التطبيقات شهرياً" : "Illustrative monthly app commissions"}</p>
                <p className="mt-3 text-5xl font-black text-[#ffbe8e]" dir="ltr">{formatMoney(numbers.monthlyCommissions)}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#efab74] transition-[width] duration-200" style={{ width: rate / 35 * 100 + "%" }} />
                </div>
              </div>
              <p className="mt-7 text-sm font-bold text-white/65">{arabic ? "عمولة قد لا تُدفع شهرياً إذا انتقلت الحصة المفترضة" : "Potential monthly commission avoided on shifted orders"}</p>
              <p className="mt-3 text-4xl font-black text-[#edcf9e]" dir="ltr">{formatMoney(numbers.potentialMonthly)}</p>
              <p className="mt-5 text-sm text-white/55">{arabic ? "المجموع السنوي الافتراضي" : "Illustrative annual amount"}: <strong dir="ltr" className="text-[#ffbe8e]">{formatMoney(numbers.potentialAnnual)}</strong></p>
            </div>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-xs leading-7 text-white/55">
                {arabic
                  ? "هذه أرقام افتراضية وليست وفراً مضموناً. لا تفترض انتقال جميع الطلبات، ولا تشمل تكلفة إنشاء الموقع أو الصيانة أو الدفع أو التشغيل. لا علاقة لها برسوم التوصيل."
                  : "Illustrative only, not guaranteed savings. The model excludes website setup, maintenance, payments, and operating costs. It does not calculate delivery fees."}
              </p>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f2aa70] px-6 py-4 text-sm font-black text-[#2c1c13] transition hover:bg-[#ffd0a6]">
                {arabic ? "ناقش موقع طلب مباشر لمطعمك" : "Discuss a direct ordering website"}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
