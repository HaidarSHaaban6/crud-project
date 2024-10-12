import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import prevIcon from "./../../assets/Prev.svg";
import uploadIconImg from "./../../assets/Uploadicon.svg";

interface AddAndUpdateTemplateProps {
  title: string;
  name: string;
  setName: (name: string) => void;
  price: number | undefined;
  setPrice: (price: number) => void;
  image: File | null | string;
  setImage: (file: File | null) => void;
  handleBtn: () => void;
  loading: boolean;
}

const AddAndUpdateTemplate = ({
  title,
  name,
  setName,
  price,
  setPrice,
  image,
  setImage,
  handleBtn,
  loading,
}: AddAndUpdateTemplateProps) => {
  const navigate = useNavigate();

  const goToPrevPage = () => {
    navigate("/show");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, token]);

  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

  const updateScreenHeight = () => {
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    updateScreenHeight();
    window.addEventListener("resize", updateScreenHeight);
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);

  return (
    <div className="min-h-screen px-6 pt-6 md:px-16 lg:px-24 xl:px-24">
      <div
        onClick={goToPrevPage}
        className="flex items-center justify-center w-10 h-10 border rounded-full cursor-pointer"
      >
        <img src={prevIcon} alt="Previous Icon" />
      </div>
      <div className={`${screenHeight < 820 ? "sm:mt-3" : "sm:mt-[76px]"}`}>
        <h1 className="font-semibold text-4xl custom-screen:text-6xl lg:mb-[76px] md:mb-12">
          {title}
        </h1>
        <div className="grid grid-cols-1 text-xl lg:grid-cols-2 gap-[34.13px] max-w-[1042px] mx-auto">
          <div>
            <div className="mb-9 lg:mb-16">
              <label
                htmlFor="name"
                className="block custom-screen:text-[32px] font-medium capitalize text-gray-500 mb-4"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full border h-[44px] pl-[15px]"
                placeholder="Enter the product name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block custom-screen:text-[32px] font-medium capitalize text-gray-500 mb-4"
              >
                price
              </label>
              <input
                type="number"
                id="price"
                required
                className="w-full border h-[44px] pl-[15px]"
                placeholder="Enter the product price"
                defaultValue={price !== undefined ? price : ""}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="relative inline-block">
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <label className="block custom-screen:text-[32px] font-medium capitalize text-gray-500 mb-4">
              image
            </label>
            <label
              htmlFor="file-input"
              className="flex items-center justify-center mb-4 transition-colors duration-300 border border-dashed rounded cursor-pointer h-[130px] lg:h-[209px] hover:bg-gray-200"
            >
              {image ? (
                typeof image === "string" ? (
                  <img
                    src={image}
                    alt="Uploaded Image"
                    className="lg:w-[120px] lg:h-[108px] w-[90px] h-[78px]"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded Image"
                    className="lg:w-[120px] lg:h-[108px] w-[90px] h-[78px]"
                  />
                )
              ) : (
                <img
                  src={uploadIconImg}
                  alt="Upload Icon"
                  className="lg:w-[120px] lg:h-[108px] w-[90px] h-[78px]"
                />
              )}
            </label>
          </div>
        </div>
        <div className="w-full mt-4 sm:mt-10 lg:mt-[120px]">
          <button
            className="w-[199px] h-[61px] bg-main-theme-color-100 text-white rounded font-medium text-[32px] mx-auto block"
            onClick={handleBtn}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAndUpdateTemplate;
