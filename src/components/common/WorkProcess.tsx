'use client';

import { Badge } from '@/components/ui/badge';

const steps = [
    { step: '01', title: 'Browse Services', description: 'Explore our wide range of professional home services' },
    { step: '02', title: 'Book Online', description: 'Select your preferred date, time, and service details' },
    { step: '03', title: 'We Arrive', description: 'Our vetted professionals show up ready to work' },
    { step: '04', title: 'Enjoy Results', description: 'Sit back and enjoy your perfectly serviced home' },
];

export default function WorkProcess() {
    return (
        <>
            {/* How It Works Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container-custom">
                    <div className="mb-16 text-center">
                        <Badge
                            variant="outline"
                            className="mb-4 px-4 py-1.5 text-sm font-medium border-emerald-200 text-emerald-700 bg-emerald-50"
                        >
                            Simple Process
                        </Badge>
                        <h2 className="mb-4 text-3xl font-black text-slate-900 md:text-5xl">How It Works</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Getting professional help for your home has never been easier. Just four simple steps.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div
                                key={step.step}
                                className="group relative animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                                )}

                                <div className="relative rounded-2xl border-2 border-slate-100 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg">
                                    {/* Step Number */}
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                                        {step.step}
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                                    <p className="text-slate-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
