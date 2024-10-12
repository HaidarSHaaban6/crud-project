import SignTemplateComponent from "../../Components/SignTemplateComponent/SignTemplateComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInComponent = () => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (input1 && input2) {
      await handleSignIn(input1, input2);
    } else {
      setError("Please Enter Your Email And Password Again.");
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const url: string = "https://test1.focal-x.com/api/login";

    // const userData = {
    //   email: email.trim(),
    //   password: password.trim(),
    // };

    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password.trim());

    setLoading(true);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.user && response.data.token) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/show", { replace: true });
      } else {
        setError("Login failed, please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Login Failed, Please Try Again.");
    } finally {
      setLoading(false);
    }
  };

  const signInText: string = "Enter your credentials to access your account";
  // const questionText = "Don’t have an account?";

  return (
    <SignTemplateComponent
      title="sign in"
      text={signInText}
      // qText={questionText}
      // sText="Create one"
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-12">
          <label
            htmlFor="input1"
            className="block text-sm font-medium capitalize text-gray-500 mb-2.5"
          >
            email
          </label>
          <input
            type="email"
            id="input1"
            className="w-full pl-4 border border-gray-300 rounded h-11 placeholder:text-xs"
            placeholder="Enter your email"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            required
          />
        </div>
        <div className="mt-5 mb-7">
          <label
            htmlFor="input2"
            className="block text-sm font-medium capitalize text-gray-500 mb-2.5"
          >
            password
          </label>
          <input
            type="password"
            id="input2"
            className="w-full pl-4 border border-gray-300 rounded h-11 placeholder:text-xs"
            placeholder="Enter your password"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="mx-auto mb-4 text-sm text-center text-red-500 w-fit">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full text-sm font-medium text-white uppercase rounded-md bg-main-theme-color-100 h-11"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="mx-auto text-sm text-center text-dim-gray-color w-fit mt-7 mb-41px">
          Don’t have an account?
          <span
            className="pl-1 underline text-main-theme-color-100 hover:cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create one
          </span>
        </p>
      </form>
    </SignTemplateComponent>
  );
};

export default SignInComponent;
