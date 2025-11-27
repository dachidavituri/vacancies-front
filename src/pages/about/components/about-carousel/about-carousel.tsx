import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const AboutCarousel: React.FC = () => {
  return (
    <div className="flex w-full justify-center px-8">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          <CarouselItem>
            <div className="rounded-2xl border border-[#3A6FF8]/20 bg-[#11172a] p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-[#F5C96B]">
                For Job Seekers
              </h2>
              <p className="text-gray-300">
                Browse listings, filter by industry, description or title, and
                apply effortlessly. Build your future with roles tailored to
                your skills.
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="rounded-2xl border border-[#3A6FF8]/20 bg-[#11172a] p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-[#F5C96B]">
                Our Mission
              </h2>
              <p className="text-gray-300">
                We aim to empower individuals and companies by creating
                opportunities, fostering growth, and building brighter futures.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="bg-black" />
        <CarouselNext className="bg-black" />
      </Carousel>
    </div>
  );
};
export default AboutCarousel;
