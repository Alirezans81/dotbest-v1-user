/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  useEffect(() => navigateToHome(), []);

  return <></>;
}
