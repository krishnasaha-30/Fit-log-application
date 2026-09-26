import React from "react";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";
const Hero = () => {
  return (
    <section className="m-5 rounded-[32px] border border-base-300 bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto grid gap-10 px-8 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        {/* Text */}
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Workout Library
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight md:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-5 max-w-md text-base-content/60">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="btn btn-primary mt-8 rounded-full font-display font-semibold uppercase tracking-wide"
          >
            Browse Workouts
          </a>
        </div>

        {/* Visual */}
        <div className="relative flex items-center justify-center">
          <Image
            src={bannerImg}
            alt="FitLog workout banner"
            priority
            className="h-auto w-full max-w-sm object-contain lg:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
