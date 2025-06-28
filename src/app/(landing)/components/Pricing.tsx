import { Button } from "@/components/ui/button";

const plans = [
    { name: "Free", price: "€0", features: ["20 Templates", "Basic Preview", "MP4 Download"] },
    { name: "Pro", price: "€49", features: ["All Templates", "Faster Rendering", "HD Exports"] },
    { name: "Team", price: "€199", features: ["Team Access", "Priority Support", "Commercial Use"] },
];

export function Pricing() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <h3 className="text-3xl font-bold text-center mb-12">Pricing Plans</h3>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="p-8 bg-white rounded-lg shadow flex flex-col">
                        <h4 className="text-2xl font-semibold mb-4">{plan.name}</h4>
                        <p className="text-4xl font-bold mb-6">{plan.price}</p>
                        <ul className="flex-1 mb-6 space-y-2">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center">
                                    <span className="mr-2 text-green-600">✓</span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full" variant={plan.name === "Free" ? "outline" : undefined}>
                            {plan.name === "Free" ? "Get Started" : "Buy now"}
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
