import logoImg from "./../../assets/logo.svg";

type SignTemplateComponentProps = {
  children: React.ReactNode;
  title: string;
  text: string;
  // qText: string;
  // sText: string;
};

const SignTemplateComponent: React.FC<SignTemplateComponentProps> = ({
  children,
  title,
  text,
  // qText,
  // sText,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-2 sm:py-0 bg-main-theme-color-50 sm:px-0">
      <div className="px-4 pt-4 bg-white h-max rounded-20px w-476px sm:px-30px sm:pt-42px">
        <img src={logoImg} alt="logoImg" className="mx-auto" />
        <p className="pt-6 mx-auto font-semibold uppercase text-22px w-fit sm:pt-43px">
          {title}
        </p>
        <p className="mx-auto text-sm text-center w-fit text-dim-gray-color mt-9px">
          {text}
        </p>
        {children}
        {/* <p className="mx-auto text-sm text-dim-gray-color w-fit mt-7">
          {qText}
          <span className="pl-1 underline text-main-theme-color-100 hover:cursor-pointer">
            {sText}
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default SignTemplateComponent;
