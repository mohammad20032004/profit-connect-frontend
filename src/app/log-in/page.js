import Input from "@/components/common/Input";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LoginPage from "@/components/forms/LoginPage";
export default function LogIn() {
  return (
    <div style={{ position: 'absolute', height: '100vh', width: '100%' }}>
    <LoginPage /> 
    </div>
  );
}