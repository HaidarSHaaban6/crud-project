const SpinnerComponent = ({ sm }: { sm: boolean }) => {
  return (
    <div
      className={`border-gray-200 rounded-full border-t-main-theme-color-50 animate-spin ${
        sm ? "border-4 border-t-4 w-6 h-6" : "border-8 border-t-8 w-16 h-16"
      }`}
    ></div>
  );
};

export default SpinnerComponent;
