import { useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import { useForm } from "react-hook-form";
import Input from "../../../components/common/input/input";
import TextEditor from "../../../components/common/TextEditor/TextEditor";
import { useAddNewsMutation } from "../../../Redux/Feature/newsApi";
import Button from "../../../components/common/button/Button";
import CloudinaryUploadWidget from "../../../components/common/ImageUpload/ImageUpload";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";

const SUB_TITLE = 2;
const CONTENT = 3;
const IMAGE = 4;
const AddNews = () => {
  const [news, { isLoading }] = useAddNewsMutation();
  const [steps, setSteps] = useState(1);
  const onBack = () => {
    setSteps((value) => value - 1);
  };
  const onNext = () => {
    setSteps((value) => value + 1);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    },
  });
  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  const content = watch("content");
  const image = watch("image");

  const onSubmit = (data) => {
    if (steps > IMAGE) {
      news(data)
        .unwrap()
        .then(() => {
          toast.success("News added successfully");
          // Handle successful login response, e.g., store user token or redirect
        })
        .catch((error) => {
          // Handle login error
          toast.error(error);
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center={true}
        title="What do you think about Heading?"
        subtitle="Please write  short Heading"
      />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
    </div>
  );

  if (steps === SUB_TITLE) {
    bodyContent = (
      <div className="flex flex-col  gap-8">
        <Heading
          center={true}
          title="What will be your subheading?"
          subtitle="Short Description"
        />
        <Input
          id="subtitle"
          label="Subtitle"
          disabled={isLoading}
          register={register}
          errors={errors}
          required={true}
        />
      </div>
    );
  }
  if (steps === CONTENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center={true}
          title="Add Your Content"
          subtitle="Add professional look to your content"
        />
        <TextEditor
          id={"content"}
          value={content}
          onChange={(value) => setCustomValue("content", value)}
        />
      </div>
    );
  }
  if (steps === IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center={true}
          title="Add a photo of your place"
          subtitle="Show guest what you place look like"
        />
        <CloudinaryUploadWidget
          value={image}
          onChange={(value) => setCustomValue("image", value)}
        />
      </div>
    );
  }
  return (
    <>
      <div className="grid place-content-center mt-24 px-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2  p-4 rounded-md md:w-[38rem]"
        >
          {bodyContent}
          <div className="flex">
            {steps > 1 && <Button label={"Back"} onClick={() => onBack()} />}
            <Button
              label={steps < 4 ? "Next" : "Create"}
              onClick={() => onNext()}
            />
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
};

export default AddNews;
