'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Clock, Star, Sparkles, CheckCircle2, Phone, Zap, Users, Award, Wrench, Sun, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
    {
        icon: Shield,
        title: 'Trusted Professionals',
        description: 'All our service providers are vetted, trained, and background-checked for your peace of mind.',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        icon: Clock,
        title: 'On-Time, Every Time',
        description: 'We value your time. Our professionals arrive on schedule with punctuality guaranteed.',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        icon: Star,
        title: 'Quality Guaranteed',
        description: 'Not satisfied? We will make it right or give you a full refund. Your satisfaction is our priority.',
        gradient: 'from-amber-500 to-orange-600',
    },
];

const stats = [
    { value: '10K+', label: 'Happy Customers', icon: Users },
    { value: '500+', label: 'Expert Professionals', icon: Award },
    { value: '50+', label: 'Service Categories', icon: Wrench },
    { value: '99%', label: 'Satisfaction Rate', icon: Star },
];

const services = [
    { name: 'Tank Cleaning', icon: Droplets, color: 'bg-sky-500' },
    { name: 'Solar Cleaning', icon: Sun, color: 'bg-blue-600' },
    { name: 'Acid Wash', icon: Shield, color: 'bg-green-500' },
];

const steps = [
    { step: '01', title: 'Browse Services', description: 'Explore our wide range of professional home services' },
    { step: '02', title: 'Book Online', description: 'Select your preferred date, time, and service details' },
    { step: '03', title: 'We Arrive', description: 'Our vetted professionals show up ready to work' },
    { step: '04', title: 'Enjoy Results', description: 'Sit back and enjoy your perfectly serviced home' },
];

export default function HomePage() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/30" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/20 blur-3xl animate-float" />
                <div
                    className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/15 blur-3xl animate-float"
                    style={{ animationDelay: '1s' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-cyan-300/10 to-blue-400/10 blur-3xl" />

                {/* Decorative Elements */}
                <div className="absolute top-32 right-20 hidden lg:block">
                    <div className="relative">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/25 rotate-12 animate-bounce-subtle" />
                        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-400" />
                    </div>
                </div>

                <div className="absolute bottom-32 left-20 hidden lg:block">
                    <div
                        className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-500/25 -rotate-12 animate-bounce-subtle"
                        style={{ animationDelay: '0.5s' }}
                    />
                </div>

                <div className="container-custom relative z-10">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm animate-fade-in-up">
                            <Sparkles className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-slate-700">Trusted by 10,000+ homeowners</span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="mb-6 text-5xl font-black tracking-tight text-slate-900 md:text-7xl lg:text-8xl animate-fade-in-up"
                            style={{ animationDelay: '100ms' }}
                        >
                            Cleaning Services
                            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                Made Simple
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mb-10 text-lg text-slate-600 md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
                            style={{ animationDelay: '200ms' }}
                        >
                            From cleaning to repairs, connect with trusted professionals who deliver exceptional quality.
                            <span className="font-semibold text-slate-800"> Book in minutes, not hours.</span>
                        </p>

                        {/* CTA Buttons */}
                        <div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Button
                                size="lg"
                                asChild
                                className="group h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                            >
                                <Link href="/services">
                                    Explore Services
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="h-14 px-8 text-base font-semibold border-2 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
                            >
                                <Link href="/inquiry">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Get Free Quote
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div
                            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in-up"
                            style={{ animationDelay: '400ms' }}
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span>Free Estimates</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span>Licensed & Insured</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span>Satisfaction Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>

            {/* Quick Services Preview */}
            <section className="relative bg-white py-8 -mt-1">
                <div className="container-custom">
                    <div className="flex flex-wrap items-center justify-center gap-4 animate-stagger">
                        {services.map((service) => (
                            <Link
                                key={service.name}
                                href="/services"
                                className="group flex items-center gap-3 rounded-2xl border bg-white px-5 py-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200"
                            >
                                <div className={`${service.color} p-2.5 rounded-xl text-white shadow-sm`}>
                                    <service.icon className="h-5 w-5" />
                                </div>
                                <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                    {service.name}
                                </span>
                            </Link>
                        ))}
                        <Link href="/services" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group text-center animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 group-hover:from-blue-100 group-hover:to-indigo-200 transition-colors">
                                    <stat.icon className="h-7 w-7 text-blue-600" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 md:text-4xl">{stat.value}</div>
                                <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute inset-0 bg-dot-pattern opacity-30" />

                <div className="container-custom relative z-10">
                    <div className="mb-16 text-center">
                        <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-blue-200 text-blue-700 bg-blue-50">
                            Why Choose Us
                        </Badge>
                        <h2 className="mb-4 text-3xl font-black text-slate-900 md:text-5xl">Built on Trust & Excellence</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We&apos;ve reimagined home services to deliver an experience that&apos;s seamless, reliable, and delightful.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card
                                key={feature.title}
                                className="group relative overflow-hidden border-0 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient Border Top */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />

                                <CardContent className="p-8">
                                    <div
                                        className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                                    >
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

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

            {/* Testimonial/Social Proof Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                {/* Decorative Orbs */}
                <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

                <div className="container-custom relative z-10">
                    <div className="text-center text-white">
                        <Badge className="mb-4 px-4 py-1.5 text-sm font-medium bg-white/10 text-white border-white/20 hover:bg-white/20">
                            <Star className="mr-1.5 h-4 w-4 text-amber-400" />
                            Customer Love
                        </Badge>
                        <h2 className="mb-6 text-3xl font-black md:text-5xl">Loved by Thousands</h2>
                        <p className="mb-12 text-xl text-blue-100 max-w-2xl mx-auto">
                            Join over 10,000 happy customers who trust us with their home services.
                        </p>

                        {/* Rating Display */}
                        <div className="flex items-center justify-center gap-1 mb-8">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-8 w-8 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        <p className="text-2xl font-bold mb-2">4.9 out of 5</p>
                        <p className="text-blue-200">Based on 2,500+ reviews</p>

                        {/* Quick Testimonials */}
                        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
                            {[
                                { quote: "Best Tank Cleaning service I've ever used. Professional and punctual!", author: 'Sarah M.' },
                                { quote: 'Amazing quality work at fair prices. Highly recommend!', author: 'Raj K.' },
                                { quote: 'They transformed my home. Will definitely use again!', author: 'Priya S.' },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-left border border-white/10 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <p className="text-white/90 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                                    <p className="text-sm font-semibold text-blue-200">— {testimonial.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    );
}
