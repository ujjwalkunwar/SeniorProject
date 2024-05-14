'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import {useEffect, useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navigationbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import UploadImage from "../inputs/UploadImage";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

// Component for handling the renting process through a modal.
const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      imageSrc: '',
      price: 1,
      title: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      description: '',
    },
  });

  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const imageSrc =watch('imageSrc')

  useEffect(() => {
    register("price", {
      required: "Price is required",
      min: {
        value: 1,
        message: "Price must be greater than 0"
      }
    });
  }, [register]);

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  /**
   * Sets custom value for a form field.
   * 
   * @param {string} id - ID of the form field.
   * @param {any} value - Value to be set.
   */
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing is Created');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Fill all the required boxes');
        toast.error('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  // Determines the label for the main action button based on the current step.
  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  // Determines the label for the secondary action button based on the current step.
  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="
      flex 
      flex-col 
      gap-8">
      <Heading
        title = "Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        ">
          {categories.map((item) => (
            <div key={item.label} className="
              col-span-1">
              <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
            </div>
          )
        )}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="
        flex 
        flex-col 
        gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map
          center={location?.latlng}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="
        flex 
        flex-col 
        gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="
        flex 
        flex-col 
        gap-8">
        <Heading
          title="Add a photo for your place"
          subtitle="Show guests what your place looks like"
        />
        <UploadImage
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="
        flex 
        flex-col 
        gap-8">
        <Heading
          title="Describe your place?"
          subtitle="Keep it short and sweet"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="
        flex 
        flex-col 
        gap-8">
        <Heading
          title="Now, set the price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          type="number"
        />
      </div>
    );
  }

  // Renders the RentModal component.
  return (
	<Modal 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title="WanderNEST HOME"
    body={bodyContent}
  />
  );
}

export default RentModal;