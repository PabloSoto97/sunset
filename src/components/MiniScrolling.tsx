interface ScrollingTextProps {
  text: string;
}

export const MiniScrolling = ({ text }: ScrollingTextProps) => {
  return (
    <div className="w-full h-8 mt-10 overflow-hidden whitespace-nowrap bg-zinc-200  select-none flex items-center">
      <div className="flex animate-marquee">
        <span className="text-2xl sm:text-2xl lg:text-2xl font-semibold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-2xl lg:text-2xl font-semibold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-2xl lg:text-2xl font-semibold tracking-wide mx-8">
          {text}
        </span>
        <span className="text-2xl sm:text-2xl lg:text-2xl font-semibold tracking-wide mx-8">
          {text}
        </span>
      </div>
    </div>
  );
};
