import { api, axiosConfig } from "../api";

type electionProps = {
	name?: string;
status?:string;
electionId:string
};

export async function editElection({
	name,
	status,
  electionId
}: electionProps) {
	const formdata = new FormData();

	if(name){
    formdata.append('name',name)
  }
  if(status){
    formdata.append('status',status)
  }

	const response = await api.patch(`/election/${electionId}`, formdata, axiosConfig);

	return { response };
}
