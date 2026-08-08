import { useState, useContext, useEffect } from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { postRequest } from "../../services/Api";
import { AuthContext } from "../../context/AuthContext";
import OtpInput from "react-otp-input";

const Optional2fa = () => {


  const [otp,setOtp] = useState("");
  const navigate = useNavigate();
  const {setAuthUser } = useContext(AuthContext)

  const sendOtpToServer = async () => {
    try {
      const response = await postRequest("/auth/2fa/challenge",{token : otp});


      if(response.error){
        navigate("/twofaerrorpage");
        return;
      }

      localStorage.setItem("user",JSON.stringify({
        username : response.userdata.username,
        fullName : response.userdata.fullName,
        userId : response.userdata._id
      }))

      setAuthUser(response.userdata);

      navigate("/homepage")

      
      
      console.log("response sendOtpToServer",response)
    } catch (error) {
      console.log("error sendOtpToServer",error)
    }
  }

  // const {requires2FA} = location.state || {}
  const location = useLocation();
  const { requires2FA, myuserdata } = location.state || {};

  const handleEnable2FA = () => {
    navigate("/qrcodepage");
    console.log("thanks for enable")
  };

  const handleCancel = () => {
    localStorage.setItem("user",JSON.stringify({
      username : myuserdata.username,
      fullName : myuserdata.fullName,
      userId : myuserdata._id
    }))

    navigate("/homepage");
  };

  useEffect(() => {
    console.log(otp);
    
  },[otp])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">

        {location.state.requires2FA ? 
        <div className="bg-blue-800 h-auto w-max p-5 rounded-2xl">

          <h1 className="text-3xl py-5">Enter otp</h1>
          {/* <input className="w-auto" type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)}/> */}

      <OtpInput
      inputStyle={ {
  width: "56px",
  height: "56px",
  fontSize: "22px",
  fontWeight: "600",
  textAlign: "center",
  border: "2px solid #D1D5DB",
  borderRadius: "12px",
  backgroundColor: "#FFFFFF",
  color: "#111827",
  outline: "none",
  margin: "0 6px",
      }
      }
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => (
          <input
          // type="tel"
            {...props}
            // className="p-5 h-12 mx-auto mt-50 text-center text-black text-xl border-2 rounded-md"
          />
        )}
      />
          <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={sendOtpToServer}>click</button>
        </div> : 
        
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Enable Two-Factor Authentication
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Add an extra layer of security to your account.
        </p>

        
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 mb-6 text-left">
          <ul className="space-y-2 text-sm text-indigo-700">
            {[
              "Protects your account even if your password is stolen",
              "Requires a code from your phone on every login",
              "You can turn it off anytime from settings",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleEnable2FA}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium py-2.5 rounded-lg transition duration-150 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Enable 2FA
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 active:scale-95 py-2.5 rounded-lg transition duration-150 cursor-pointer"
          >
            Maybe later
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          You can always enable this later in your account settings.
        </p>
        </div>}

      </div>
    </div>
  );
};

export default Optional2fa;