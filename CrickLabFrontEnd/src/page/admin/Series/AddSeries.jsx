import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import Input from "../../../components/common/input/input";
import { Toaster, toast } from "react-hot-toast";
import Select from "../../../components/common/input/select";
import Button from "../../../components/common/button/Button";
import { useAddSeriesMutation } from "../../../Redux/Feature/seriesApi";
import Loading from "../../../components/Loading/Loading";
import BackButton from "../../../components/common/BackButton/BackButton";

const AddSeries = () => {
  const [series, { isLoading }] = useAddSeriesMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      over: "",
      teams: 0,
    },
  });
  const onSubmit = (data) => {
    series(data)
      .unwrap()
      .then(() => {
        toast.success("Series Registor");
        // Handle successful login response, e.g., store user token or redirect
      })
      .catch((err) => {
        // Handle login error
        toast.success("Error", err);
        // toast.error(error);
      });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <BackButton />
      <Heading
        title={"Add Series"}
        subtitle={"Please Add All Information"}
        center
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center my-20"
      >
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-1/2">
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Select
            id="type"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select the type"
            options={[
              { _id: "t10", name: "T10" },
              { _id: "t20", name: "T20" },
              { _id: "oneday", name: "One Day" },
              { _id: "test", name: "Test" },
            ]}
          />
          <Select
            id="over"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select the overs"
            options={[
              { _id: "10", name: "10" },
              { _id: "20", name: "20" },
              { _id: "50", name: "50" },
              { _id: "90", name: "90" },
            ]}
          />
          <Input
            id="teams"
            type="number"
            label="Teams"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Button
            optional={"col-span-2"}
            disabled={isLoading}
            label={"Login"}
            onClick={handleSubmit}
          />
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddSeries;
