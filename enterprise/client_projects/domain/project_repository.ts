
// domain/project_repository.ts

import { ProjectEntity } from "./project.entity";
import { ProjectStatus } from "./project_status.enum";
import { v4 as uuid } from "uuid";

export interface ProjectRepository {
  create(data: Partial<ProjectEntity>): Promise<ProjectEntity>;
  update(id: string, updates: Partial<ProjectEntity>): Promise<ProjectEntity>;
  findById(id: string): Promise<ProjectEntity | null>;
  findByOwner(ownerId: string): Promise<ProjectEntity[]>;
}

export class InMemoryProjectRepository implements ProjectRepository {
  private items: Record<string, ProjectEntity> = {};

  async create(data: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const id = uuid();
    const now = new Date().toISOString();

    const entity: ProjectEntity = {
      id,
      name: data.name ?? "Untitled Project",
      ownerId: data.ownerId ?? "unknown",
      status: data.status ?? ProjectStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
      intake: (data.intake as any) || null,
      summary: undefined,
      jurisdiction: undefined,
      spv: undefined,
      valuation: undefined,
      tokenomics: undefined,
      investorPackage: undefined
    };

    this.items[id] = entity;
    return entity;
  }

  async update(id: string, updates: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const existing = this.items[id];
    if (!existing) throw new Error(`Project ${id} not found`);

    const updated: ProjectEntity = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.items[id] = updated;
    return updated;
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    return this.items[id] ?? null;
  }

  async findByOwner(ownerId: string): Promise<ProjectEntity[]> {
    return Object.values(this.items).filter((x) => x.ownerId === ownerId);
  }
}
