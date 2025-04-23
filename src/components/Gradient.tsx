// Individual gradient parts
const Bottom = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
);

const Top = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/90" />
);

const Left = () => (
  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/90" />
);

const Right = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90" />
);

// Main Gradient component
const Gradient = () => { 
  return (
    <div className="hidden! md:relative! inset-0 pointer-events-none">
      <Gradient.Top />
      <Gradient.Bottom />
      <Gradient.Left />
      <Gradient.Right />
    </div>
  );
};

// Attach subcomponents
Gradient.Top = Top;
Gradient.Bottom = Bottom;
Gradient.Left = Left;
Gradient.Right = Right;

export default Gradient;
