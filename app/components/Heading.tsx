'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, centered }) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-start'}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="mt-2 font-light text-neutral-500">{subtitle}</h2>
    </div>
  );
};

export default Heading;
