import { useNavigate, useParams } from "react-router-dom";
import prevIcon from "../../assets/Prev.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import SpinnerComponent from "../../Components/SpinnerComponent/SpinnerComponent";

const ShowItemComponent = () => {
  const [title, setTitle] = useState<string>("Item Title");
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(0);
  const [addDate, setAddDate] = useState<string>("1/1/2024");
  const [updateDate, setUpdateDate] = useState<string>("1/1/2024");
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

  const param = useParams();
  const navigate = useNavigate();

  const goToPrevPage = () => {
    navigate("/show");
  };

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

  useEffect(() => {
    const url: string = `https://test1.focal-x.com/api/items/${param.id}`;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      navigate("/signin", { replace: true });
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data && response.status === 201) {
          const { name, image_url, price, created_at, updated_at } =
            response.data;
          setTitle(name);
          setImg(image_url);
          setPrice(price);
          setAddDate(created_at);
          setUpdateDate(updated_at);
        } else {
          console.error(`Unexpected response: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (param.id) {
      fetchItem();
    }
  }, [param.id]);

  return (
    <div className="min-h-screen px-6 pt-6 md:px-16 lg:px-24 xl:px-24">
      <div
        onClick={goToPrevPage}
        className="flex items-center justify-center w-10 h-10 border rounded-full cursor-pointer"
      >
        <img src={prevIcon} alt="Previous Icon" />
      </div>

      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <SpinnerComponent sm={false} />
        </div>
      ) : (
        <div className={`${screenHeight < 820 ? "sm:mt-3" : "sm:mt-[76px]"}`}>
          <h1 className="mt-0 text-6xl font-semibold text-center sm:text-start sm:w-fit w-[297px] mx-auto">
            {title}
          </h1>
          {img && (
            <img
              src={img}
              alt={title}
              className="lg:w-[373px] lg:h-[373px] sm:w-[250px] sm:h-[250px] w-[200px] h-[200px]  mt-10 rounded-lg mx-auto"
            />
          )}
          <div className="max-w-[1042px] mx-auto">
            <div className="flex flex-wrap custom-screen-2:justify-between mt-10 gap-x-[1.90rem] justify-center">
              <p className="text-2xl font-semibold md:text-4xl custom-screen:text-6xl">
                Price:
                <span className="text-2xl md:text-3xl custom-screen:text-[40px] text-semi-transparent-gray ml-6 inline-block">
                  ${price}
                </span>
              </p>
              <p className="text-2xl font-semibold md:text-4xl custom-screen:text-6xl">
                Added At:
                <span className="text-2xl md:text-3xl custom-screen:text-[40px] text-semi-transparent-gray ml-6 inline-block">
                  {new Date(addDate).toLocaleDateString("en-US")}
                </span>
              </p>
            </div>
            <p
              className={`mx-auto text-2xl font-semibold w-fit custom-screen:text-6xl md:text-4xl ${
                screenHeight < 820
                  ? "custom-screen-2:mt-6 mt-0"
                  : "custom-screen-2:mt-10 mt-0"
              }`}
            >
              Updated At:
              <span className="text-2xl md:text-3xl custom-screen:text-[40px] text-semi-transparent-gray ml-6 inline-block">
                {new Date(updateDate).toLocaleDateString("en-US")}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowItemComponent;
