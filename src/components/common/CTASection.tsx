'use client';

'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <>
            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container-custom">
                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

                        {/* Decorative Gradient */}
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />

                        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 mb-6">
                                <Zap className="h-4 w-4 text-amber-400" />
                                Ready to get started?
                            </div>

                            <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Transform Your Home Today</h2>
                            <p className="mb-10 text-lg text-slate-300 max-w-xl mx-auto">
                                Book a service today and experience the difference. First-time customers get 10% off!
                            </p>

                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    asChild
                                    className="group h-14 px-8 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all hover:-translate-y-0.5"
                                >
                                    <Link href="/services">
                                        View All Services
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    className="h-14 px-8 text-base font-semibold border-2 border-white/30 text-slate-900 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                                >
                                    <Link href="/inquiry">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
