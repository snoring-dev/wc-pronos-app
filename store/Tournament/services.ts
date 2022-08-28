import request from "../../utils/Http";

export const getTournamentData = async () => {
  const resp = await request({
    url: `/tournaments/?populate=deep`,
    method: "GET",
  });

  return {
    id: resp.data[0].id,
    year: resp.data[0].attributes.year,
    startDate: resp.data[0].attributes.startDate,
    endDate: resp.data[0].attributes.endDate,
    name: resp.data[0].attributes.name,
    groups: resp.data[0].attributes.groups.data.map((group: any) => ({
        id: group.id,
        type: group.attributes.type,
        label: group.attributes.label,
        teams: group.attributes.teams.data.map((team: any) => ({
            id: team.id,
            name: team.attributes.name,
            country_code: team.attributes.country_code,
            flag: team.attributes.flag.data.attributes.url,
        })),
    })),
  };
};
