import { useState } from "react";
import SignTemplateComponent from "../SignTemplateComponent/SignTemplateComponent";
import uploadIconImg from "./../../assets/Uploadicon.svg";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const SignUpComponent = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");

    if (password !== confirmationPassword) {
      setErrorMessage("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }

    if (firstName && lastName && email && password && file) {
      const url: string = "https://test1.focal-x.com/api/register";
      console.log("All fields are filled");

      const formData = new FormData();
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("email", email.trim());
      formData.append("password", password.trim());
      formData.append("password_confirmation", confirmationPassword.trim());
      formData.append("profile_image", file);
      formData.append("user_name", `${firstName}_${lastName}`);

      setLoading(true);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === "success") {
          if (response.data.data.token) {
            localStorage.setItem("token", response.data.data.token);
          }

          localStorage.setItem("user", JSON.stringify(response.data.data.user));

          navigate("/show", { replace: true });
        } else {
          console.error(response.data.message || "Failed to sign up");
          throw new Error(response.data.message || "Failed to sign up");
        }
      } catch (error: AxiosError | any) {
        setErrorMessage(error.response?.data?.message || "Sign-up failed");
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Please fill in all fields.");
      console.warn("Not all fields are filled");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const signUpText: string =
    "Fill in the following fields to create an account.";
  // const questionText = "Do you have an account?";

  return (
    <SignTemplateComponent
      title="sign up"
      text={signUpText}
      // qText={questionText}
      // sText="Sign in"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mt-6">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-500 capitalize"
            >
              name
            </label>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <input
                type="text"
                className="w-full pl-4 border border-gray-300 rounded sm:w-200px h-11 placeholder:text-xs"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full pl-4 border border-gray-300 rounded sm:w-200px h-11 placeholder:text-xs"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-500 capitalize"
            >
              email
            </label>
            <input
              type="email"
              className="w-full pl-4 border border-gray-300 rounded h-11 placeholder:text-xs"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-500 capitalize"
            >
              password
            </label>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <input
                type="password"
                className="w-full pl-4 border border-gray-300 rounded sm:w-200px h-11 placeholder:text-xs"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full pl-4 border border-gray-300 rounded sm:w-200px h-11 placeholder:text-xs"
                placeholder="Re-enter your password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="relative inline-block mt-4">
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <label className="block mb-4 text-sm font-medium text-gray-500 capitalize">
              profile image
            </label>
            <label
              htmlFor="file-input"
              className="flex items-center justify-center w-20 h-20 mb-4 transition-colors duration-300 border border-dashed rounded cursor-pointer sm:w-100px sm:h-100px hover:bg-gray-200"
            >
              {file ? (
                <img src={URL.createObjectURL(file)} alt="Uploaded Image" />
              ) : (
                <img src={uploadIconImg} alt="Upload Icon" />
              )}
            </label>
          </div>
        </div>
        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
        <button
          className="w-full text-sm font-medium text-white uppercase rounded-md bg-main-theme-color-100 h-11"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
        <p className="mx-auto mt-6 mb-5 text-sm text-center text-dim-gray-color w-fit">
          Do you have an account?
          <span
            className="pl-1 underline text-main-theme-color-100 hover:cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </span>
        </p>
      </form>
    </SignTemplateComponent>
  );
};

export default SignUpComponent;
