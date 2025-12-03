interface ScrollingTextProps {
  text: string;
}

export const ScrollingText = ({ text }: ScrollingTextProps) => {
  return (
    <div className="w-full h-24 overflow-hidden whitespace-nowrap bg-white select-none flex items-center">
      <div className="flex animate-marquee">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mx-8">
          {text}
        </span>
      </div>
    </div>
  );
};
