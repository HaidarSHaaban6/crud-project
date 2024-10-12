import { useState } from "react";
import AddAndUpdateTemplate from "../../Components/AddAndUpdateTemplate/AddAndUpdateTemplate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddComponent = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleAddBtn = async () => {
    if (!name || price === undefined || !image) {
      console.error("All fields are required");
      return;
    }

    const url = "https://test1.focal-x.com/api/items";
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.status === 201) {
        setName("");
        setPrice(undefined);
        setImage(null);
        navigate("/show");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddAndUpdateTemplate
      title="Add New Item"
      name={name}
      setName={setName}
      price={price}
      setPrice={setPrice}
      image={image}
      setImage={setImage}
      handleBtn={handleAddBtn}
      loading={loading}
    />
  );
};

export default AddComponent;
