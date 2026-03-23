"use client";
import { useState } from 'react';
import SingupPageStep1 from "@/components/forms/singUp/SingupPageStep1";
import SingupPageStep2 from "@/components/forms/singUp/SingupPageStep2";
import SingupPageStep3 from "@/components/forms/singUp/SingupPageStep3";
import { signUp } from "@/services/authService";
export default function SingUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
    console.log('Moving to step:', step + 1, 'Data:', { ...formData, ...data });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    console.log('Back to step:', step - 1);
  };

  const handleComplete = async(otp) => {
   try {
    const data = await signUp(formData); 
    
    alert("تم إنشاء الحساب بنجاح!");
    console.log(data);

  } catch (error) {
    alert(error.message); 
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      {step === 1 && <SingupPageStep1 onNext={handleNext} data={formData} />}
      {step === 2 && <SingupPageStep2 onNext={handleNext} onBack={handleBack} data={formData} />}
      {step === 3 && <SingupPageStep3 onBack={handleBack} onComplete={handleComplete} />}
    </div>
  );
}
