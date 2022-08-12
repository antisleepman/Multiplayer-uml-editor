import { Template, TemplateCategory, TemplateType } from '../template-types';
import { UMLDiagramType, UMLModel } from '@ls1intum/apollon';

export enum SoftwarePatternCategory {
  CREATIONAL = 'Творческий',
  STRUCTURAL = 'Структурный',
  BEHAVIORAL = 'Поведенческий',
}

export enum SoftwarePatternType {
  // Structural patterns
  ADAPTER = 'Адаптер',
  BRIDGE = 'Мост',
  // Behavioral pattern
  COMMAND = 'Команда',
  OBSERVER = 'Наблюдатель',
  // Creational patterns
  FACTORY = 'Фабрика',
}

export class SoftwarePatternTemplate extends Template {
  softwarePatternCategory: SoftwarePatternCategory;

  /**
   * Should only be called from TemplateFactory. Do not call this method!
   * @param templateCategory
   * @param templateType
   * @param diagramType
   * @param diagram
   * @param patternCategory
   */
  constructor(
    templateType: TemplateType,
    diagramType: UMLDiagramType,
    diagram: UMLModel,
    patternCategory: SoftwarePatternCategory,
  ) {
    super(templateType, diagramType, diagram);
    this.softwarePatternCategory = patternCategory;
  }
}
