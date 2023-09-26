import ReactCountryFlag from "react-country-flag";
import { useGetTeamAllQuery } from "../../Redux/Feature/teamApi";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const Teams = () => {
  const { data: Team, isLoading } = useGetTeamAllQuery();

  if (isLoading) {
    return <Loading />;
  }
  const countryCodes = {
    England: { code: "GB", name: "United Kingdom" },
    India: { code: "IN", name: "India" },
    SriLanka: { code: "LK", name: "Sri Lanka" },
    Bangladesh: { code: "BD", name: "Bangladesh" },
    Australia: { code: "AU", name: "Australia" },
    SouthAfrica: { code: "ZA", name: "South Africa" },
    Pakistan: { code: "PK", name: "Pakistan" },
    Afghanistan: { code: "AF", name: "Afghanistan" },
    WestIndies: { code: "JM", name: "Jamaica" }, // Adjust the name as needed
    Ireland: { code: "IE", name: "Ireland" },
    NewZealand: { code: "NZ", name: "New Zealand" },
  };

  const teamsWithCountryInfo = Team.map((team) => {
    const teamName = team.name;
    const countryInfo = countryCodes[teamName];

    if (countryInfo) {
      return { ...team, ...countryInfo };
    }
  });

  return (
    <div className="grid grid-cols-3 gap-7 p-5">
      {teamsWithCountryInfo
        .filter((item) => item !== undefined)
        .map((item) => (
          <div
            key={item?._id}
            className="flex flex-col items-center p-2  bg-gray-100 rounded-lg"
          >
            <Link to={`/player/${item._id}`}>
              <ReactCountryFlag
                key={item?._id}
                countryCode={item?.code}
                svg
                style={{
                  width: "10rem",
                  height: "7rem",
                  borderRadius: "1.1rem",
                }}
              />
              <h1 className="text-center text-lg">{item?.name}</h1>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Teams;
