import { api } from "../api";

type candidateProps = {
  cod: number,
  name: string,
  picPath: string,
  politicalPartyId: string
}

export async function createPoliticalParty( {name, cod, politicalPartyId, picPath } : candidateProps ) {
	const formdata = new FormData()

console.log(picPath);

  formdata.append("name",name)
  formdata.append("cod",cod)
  formdata.append("politicalPartyId",politicalPartyId)
  formdata.append("photo",picPath[0])


  await api.post("/political", formdata,{
    headers:{
      "Content-Type": "multipart/form-data"
    }
  })
}