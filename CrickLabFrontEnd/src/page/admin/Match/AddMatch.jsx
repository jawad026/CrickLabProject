import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import Input from "../../../components/common/input/input";
import { Toaster, toast } from "react-hot-toast";
import Select from "../../../components/common/input/select";
import Button from "../../../components/common/button/Button";
import { useGetTeamAllQuery } from "../../../Redux/Feature/teamApi";
import { useGetSeriesAllQuery } from "../../../Redux/Feature/seriesApi";
import { useAddMatchMutation } from "../../../Redux/Feature/matchApi";
import Loading from "../../../components/Loading/Loading";
const AddMatch = () => {
  const { data: teamData = [] } = useGetTeamAllQuery();
  const { data: seriesData = [] } = useGetSeriesAllQuery();
  const [match, { isLoading }] = useAddMatchMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamA: "",
      teamB: "",
      datetime: "",
      seriesId: "",
    },
  });
  const teamA = watch("teamA");
  const onSubmit = (data) => {
    match(data)
      .unwrap()
      .then(() => {
        toast.success("Match Sheduled");
        // Handle successful login response, e.g., store user token or redirect
      })
      .catch((error) => {
        // Handle login error
        toast.error(error);
      });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Heading
        title={"Add Match"}
        subtitle={"Please Add All Information"}
        center
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center my-20"
      >
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-1/2">
          <Select
            id="teamA"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select team A"
            options={teamData}
          />
          <Select
            id="teamB"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select team B"
            options={teamData.filter((item) => item._id !== teamA)}
          />
          <Input
            id="datetime"
            type="datetime-local"
            label="Date and Time"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Select
            id="seriesId"
            disabled={isLoading}
            register={register}
            required={false}
            errors={errors}
            label="Select the Series (optional)"
            options={seriesData}
          />
          <Input
            id="over"
            type="text"
            label="Overs"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Button
            optional={"col-span-2"}
            disabled={isLoading}
            label={"Add Match"}
            onClick={handleSubmit}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddMatch;
