const Gradient = () => {
  return (
    <div className="hidden! md:absolute! inset-0 pointer-events-none">
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

      {/* Left & Right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
    </div>
  );
};

export default Gradient;
