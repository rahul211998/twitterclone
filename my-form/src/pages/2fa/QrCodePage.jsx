import { useEffect, useState } from 'react';
import { postRequest } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import OtpInput from "react-otp-input";

const QrCodePage = () => {

  const [data, setData] = useState({
    message: "",
    qrCode: "",  // base64 image string from backend
    secret: "",
  });

  const navigate = useNavigate()

  const [qrcodeKey,setQrcodeKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const createQrCodeFunction = async () => {
    try {
      const response = await postRequest("/auth/2fa/setup");
      console.log("response createQrCodeFunction", response);
      setData({
        message: response.message,
        qrCode: response.qrCode,   // ✅ set each field separately
        secret: response.secret,
      });

      console.log("data createQrCodeFunction",data)
    } catch (error) {
      console.error("error in createQrCodeFunction", error);
    } finally {
      setLoading(false);
    }
  };

  const qrCodeSendingFunction = async () => {
    const response = await postRequest("/auth/2fa/verify-setup",{token : qrcodeKey})
    if(response.success){
      localStorage.clear();

        localStorage.setItem("user",JSON.stringify({
        username : response.userdata.username,
        fullName : response.userdata.fullName,
        userId : response.userdata._id
      }))

      navigate("/homepage");
      return;
    }
    

      console.log("check again");
      

    
    console.log("response qrCodeSendingFunction",response)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    createQrCodeFunction();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Scan the QR code below with your authenticator app
        </p>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          {loading ? (
            <div className="w-48 h-48 rounded-lg bg-gray-100 animate-pulse" />
          ) : (
            <img
              src={data.qrCode}  // ✅ base64 string goes directly in src
              alt="QR Code"
              className="w-48 h-48 rounded-lg border border-gray-200"
            />
          )}
        </div>


        <p className="text-xs text-gray-400">{data.message}</p>
        
        <div className='mt-2'>
          {/* <input className='border-2 border-amber-700' type="number" value= {qrcodeKey} onChange={(e) => setQrcodeKey(e.target.value)}/> */}
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
        value={qrcodeKey}
        onChange={(value) => setQrcodeKey(value)}
        numInputs={6}
        renderInput={(props) => (
          <input
          // type="tel"
            {...props}
            // className="p-5 h-12 mx-auto mt-50 text-center text-black text-xl border-2 rounded-md"
          />
        )}
      />
        <button className='bg-blue-600 px-3 py-2 rounded-2xl mt-2 cursor-pointer' onClick={qrCodeSendingFunction}>click</button>
        </div>

      </div>
    </div>
  );
};

export default QrCodePage;







