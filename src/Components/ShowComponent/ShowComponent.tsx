import { useEffect, useState } from "react";
import viewerImg from "./../../assets/viewer.svg";
import axios from "axios";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import { NavLink, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

const ShowComponent = () => {
  const [search, setSearch] = useState<string>("");
  const [showData, setShowData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  const updateItemsPerView = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(8);
    } else if (window.innerWidth >= 1024) {
      setItemsPerPage(6);
    } else if (window.innerWidth >= 768) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(2);
    }
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const url: string = "https://test1.focal-x.com/api/items";
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(response);
        // console.log("=====================");
        // console.log("request", response.request);
        // console.log("=====================");
        // console.log("data", response.data);
        // console.log("=====================");
        // console.log("config", response.config);
        // console.log("=====================");
        // console.log("status", response.status);
        // console.log("=====================");

        if (response.data && response.status === 201) {
          setShowData(response.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredItems = showData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const moveToEditPage = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (itemToDelete === null) return;

    setIsPopupVisible(false);

    const url = `https://test1.focal-x.com/api/items/${itemToDelete}`;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setShowData((prevData) =>
        prevData.filter((item) => item.id !== itemToDelete)
      );
    } catch (error) {
      console.error("Error deleting data", error);
    } finally {
      setLoading(false);
    }
  };

  const moveToItemInfoPage = (id: number) => {
    navigate(`/show/${id}`);
  };

  const showDeletePopup = (id: number) => {
    setItemToDelete(id);
    setIsPopupVisible(true);
  };

  const hideDeletePopup = () => {
    setIsPopupVisible(false);
    setItemToDelete(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative flex flex-col min-h-screen px-6 md:px-16 lg:px-24 xl:px-24">
      <div className="flex flex-col items-center mt-6 ">
        <div className="relative w-full md:w-[64.5%]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search product by name"
            className="w-full h-10 pl-4 pr-10 border rounded-lg"
            value={search}
          />
          <img
            src={viewerImg}
            alt="Viewer Image"
            className="absolute transform -translate-y-1/2 right-3 top-1/2"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12 mb-8">
        <NavLink
          to="/add"
          replace
          className="uppercase bg-main-theme-color-100 w-[199px] h-[44px] flex justify-center items-center text-white rounded font-medium text-sm"
        >
          Add New Product
        </NavLink>
      </div>

      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <SpinnerComponent sm={false} />
        </div>
      ) : (
        <div className="flex-grow mt-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center max-w-[952px] mx-auto">
            {currentItems.map((item) => (
              <div
                onClick={() => {
                  moveToItemInfoPage(item.id);
                }}
                key={item.id}
                className={`relative shadow-custom-shadow rounded-2xl flex justify-center items-center overflow-hidden group cursor-pointer ${
                  screenHeight <= 853
                    ? "w-[160px] h-[160px]"
                    : "xl:w-[208px] xl:h-[208px] w-[195px] h-[195px]"
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 translate-y-full opacity-0 bg-off-white-shade-color rounded-2xl group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="font-medium lg:text-[30px] mb-8 text-center !text-[19px]">
                    {item.name}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveToEditPage(item.id);
                      }}
                      className="font-medium capitalize bg-main-theme-color-100 lg:w-[81px] lg:h-[34px] rounded"
                    >
                      edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showDeletePopup(item.id);
                      }}
                      className="font-medium capitalize bg-red-color lg:w-[81px] lg:h-[34px] rounded"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${
              screenHeight < 900 ? "h-[176px]" : "pt-16 pb-[100px]"
            } absolute bottom-0 left-0 right-0 flex justify-center w-full bg-white`}
          >
            <Pagination
              dataArray={filteredItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-opacity-50 bg-semi-transparent-black backdrop-blur-md"></div>
          <div className="lg:w-[948px] lg:h-[321px] sm:w-[500px] w-4/5 h-[250px] bg-white rounded-[20px] absolute flex justify-center items-center flex-col lg:px-[180px] sm:px-[70px] px-[30px]">
            <p className="text-[22px] font-semibold text-center">
              Are you sure you want to delete the product?
            </p>
            <div className="flex items-center justify-between w-full mt-10 lg:mt-20">
              <button
                onClick={handleDelete}
                className="text-white w-[100px] h-[40px] lg:w-[199px] lg:h-[61px] bg-main-theme-color-100 font-medium lg:text-[32px] rounded"
              >
                Yes
              </button>
              <button
                onClick={hideDeletePopup}
                className="text-white w-[100px] h-[40px] lg:w-[199px] lg:h-[61px] bg-main-theme-color-100 font-medium lg:text-[32px] rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowComponent;
