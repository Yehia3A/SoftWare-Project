import { Injectable } from '@nestjs/common';

@Injectable()
export class ModulesService {
  private modules = []; // This simulates a database or in-memory data storage

  findAll() {
    return this.modules; // Return all modules
  }

  findOne(id: string) {
    return this.modules.find((module) => module.id === id); // Find a module by ID
  }

  create(createModuleDto: any) {
    const newModule = { id: Date.now().toString(), ...createModuleDto }; // Assign a unique ID
    this.modules.push(newModule);
    return newModule; // Return the newly created module
  }

  update(id: string, updateModuleDto: any) {
    const moduleIndex = this.modules.findIndex((module) => module.id === id);
    if (moduleIndex === -1) {
      return { message: 'Module not found' };
    }
    this.modules[moduleIndex] = { ...this.modules[moduleIndex], ...updateModuleDto };
    return this.modules[moduleIndex]; // Return the updated module
  }

  remove(id: string) {
    const moduleIndex = this.modules.findIndex((module) => module.id === id);
    if (moduleIndex === -1) {
      return { message: 'Module not found' };
    }
    const deletedModule = this.modules.splice(moduleIndex, 1);
    return deletedModule[0]; // Return the deleted module
  }
}