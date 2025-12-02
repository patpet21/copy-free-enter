
import { ProjectEntity, ProjectIntakeData } from "../domain/project.entity";
import { v4 as uuidv4 } from 'uuid';

export class ProjectService {
  private projects: ProjectEntity[] = [];

  constructor() {
    // Seed with a demo project
    this.projects.push({
      id: '1',
      name: 'Alpha Resort',
      ownerId: 'demo-user',
      status: 'intake_completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      intake: {
        projectName: 'Alpha Resort',
        assetType: 'Real Estate',
        location: 'Aspen, USA',
        goal: 'Liquidity',
        targetRaise: 5000000,
        targetInvestor: 'Accredited',
        timeline: '3-6 Months',
        description: 'Luxury ski resort tokenization for fractional ownership.'
      },
      summary: {
        executiveSummary: 'High-potential luxury real estate offering targeting accredited investors via Reg D.',
        feasibilityScore: 85,
        keyRisks: ['Seasonality of revenue', 'SEC compliance overhead'],
        recommendedStructure: 'Delaware LLC / Reg D 506(c)'
      }
    });
  }

  async listProjects(): Promise<ProjectEntity[]> {
    // Simulate async
    return new Promise(resolve => setTimeout(() => resolve([...this.projects]), 500));
  }

  async getProject(id: string): Promise<ProjectEntity | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(input: ProjectIntakeData): Promise<ProjectEntity> {
    // Mock AI Generation of Summary
    const summary = {
        executiveSummary: `${input.assetType} project in ${input.location} aiming for ${input.goal}. Strong market fit.`,
        feasibilityScore: Math.floor(Math.random() * (95 - 70 + 1) + 70),
        keyRisks: ["Regulatory Complexity", "Market Volatility"],
        recommendedStructure: input.location.includes("USA") ? "Delaware LLC" : "Luxembourg SPV"
    };

    const newProject: ProjectEntity = {
      id: uuidv4(),
      name: input.projectName,
      ownerId: 'current-user',
      status: 'intake_completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      intake: input,
      summary: summary
    };

    this.projects.unshift(newProject);
    return newProject;
  }

  async updateProject(id: string, patch: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Project not found");

    const updated = {
      ...this.projects[idx],
      ...patch,
      updatedAt: new Date().toISOString()
    };
    
    this.projects[idx] = updated;
    return updated;
  }
}

export const projectService = new ProjectService();
