import { SmartContract, Interaction, ResultsParser } from "@elrondnetwork/erdjs";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
export const sendQuery = async (contract: SmartContract, proxy: ProxyNetworkProvider, interaction: Interaction) => {
  if (!contract) return;
  const newInteraction = new Interaction(contract, interaction.getFunction(), interaction.getArguments());
  const queryResponse = await proxy.queryContract(newInteraction.buildQuery());
  const endpointDefinition = newInteraction.getEndpoint();
  const res = new ResultsParser().parseQueryResponse(queryResponse, endpointDefinition);

  return res;
};
