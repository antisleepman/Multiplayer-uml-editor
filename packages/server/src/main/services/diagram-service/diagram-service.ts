import { randomString } from '../../utils';
import { tokenLength } from '../../constants';
import { DiagramStorageService } from '../diagram-storage/diagram-storage-service';
import { DiagramDTO } from 'shared/src/main/diagram-dto';

export class DiagramService {
  private storageService: DiagramStorageService;

  constructor(storageService: DiagramStorageService) {
    this.storageService = storageService;
  }

  saveDiagramAndGenerateTokens(diagramDTO: DiagramDTO): Promise<string> {
  
    const token = randomString(tokenLength);
    return this.storageService.saveDiagram(diagramDTO, token);
  }
  getDiagramByLink(token: string): Promise<DiagramDTO | undefined> {
    return this.storageService.getDiagramByLink(token);
  }
}
