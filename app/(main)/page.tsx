import Image from "next/image";
import GlitchText from "../_components/GlitchText";
import TextType from "../_components/TextType";
import HeroImage from "../_components/HeroImage";
import { stats } from "@/data/stats";
import { features } from "@/data/features";
import { testimonials } from "@/data/testimonial";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import { Button } from "../_components/ui/button";



export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <h1 >
          <GlitchText
            speed={8}
            enableShadows
            enableOnHover={false}
            className='custom-class text-xl md:text-3xl'
          >
            Take Control of Your
          </GlitchText>
        </h1>
        <h1>
          <GlitchText
            speed={8}
            enableShadows
            enableOnHover={false}
            className='custom-class text-xl md:text-3xl'
          >
            Expenses with AI
          </GlitchText>
        </h1>
      </div>
      <div className="flex w-full items-center justify-center">
        <TextType
          className="md:text-3xl tracking-wider font-medium"
          text={["Track spending, manage budgets", "and gain actionable insights", "through intelligent financial analytics."]}
          typingSpeed={80}
          pauseDuration={1000}
          showCursor
          cursorCharacter="_"
          texts={["Welcome to React Bits! Good to see you!", "Build some amazing experiences!"]}
          deletingSpeed={50}
          cursorBlinkDuration={0.5}
        />
      </div>
      <div className="w-full flex items-center justify-center my-10">
        <HeroImage />
      </div>

      <section className="flex justify-center items-center w-full bg-[#1b1722] mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-3xl md:text-5xl font-bold text-white">
                {stat.value}
              </h3>
              <p className="mt-2 text-zinc-400 text-sm md:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center w-full py-8 my-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-800 p-6"
              >
                <Icon className="h-8 w-8 text-violet-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col justify-center items-center w-full py-8">
        <h2 className="w-full text-center text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col rounded-xl border border-zinc-800 p-6">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="grayscale"
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="text-xs">{testimonial.role}</span>
                </div>
                <div className="flex items-center justify-end gap-0.5 ml-auto">
                  {[...Array(testimonial.rating)].map((r, i) => (
                    <Star key={i} className="fill-yellow-400 text-yellow-400" size={12}/>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                {testimonial.testimonial}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col gap-3 p-8 items-center justify-center bg-[#1b1722]">
          <h2 className="text-3xl font-bold">Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of users who are already managing their finances smarter with Finora.</p>
          <Button className="h-10 mt-4 py-4 px-2 font-bold rounded-lg cursor-pointer bg-linear-to-r from-[#5227FF] to-[#B497CF]">Get Started</Button>
      </section>
    </>
  );
}
