'use client';

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import { signIn } from 'next-auth/react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import useForgotPasswordModal from '@/app/hooks/useForgotPasswordModal';

// Component for the Login Modal.
const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const forgotPasswordModal= useForgotPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  /**
   * Handles form submission.
   * 
   * @param {FieldValues} data - Form data.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
       ...data ,
      redirect: false,
    })

    .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success('Logged in');
          router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
    })
  }

  // Toggles between Login and Forgot Password modal.
  const swapp = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, forgotPasswordModal]);

  // Toggles between Login and Register modal.
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const loginbodyContent = (
    <div className="
      flex 
      flex-col 
      gap-4">
      <Heading 
        title="Welcome back to WanderNEST"
        subtitle="Login to your account!"
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
        <Input 
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>
  )

  const footerContent = (
    
    <div className="
      flex 
      flex-col 
      gap-4 mt-3">
      <hr />
        <div className="
          justify-center 
          flex 
          flex-row 
          items-center 
          ">
          <div
          onClick={swapp}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Forgot your password? 
          </div>
      </div>
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div className="
          justify-center 
          flex 
          flex-row 
          items-center 
          gap-2">
          <div>
            First time using WanderNEST?  
          </div>
          <div
          onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return(
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue" 
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)} 
      body={loginbodyContent}
      footer={footerContent}
      />
  );
}

export default LoginModal;