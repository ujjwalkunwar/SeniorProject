'use client';

import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import toast from "react-hot-toast";
import axios from "axios";

// Component for the Forgot Password Modal.
const ForgotPasswordModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  // Toggles between Forgot Password and Login modal.
  const toggle = useCallback(() => {
    forgotPasswordModal.onClose();
    loginModal.onOpen();
  }, [loginModal, forgotPasswordModal]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: ''
    }
  });

  /**
   * Handles form submission.
   * 
   * @param {FieldValues} data - Form data.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/forgot-password', data)
    .then(() => {
      toast.success('Success');
      forgotPasswordModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      toast.error('User with this email is not registered');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const bodyContent = (
    <div className="
        flex 
        flex-col 
        gap-4">
        <Heading
          title="Forgot your password?"
          subtitle="Enter your email below"
          center
          />
        <Input 
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
  );

  const footerContent = (
      
      <div className="
        flex 
        flex-col 
        gap-4 mt-3">
        <div
          className="
            text-neutral-500
            text-center
            mt-4
            font-light
          ">
          <div className="
            justify-center 
            flex 
            flex-row 
            items-center 
            gap-2">
            <div
              onClick={toggle}
                className="
                  text-neutral-800
                  cursor-pointer
                  hover:underline
                "
              >
              Log In page
            </div>
          </div>
        </div>
      </div>
  );

  return(
    <Modal
      disabled={isLoading}
      isOpen={forgotPasswordModal.isOpen}
      title="Password Recovery"
      actionLabel="Submit"
      onClose={forgotPasswordModal.onClose}
      onSubmit={handleSubmit(onSubmit)} 
      body={bodyContent}
      footer={footerContent}
      />
  );
}

export default ForgotPasswordModal;