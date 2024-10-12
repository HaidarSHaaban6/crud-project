import { useEffect, useState } from "react";
import AddAndUpdateTemplate from "../AddAndUpdateTemplate/AddAndUpdateTemplate";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";

const EditComponent = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [imageSrc, setImageSrc] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(true);

  // test
  const [data, setData] = useState();

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url: string = `https://test1.focal-x.com/api/items/${param.id}`;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
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

        if (response?.data && response.status) {
          const { name, image_url, price } = response.data;
          setName(name);
          setImageSrc(image_url);
          setPrice(price);
        } else {
          console.error(`Unexpected response: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoadingSpinner(false);
      }
    };

    if (param.id) {
      fetchItem();
    }
  }, [param.id]);

  const handleEditBtn = async () => {
    if (!name || price === undefined || (!imageFile && !imageSrc)) {
      console.error("All fields are required");
      return;
    }

    const url = `https://test1.focal-x.com/api/items/${param.id}`;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name);
    formData.append("price", price.toString());

    if (imageFile) {
      formData.append("image_url", imageFile);
    }

    setLoading(true);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(formData);
      console.log({ name, price, imageFile, formData });

      if (imageFile) {
        setImageSrc(URL.createObjectURL(imageFile));
      }

      if (response.data) {
        setName("");
        setPrice(undefined);
        setImageFile(null);
        navigate("/show");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }

    // ######### There is a problem updating the image and I cannot solve it #########

    // const response = await axios
    //   .post(url, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     setData(res);
    //     console.log(data);
    //     console.log(res);
    //   });
  };

  return (
    <>
      {loadingSpinner ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <SpinnerComponent sm={false} />
        </div>
      ) : (
        <AddAndUpdateTemplate
          title="Edit Item"
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          image={imageFile ? imageFile : imageSrc || null}
          setImage={setImageFile}
          handleBtn={handleEditBtn}
          loading={loading}
        />
      )}
    </>
  );
};

export default EditComponent;
