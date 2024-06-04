import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from 'notistack';

export const useAuth = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", { variant: "error" });
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", { variant: "error" });
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Fout bij het decoderen van het token:", error);
        enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", { variant: "error" });
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  }, [navigate, enqueueSnackbar]);
};

