export interface IProjectProvider {
  projectId: number;
  projectName: string;
  projectCategory: string;
  projectPhoto: string;
  projectDescription: string;
  projectOwnerName: string;
  projectOnwerAddress: string;
  projectGoal: number;
  projectParticipationNumber: number;
  projectCollectedAmount: number;
  projectStatus: boolean;
}

export interface IAddresses {
  address: string;
  amount: number;
  name: string;
}
